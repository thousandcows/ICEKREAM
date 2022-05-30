import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userService } from '../services';
import { orderService } from '../services/order-service';
import { categoryService } from '../services/category-service';
import { productService } from '../services/product-service';
import { categoryJoiSchema } from '../db/schemas/joi-schemas/category-joi-schema';
import { productJoiSchema } from '../db/schemas/joi-schemas/product-joi-schema';
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

//관리자가 전체 주문을 가져오는 api
adminRouter.get('/orders', async (req, res, next) => {
    try {
        const orders = await orderService.findAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

// 관리자가 한 주문을 취소하는 api
adminRouter.delete('/orders/:orderId', async (req, res, next) => {
    try {
        //auth-router 내용을 복붙해서 다시 한번 생각해 보아야겠다.
        const { orderId } = req.params; //어떻게 order_id를 가져오는지는 정확히 모르겠다.
        const userId = await orderService.findUser(orderId);
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

//관리자가 한유저의 주문을  전체가져오는 api
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

////// 새 카테고리 추가 api
adminRouter.post('/product/category', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }
        const { name, size } = req.body;
        const products = [];
        const categoryInfo = { name, products, size };
        const isValid = await categoryJoiSchema.validateAsync({ name, size });
        const newCategory = await categoryService.addCategory(categoryInfo);
        res.status(200).json(newCategory);
    } catch (error) {
        next(error);
    }
});

// 카테고리 아이디로 카테고리 삭제
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

// 복사 붙여넣기 인점을 확인... 함수로 정의해야하나?
// 아래 상품관련 기능은 유저와 다를 이유도 없는 것 같고 추가를 할거면 유저의 권한 축소 정도인 것 같다.
adminRouter.post('/product', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }

        const sellerId = req.user._id;
        const {
            category,
            brand,
            productName,
            price,
            launchDate,
            img,
            quantity,
            size,
        } = req.body;
        const isValid = await productJoiSchema.validateAsync({
            category,
            brand,
            productName,
            price,
            launchDate,
            img,
            quantity,
            size,
        });
        const productInfo = {
            brand: brand,
            productName: productName,
            price: price,
            launchDate: launchDate,
            img: img,
            quantity: quantity,
            size: size,
            sellerId: sellerId,
        };

        const newProduct = await productService.addProduct(
            category,
            productInfo,
        );

        res.status(200).json(newProduct);
    } catch (error) {
        next(error);
    }
});

adminRouter.patch('/product/:productId', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }
        const { productId } = req.params;
        const { price, img, quantity } = req.body; // 이걸 query로 해야하나 ? 아니면 위의 코드 같이? 생각해 봅시다.
        const isValid = await productUpdateJoiSchema.validateAsync({
            price,
            img,
            quantity,
        });
        const update = { price: price, img: img, quantity: quantity };
        const updatedProduct = await productService.updateProduct(
            productId,
            update,
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

adminRouter.delete('/product/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const result = await productService.deleteProduct(productId);
        if (result) {
            res.status(200).json({ result: 'success' });
        } else {
            throw new Error('이 상품은 존재하지 않습니다.'); //삭제되면 카테고리에 영향을 주어야함. 추가해야함.
        }
    } catch (error) {
        next(error);
    }
});

export { adminRouter };
