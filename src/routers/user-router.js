import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { userService } from '../services';
const userRouter = Router();

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
userRouter.post('/register', async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }

        // req (request)의 body 에서 데이터 가져오기
        const { fullName } = req.body;
        const { email } = req.body;
        const { password } = req.body;

        // 위 데이터를 유저 db에 추가하기
        const newUser = await userService.addUser({
            fullName,
            email,
            password,
        });

        // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
        // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
userRouter.post('/login', async (req, res, next) => {
    try {
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }
        passport.authenticate(
            'local',
            { session: false },
            (error, user, info) => {
                // local 이라는 이름의 strategy로, session을 안쓴다.
                if (error || !user) {
                    // passport 인증 실패 or 유저가 없으면 error
                    res.status(400).json({ message: info.reason });
                    return;
                }
                req.login(user, { session: false }, (loginError) => {
                    // login을 하면
                    if (loginError) {
                        res.send(loginError);
                        return;
                    }
                    const secretKey =
                        process.env.JWT_SECRET_KEY || 'secret-key'; // login 성공시 key값을 써서 토큰 생성
                    const token = jwt.sign(
                        { userId: user._id, role: user.role },
                        secretKey,
                    );
                    res.json({ token });
                });
            },
        )(req, res); // 이 부분은 수업 때나 지금이나 이해가 잘 안되지만 필요함.
    } catch (error) {
        next(error);
    }
});

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)

export { userRouter };
