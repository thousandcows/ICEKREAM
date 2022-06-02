//split user-router with auth-router
import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userService } from '../services';
import { orderService } from '../services/order-service';

import { productService } from '../services/product-service';
import {
    productJoiSchema,
    productUpdateJoiSchema,
} from '../db/schemas/joi-schemas/product-joi-schema';

import { userUpdateJoiSchema } from '../db/schemas/joi-schemas/user-joi-schema';
const authRouter = Router();

//사용자 아이디 api
authRouter.get('/', async (req, res, next) => {
    try {
        const userId = req.user._id;
        res.status(200).json({ userId });
    } catch (error) {
        next(error);
    }
});

//사용자 정보 api
authRouter.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userData = await userService.getUser(userId);
        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
});

// 사용자 정보 수정 //정보 유효성에 new 비밀번호와 현재 일치도 봐야할 듯.
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
        const {
            fullName,
            password,
            address,
            phoneNumber,
            role,
            currentPassword,
        } = req.body;
        const isValid = await userUpdateJoiSchema.validateAsync({
            fullName,
            password,
            address,
            role,
            phoneNumber,
            currentPassword,
        });
        // currentPassword 없을 시, 진행 불가
        if (currentPassword === password) {
            throw new Error('새 비밀번호는 현재 비밀번호와 같을 수 없습니다.');
        }

        const userInfoRequired = { userId, currentPassword };
        //user current password와 password가 다른지 확인해야하나?

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

authRouter.get('/:userId/orders', async (req, res, next) => {
    //login 이 되어있으면 그 유저의 oreder들을 전부 반환
    try {
        const { userId } = req.params;
        const orders = await orderService.findOrders(userId);
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

authRouter.delete('/:userId/orders/:orderId', async (req, res, next) => {
    try {
        //이 때 유저 아이디가 주문아이디랑 일치하나 확인을 해야할까?
        const { userId, orderId } = req.params;
        //어떻게 order_id를 가져오는지는 정확히 모르겠다.
        const checkUserId = await orderService.findUser(orderId);
        if (checkUserId !== userId) {
            throw new Error(
                '유저 아이디 정보와 주문 아이디 정보가 일치하지 않습니다.',
            );
        }
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

// 할거 auth + product get/patch/delete api : user의 상품 관련 기능

authRouter.post('/:userId/product', async (req, res, next) => {
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
        //isValid가 형식에 맞지 않으면 error를 throw함.
        const productInfo = {
            brand: brand,
            productName: productName,
            price: price,
            launchDate: launchDate,
            img: img,
            quantity: quantity,
            size: size,
            sellerId: sellerId,
            size: size,
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

authRouter.patch('/:userId/:productId', async (req, res, next) => {
    try {
        //product Id는 client에서 받는게 맞는 거 같다.
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

authRouter.delete('/:userId/:productId', async (req, res, next) => {
    try {
        //userId가 필요할까?
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
export { authRouter };
