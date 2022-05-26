//split user-router with auth-router
import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { loginRequired } from '../middlewares';
import { userService } from '../services';
import { orderService } from '../services/order-service';
const authRouter = Router();

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)

// userRouter.get('/userlist', loginRequired, async (req, res, next) => {
//     try {
//         // 전체 사용자 목록을 얻음
//         const users = await userService.getUsers();

//         // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
//         res.status(200).json(users);
//     } catch (error) {
//         next(error);
//     }
// }); //admin 전용
// 나중에 꼭 admin에 수정할 것

// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
authRouter.patch('/:userId', async (req, res, next) => {
    try {
        // content-type 을 application/json 로 프론트에서
        // 설정 안 하고 요청하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }

        // params로부터 id를 가져옴
        const { userId } = req.params;

        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const { fullName } = req.body;
        const { password } = req.body;
        const { address } = req.body;
        const { phoneNumber } = req.body;
        const { role } = req.body;

        // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
        const { currentPassword } = req.body;

        // currentPassword 없을 시, 진행 불가
        if (!currentPassword) {
            throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
        }

        const userInfoRequired = { userId, currentPassword };

        // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
        // 보내주었다면, 업데이트용 객체에 삽입함.
        const toUpdate = {
            ...(fullName && { fullName }),
            ...(password && { password }),
            ...(address && { address }),
            ...(phoneNumber && { phoneNumber }),
            ...(role && { role }),
        };

        // 사용자 정보를 업데이트함.
        const updatedUserInfo = await userService.setUser(
            userInfoRequired,
            toUpdate,
        );

        // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
        res.status(200).json(updatedUserInfo);
    } catch (error) {
        next(error);
    }
});

// 회원 탈퇴 api
//  나중에 다시 확인
authRouter.delete('/:userId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }
        const { userId } = req.params;
        const { currentPassword } = req.body;
        if (!currentPassword) {
            throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
        }
        const userInfoRequired = { userId, currentPassword };
        const deletedUserInfo = await userService.deleteUser(userInfoRequired);
        // 만약에 정상적으로 delete가 되어서 delete한 유저 정보가 있다면,
        if (deletedUserInfo) {
            res.status(200).json({ result: 'success' });
        }
    } catch (error) {
        next(error);
    }
});

authRouter.get('/:userId/orders', async(req,res,next)=>{ //login 이 되어있으면 그 유저의 oreder들을 전부 반환
    try{
        const { userId } = req.params;
        const orders = await orderService.findOrders(userId);
        res.status(200).json(orders);
    }catch(error){
        next(error);
    }
} )
export { authRouter };
