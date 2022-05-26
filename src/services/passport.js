import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';

import { userModel } from '../db';

const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

const LocalStrategy = Strategy;

const passportConfig = {
    // passport의 username, password field configure
    usernameField: 'email',
    passwordField: 'password',
};

const passportVerify = async (email, password, done) => {
    try {
        const user = await userModel.findByEmail(email); // email로 유저확인 check user-model;
        if (!user) {
            // 이메일이 없다면 , user에 false 반환, error로 이메일 없다고 전달
            done(null, false, {
                reason: '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
            });
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password); // password 일치 확인
        if (isPasswordCorrect) {
            // 일치하면,
            done(null, user); // user에 user반환

            return;
        }
        // 불일치 한다면
        done(null, false, {
            reason: '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
        });
    } catch (error) {
        done(error);
    }
};

function passportConfiguration() {
    passport.use('local', new LocalStrategy(passportConfig, passportVerify)); // passport에게 쓸 strategy의 이름과 기능을 설명
    // 한마디로 우리가 local이라는 이름을 쓸 때에는 두번째 인자의 strategy를 써라
}
/// ///// 아래는 JWT 유저 인증

const JWTConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // jwt를 headers의 Authorization의 "Beaerer adnfkadnfkjandk" 이런 형식의 Bearer 띄어쓰기 뒷부분을 쓴다고 설정
    secretOrKey: process.env.JWT_SECRET_KEY || 'secret-key', // JWT 생성 확인시 사용할 키 값.
};

const JWTVerify = async (jwtPayload, done) => {
    // Token 값을 확인할 방법 관련 함수
    try {
        const user = await userModel.findById(jwtPayload.userId); // header의 JWT token의 원래 필드인 userId로 user 찾기
        if (user) {
            done(null, user); // user가 맞다면 user 반환
            return;
        }
        // user가 없다면,
        done(null, false, {
            reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
        });
    } catch (error) {
        done(error);
    }
};

function JWTConfiguration() {
    passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify)); // passport에게 쓸 strategy의 이름과 기능을 설명
}

export { passportConfiguration, JWTConfiguration };
