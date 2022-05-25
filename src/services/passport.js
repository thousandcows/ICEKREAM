const passport = require('passport');
const localStrategy= require('./strategy');
const jwt = require('jwt')
passport.use('local',localStrategy);
const loginPost= async(req,res,next) =>{
    try{
        passport.authenticate('local',(error, user, info)=>{
            if(error || !user ){ //passport 인증 실패 or 유저가 없으면 error
                res.status(400).json({message: info.reason});
                return;
            }
            req.login(user,{session: false}, (loginError)=>{
                if(loginError){
                    res.send(loginError);
                    return;
                }
                const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
                const token = jwt.sign({userId: user._id, role: user.role}, secretKey);
                res.json({token});
            })
        })
    }catch(error){
        next(error);
    }
}

module.exports= loginPost;

//     // 로그인 성공 -> JWT 웹 토큰 생성
//     const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

//     // 2개 프로퍼티를 jwt 토큰에 담음
//     const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

//     return { token };