import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { orderService } from '../services/order-service';
import { userService } from '../services';
import { orderJoiSchema } from '../db/schemas/joi-schemas/order-joi-schema';
import { productService } from '../services/product-service';
const orderRouter = Router();

orderRouter.post('/', async (req, res, next) => {
    try {
        // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
        // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }
        // req (request)의 body 에서 데이터 가져오기
        const userId = req.user._id;
        const { postalCode, address1, address2, billingMethod, productList } =
            req.body;

        const isValid = await orderJoiSchema.validateAsync({
            postalCode,
            address1,
            address2,
            billingMethod,
            productList,
        });

        const newOrder = await orderService.addOrder({
            userId,
            postalCode,
            address1,
            address2,
            billingMethod,
            productList,
        });
        await userService.pushUserOrderList(userId, newOrder._id); // push order for user's order list

        // 주문 시 상품 내용 반영(구매자, 재고, 주문량)
        await productService.putOrderProductList(userId, productList);
        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
});


export { orderRouter };
