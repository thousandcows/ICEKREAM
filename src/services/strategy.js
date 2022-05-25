import { userModel } from '../db';
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryt');


const passportConfig = {
    usernameField:'email',
    passwordField:'password'
};

const passportVerify = async(email,password,done) =>{
    try{
        const user = await userModel.findByEmail(email); //email로 유저확인 check user-model;
        if(!user){ //이메일이 없다면 , user에 false 반환, error로 이메일 없다고 전달
            done(null,false,{reason:'해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'})
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password); //password 일치 확인
        if(isPasswordCorrect){ //일치하면,
            done(null,user);  //user에 user반환
            return;
        }
        //불일치 한다면
        done(null,false,{reason:'비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'})

    }catch(error){
        done(error);
    }
}

const userLocalStrategy = new localStrategy(passportConfig, passportVerify)
module.exports = userLocalStrategy;
// async getUserToken(loginInfo) {
//     // 객체 destructuring
//     const { email, password } = loginInfo;

//     // 우선 해당 이메일의 사용자 정보가  db에 존재하는지 확인
//     const user = await this.userModel.findByEmail(email);
//     if (!user) {
//       throw new Error(
//         '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
//       );
//     }

//     // 이제 이메일은 문제 없는 경우이므로, 비밀번호를 확인함

//     // 비밀번호 일치 여부 확인
//     const correctPasswordHash = user.password; // db에 저장되어 있는 암호화된 비밀번호

//     // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번쨰는 db에 있떤 암호화된 비밀번호)
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       correctPasswordHash
//     );

//     if (!isPasswordCorrect) {
//       throw new Error(
//         '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
//       );
//     }

//     // 로그인 성공 -> JWT 웹 토큰 생성
//     const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

//     // 2개 프로퍼티를 jwt 토큰에 담음
//     const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

//     return { token };
//   }