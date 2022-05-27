//split user-router with auth-router
import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { userService } from '../services';
import { orderService } from '../services/order-service';

import { productService } from '../services/product-service';

const authRouter = Router();

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)

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
        const userId = req.user._id;
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

// 할거 auth + product get/patch/delete api : user의 상품 관련 기능
// userId 가 url에 필요 없을 거 같은데...
authRouter.post('/:userId/product', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요',
            );
        }
        const { category } = req.body;
        const { brand } = req.body;
        const { productName } = req.body;
        const { price } = req.body;
        const { launchDate } = req.body;
        const { img } = req.body;
        const { views } = req.body;
        const { quantity } = req.body;
        const { purchaseCount } = req.body;
        const { sellerId } = req.user._id;
        if (!category) {
            throw new Error('카테고리 정보를 입력해주세요.');
        }
        if (!brand) {
            throw new Error('브랜드 정보를 입력해주세요.');
        }
        if (!productName) {
            throw new Error('상품 이름을 입력해주세요.');
        }
        if (!price || price <= 0) {
            throw new Error('가격을 다시 입력해주세요.');
        }
        //launch date를 어떻게 할까...
        if (!img) {
            throw new Error(
                '상품 이미지 정보를 입력해주세요.', // 이게 url인데 생각해봅시다.
            );
        }
        if (!quantity || quantity <= 0) {
            ('상품 수량/재고를 다시 입력해주세요.');
        }
        const productInfo = {
            brand: brand,
            productName: productName,
            price: price,
            launchDate: launchDate,
            img: img,
            views: views,
            quantity: quantity,
            purchaseCount: purchaseCount,
            sellerId: sellerId,
        };

        const newProduct = await productService.addProduct(
            category,
            productInfo,
        );
        console.log(newProduct);

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
        const update = { price: price, img: img, quantity: quantity };
        console.log(update);
        const updatedProduct = await productService.updateProduct(
            productId,
            update,
        );
        console.log(updatedProduct);
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
