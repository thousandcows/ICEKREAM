const { productModel } = require('../db/models/product-model');

class ProductService {
    
    constructor(productModel){
        this.productModel = productModel;
    }

    async addProduct(productInfo){
        const addedProduct = await this.productModel.create(productInfo);
        return addedProduct;
    }

    async findAllProducts(){
        const productList = await this.productModel.findAll();
        return productList;
    }

    async findOne(productName){
        const product = await this.productModel.findByName(productName);
        return product;
    }

    async findByCategory(category){
        const productList = await this.productModel.findByCategory({category: category});
        return productList;
    }

}

const productService = new ProductService(productModel);

export { productService }