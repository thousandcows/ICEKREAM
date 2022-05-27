import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userService } from '../services';
import { orderService } from '../services/order-service';
import { categoryService } from '../services/category-service';

const adminRouter = Router();

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)

adminRouter.get('/users', async (req, res, next) => {
    try {
        // 전체 사용자 목록을 얻음
        const users = await userService.getUsers();
        // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}); //admin 전용

adminRouter.get('/orders', async (req, res, next) => {
    try {
        const orders = await orderService.findAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

adminRouter.delete('/orders/:orderId', async (req, res, next) => {
    try {
        //auth-router 내용을 복붙해서 다시 한번 생각해 보아야겠다.
        const { orderId } = req.params; //어떻게 order_id를 가져오는지는 정확히 모르겠다.
        const deletedOrder = await orderService.deleteUserOrder(orderId);
        if (deletedOrder) {
            await userService.pullUserOrderList(userId, orderId); //나중에 다시확인 해야함, user안의 orderList를 업데이트 하는 기능
            res.status(200).json({ result: 'success' });
        } else {
            throw new Error('그 주문 기록은 존재하지 않습니다.');
        }
    } catch (error) {
        next(error);
    }
});

adminRouter.get('/users/:userId/orders', async (req, res, next) => {
    try {
        //이것도 그냥 가져옴... 뭔가 auth랑 admin이 비슷한 경우가 많은 듯함..
        const { userId } = req.params;
        const orders = await orderService.findOrders(userId);
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

////// 카테고리 schema등과 같이 있을 때 잘 동작하나 확인 해야함.
adminRouter.post('/product/category', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }
        const categoryInfo = req.body;
        const newCategory = await categoryService.addCategory(categoryInfo);
        res.status(200).json(newCategory);
    } catch (error) {
        next(error);
    }
});

adminRouter.delete('/product/category/:categoryId', async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const deletedCategory = await categoryService.deleteCategory(
            categoryId,
        );
        if (deletedCategory) {
            res.status(200).json({ result: 'success' });
        } else {
            throw new Error('그 카테고리는 존재하지 않습니다.');
        }
    } catch (error) {
        next(error);
    }
});

export { adminRouter };
