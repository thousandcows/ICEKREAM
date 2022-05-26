import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
    
    async findAll() {
        const productList = await Product.find({});
        return productList;
    }

    async create(productInfo) {
        const createdNewProduct = await Product.create(productInfo);
        return createdNewProduct;
    }

    async findById(productId) {
        const product = await Product.findById({ _id: productId });
        return product;
    }

    async findByName(productName){
        const product = await Product.findOne(productName);
        return product;
    }

    async findByCategory(category){
        const productList = await Product.find(category);
        return productList;
    }

    async updateProduct({productId, update}) {
        const filter = {_id: productId};
        const option = { returnOriginal : false };

        const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
        return updatedProduct;
    }

    async deleteProduct(productId) {
        const deletedProduct = await Product.deleteOne({ _id: productId });
        return deletedProduct;
    }
}

const productModel = new ProductModel();

export { productModel }
