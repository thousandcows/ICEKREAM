import { Router } from 'express';
import { productService } from '../services/product-service';

const productRouter = Router();

// 1. 전체 상품 목록 조회 기능
productRouter.get('/', async (req, res, next) => {
    try {
        const { page, perPage } = req.query;

        const [productList, totalPage] = await productService.findAllProducts(
            page,
            perPage,
        );

        console.log(productList);

        res.status(200).json({ productList, totalPage });
    } catch (error) {
        next(error);
    }
});

// 2. 카테고리별 상품 조회 기능
productRouter.get('/category', async (req, res, next) => {
    try {
        const { category, page, perPage } = req.query;
        const [productList, totalPage] = await productService.findAllProducts(
            category,
            page,
            perPage,
        );

        console.log(productList);

        res.status(200).json({ productList, totalPage });
    } catch (error) {
        next(error);
    }
});

// 3. 상품 상세 정보 조회 기능
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
