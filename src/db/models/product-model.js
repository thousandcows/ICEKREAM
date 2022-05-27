import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';
import { ProductSchema } from '../schemas/product-schema';


const Product = model('products', ProductSchema);

export class ProductModel {
    // 1. 전체 상품 목록 조회 기능
    async findAllProducts() {
        const productList = await Product.find({});
        return productList;
    }
    // 2. 카테고리별 상품 조회 기능
    async findByCategory(category){
        const productList = await Product.find(category);
        return productList;
    }
    // 3. 상품 상세 정보 조회 기능
    async findById(productId) {
        const product = await Product.findOne({_id: productId});
        return product;
    }
    // 4. 상품 추가 기능
    // a. 상품 이름 중복 확인
    async findByName(productName){
        const product = await Product.findOne({productName: productName});
        return product;
    }
    // b. 상품 추가
    async create(productInfo) {
        console.log(productInfo);
        const createdNewProduct = await Product.create(productInfo);
        console.log(createdNewProduct);

        // c. 카테코리에 상품 정보 업데이트

        return createdNewProduct;
    }
    // 5. 상품 수정 기능
    async updateProduct(productId, update) {
        const filter = {_id: productId};
        const option = { returnOriginal : false };

        const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
        return updatedProduct;
    }
    // 6. 상품 삭제 기능
    async deleteProduct(productId) {
        const deletedProduct = await Product.deleteOne({ _id: productId });
        return deletedProduct;
    }

    // 7. 상품 조회 페이지네이션 기능
    async getPaginatedProducts (query, page, perPage) {

        const [total, productList] = await Promise.all([
            Product.countDocuments(query),
            Product
                .find(query)
                .sort({views: -1})
                .skip(perPage * (page - 1))
                .limit(perPage)
        ]);

        const totalPage = Math.ceil(total / perPage);

        return [productList, totalPage];
        
    }
}

const productModel = new ProductModel();

export { productModel }
