import { Router } from 'express';
import { productService } from '../services/product-service';

const productRouter = Router();

// 1. 전체 상품 목록 조회 기능
productRouter.get('/', async (req, res, next) => {
    try {
        const { category, page, perPage } = req.query;

        const [productList, totalPage] = await productService.findAllProducts(
            category,
            page,
            perPage,
        );

        res.status(200).json({ productList, totalPage });
    } catch (error) {
        next(error);
    }
});

// 2. 장바구니 내에 있는 상품 상세 정보 조회
productRouter.post('/cart', async (req, res, next) => {
    try {
        const { productIds } = req.body;

        const productList = await productService.getProductsInCart(productIds);

        res.status(200).json(productList);
    } catch (error) {
        next(error);
    }
});

// 3. 상품 상세 정보 조회 기능 //상품이 존재하지 않으면 null 을 반환... null check를 해야할 것 같음.
productRouter.get('/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await productService.findById(productId);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

export { productRouter };
