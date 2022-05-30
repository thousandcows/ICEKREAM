import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { orderService } from '../services/order-service';
import { userService } from '../services';
import { productService } from '../services/product-service';
const orderRouter = Router();

// 로그인 확인이 미리 필요한가? // 주문이 들어왔을 때의 상품 목록의 수량이 줄어야 하는가? 그럼 어떻게?
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
        await userService.pushUserOrderList(userId, newOrder._id); // push order for user's order list
        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
});

// orderRouter.get('/', async (req, res, next) => { //다시 확인 꼭 필요... 장바구니와 소통시 사용
//     try {
//         if (is.emptyObject(req.body)) {
//             throw new Error(
//                 'headers의 Content-Type을 application/json으로 설정해주세요',
//             );
//         }
//         // client에서 상품 아이디 리스트를 받는다고 가정
//         const { productList } = req.body;
//         if (productList.length === 0) { //any 같은 query를 써야하나?
//             throw new Error('장바구니에 상품이 없습니다');
//         }
//         productList.map((item) => {
//             const productId = item.productId;
//             const productData = await productService.findById(productId);
//             return productData;
//         }); //이러면 아마도 product 객체로 이루어진 리스트로 변환됨.
//         res.status(200).json(productList);
//     } catch (error) {
//         next(error);
//     }
// });

export { orderRouter };
