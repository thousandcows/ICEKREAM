import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import passport from 'passport';
import { loginRequired } from '../middlewares';
import { orderService } from '../services/order-service';

const orderRouter = Router();

// 로그인 확인이 미리 필요한가?
orderRouter.post('/', async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }
        console.log('hello')
        // req (request)의 body 에서 데이터 가져오기
        const { userId } = req.body;
        const { postalCode } = req.body;
        const { address1 } = req.body;
        const { address2 } = req.body;
        const { billingMethod } = req.body;
        const { productList } = req.body;

        
        const newOrder = await orderService.addOrder({
            userId,
            postalCode,
            address1,
            address2,
            billingMethod,
            productList,
        });
        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
});


export { orderRouter };
