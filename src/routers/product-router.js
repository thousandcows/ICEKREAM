import { Router } from 'express';
import is from '@sindresorhus/is';
import { productService } from '../services/product-service';
import { CategorySchema } from '../db/schemas/category-schema';
import { model } from 'mongoose';
import { ProductSchema } from '../db/schemas/product-schema';

const Category = model('categories', CategorySchema);

const productRouter = Router();

// 1. 전체 상품 목록 조회 기능
productRouter.get('/:page/:perPage', async (req, res, next) => {
    try {
        const {page, perPage} = req.params;
        const [productList, totalPage] = await productService.findAllProducts(page, perPage);

        console.log(productList);

        res.status(200).json({productList, totalPage});
    } catch (error) {
        next(error);
    }
});

// 2. 카테고리별 상품 조회 기능
productRouter.get('/:category/:page/:perPage', async (req, res, next) => {
    try {
        const {category, page, perPage} = req.params;
        const [productList, totalPage] = await productService.findAllProducts(category, page, perPage);

        console.log(productList);

        res.status(200).json({productList, totalPage});
    } catch (error) {
        next(error);
    }
});

// 3. 상품 상세 정보 조회 기능
productRouter.get('/:productId', async (req, res, next) => {
    try{
        const productId = req.params.productId;
        console.log(productId);
        const product = await productService.findById(productId);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
})

// 4. 상품 추가 기능
productRouter.post('/add', async (req, res, next) => {
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
        const sellerId = req.user.role
        
        const newProduct = await productService.addProduct({
            brand: brand,
            productName: productName,
            price: price,
            launchDate: launchDate,
            img: img,
            views: views,
            quantity: quantity,
            purchaseCount: purchaseCount,
            sellerId: sellerId,
        });
        console.log(newProduct);
        
        // Category atomicity check
        const isCategoryExist = await Category.findOne({ name: category });
        
        if (isCategoryExist) {
            await Category.updateOne(
                { name: category },
                { $push: { products: newProduct._id } },
            );
        } else {
            await Category.create({
                name: category,
                products: [newProduct._id],
                size: [],
            });
        }
        res.status(200).json(newProduct);
    } catch (error) {
        next(error);
    }
});

// 5. 상품 수정 기능
productRouter.put('/:productId', async (req, res, next) => {
    try{
        const productId = req.params.productId;
        const {price, img, quantity} = req.body;
        const update = {price : price, img: img, quantity: quantity}

        const updatedProduct = productService.updateProduct(productId, update)
        
        res.status(200).json(updatedProduct);

    } catch (error) {
        next(error);
    }
})
// 6. 상품 삭제 기능
productRouter.delete('/:productId', async (req, res, next) => {
    try{
        const productId = req.params.productId;

        const result = productService.deleteProduct(productId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})
export { productRouter };
