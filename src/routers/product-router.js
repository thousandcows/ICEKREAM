import { Router } from 'express';
import is from '@sindresorhus/is';
import { productService } from '../services/product-service';
import { CategorySchema } from '../db/schemas/category-schema';
import { model } from 'mongoose';
import { ProductSchema } from '../db/schemas/product-schema';

const Category = model('categories', CategorySchema);

const productRouter = Router();

productRouter.get('/', async (req, res, next) => {
    try {

        const productList = await productService.findAllProducts();
        
        console.log(productList);

        res.status(200).json(productList);
    } catch (error) {
        next(error);
    }
});

productRouter.get('/:category', async (req, res, next) => {
    try {
        const category = req.params.category;
        const productList = await productService.findByCategory(category);
        
        console.log(productList);

        res.status(200).json(productList);
    } catch (error) {
        next(error);
    }
});

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
        
        // Product atomicity check
        const isProductExist = await productService.findOne({productName: productName});

        if (isProductExist){
            throw new Error('해당 상품은 이미 존재합니다. 다시 한 번 확인해주세요.');
        }

        const newProduct = await productService.addProduct({
            brand : brand,
            productName: productName,
            price: price,
            launchDate: launchDate,
            img: img,
            views: views,
            quantity: quantity,
            purchaseCount: purchaseCount,
        });
        console.log(newProduct);

        // Category atomicity check
        const isCategoryExist = await Category.findOne({name: category});

        if (isCategoryExist){
            await Category.updateOne(
                { name: category },
                { $push: { products: newProduct._id } },
            );
        } else{
            await Category.create({
                name: category,
                products: [],
                size: []
            })
        }

        res.status(200).json(newProduct);
    } catch (error) {
        next(error);
    }
});

export { productRouter };
