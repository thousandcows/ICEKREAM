import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';

import { userModel } from '../db';

const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

const LocalStrategy = Strategy;
// import { ExtractJwt } from 'passport-jwt'; //이부분이 질문..
// const LocalStrategy = Strategy;
// const JWTStrategy = Strategy;
const KakaoStrategy = require('passport-kakao').Strategy; //implement Kakao Strategy;

const passportConfig = {
    // passport의 username, password field configure
    usernameField: 'email',
    passwordField: 'password',
};
// 모든 done에 reason=> message로 수정
const passportVerify = async (email, password, done) => {
    try {
        const user = await userModel.findByEmail(email); // email로 유저확인 check user-model;
        if (!user) {
            // 이메일이 없다면 , user에 false 반환, error로 이메일 없다고 전달
            done(null, false, {
                message:
                    '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
            });
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password); // password 일치 확인
        if (!isPasswordCorrect) {
            //비밀번호가 불일치 한다면..
            done(null, false, {
                message:
                    '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
            });
            return;
        }
        // 위 조건을 모두 통과 한다면
        done(null, user); // user에 user반환
        return;
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
            message: '로그인한 유저만 사용할 수 있는 서비스입니다.',
        });
    } catch (error) {
        done(error);
    }
};

function JWTConfiguration() {
    passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify)); // passport에게 쓸 strategy의 이름과 기능을 설명
}

////Kakao Strategy
const KakaoConfig = {
    clientID: process.env.KAKAO_CLIENT_ID, //env에 대하여 물어봐 주세요.
    callbackURL: 'http://localhost:5000/api/users/kakao/cb',
};

const KakaoVerify = async (accessToken, refreshToken, profile, done) => {
    try {
        //여기서 profile에 유저 정보가 있는게 정상 같은데....?
        const userInfoFromKakao = JSON.parse(profile._raw);
        const kakaoAccount = userInfoFromKakao.kakao_account;
        const kakaoEmail = kakaoAccount.email;
        const kakaoUsername = kakaoAccount.profile.nickname;
        const kakaoPassword = 'kakaoPassword';
        const arbPassword = await bcrypt.hash(kakaoPassword, 10);

        const user = await userModel.findByEmail(kakaoEmail);
        if (!user) {
            //카카오와 아닌 계정 분리 고려....
            const userInfo = {
                email: kakaoEmail, // profile email를 얻는 법?
                password: arbPassword, //일단 username값을 임의의 비밀번호로 사용 이후 hash
                fullName: kakaoUsername, //우선 유저 정보를 모르겠어서 이렇게 해봄.
                role: 'basic-user',
                registerType: 'Kakao',
            };
            const user = await userModel.create(userInfo);
            done(null, user);
            return;
        }
        done(null, user);
        return;
    } catch (error) {
        done(error);
    }
};

function KakaoConfiguration() {
    passport.use('kakao-login', new KakaoStrategy(KakaoConfig, KakaoVerify));
}

export { passportConfiguration, JWTConfiguration, KakaoConfiguration };
