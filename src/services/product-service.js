const { productModel } = require('../db/models/product-model');
const {categoryModel} = require('../db/models/category-model');
class ProductService {
    
    constructor(productModel){
        this.productModel = productModel;
    }
    
    // 1. 전체 / 카테고리 상품 목록 조회 기능
    async findAllProducts(category, page, perPage){
        const query = {}
        
        if (category !== null && category !== undefined){

            const isCategoryExist = await categoryModel.findOne(category);

            if(isCategoryExist){
                query = {category: category}
            }

        const [productList, totalPage] = await this.productModel.getPaginatedProducts(query, page, perPage);
        return [productList, totalPage];
        }
    }
    // 3. 상품 상세 정보 조회 기능
    // a. 요청 올 때마다 views += 1
    async findById(productId){
        const product = await this.productModel.findById(productId);
        return product;
    }

    // 4. 상품 추가 기능
    async addProduct(categoryName, productInfo){
        const { productName }= productInfo

        const product = await this.productModel.findByName(productName);

        if(product){
            throw new Error("이미 존재하는 상품명입니다. 새로운 이름을 등록해주세요.");
        }

        const addedProduct = await this.productModel.create(productInfo);
        
        const productId = addedProduct._id;
        
        const updatedCategory = await categoryModel.updateCategory(categoryName, productId)
        console.log(updatedCategory);
        return addedProduct;
    }
    
    // 5. 상품 수정 기능
    async updateProduct(productId, update){
        const updatedProduct = await this.productModel.updateProduct(productId, update);
        return updatedProduct;
    }
    // 6. 상품 삭제 기능
    async deleteProduct(productId){
        const deletedProduct = await this.productModel.deleteProduct(productId);
        
        return deletedProduct;
    }

    // 7. 장바구니 내에 있는 상품 상세 정보 조회
    async getProductsInCart(productIds){
        console.log(productIds.length)
        const productList = []

        for (let i = 0; i < productIds.length; i++){
            
            const productId = productIds[i];

            const productInfo = await this.productModel.findById(productId);

            productList.push(productInfo);
        }
        return productList;

    }

}

const productService = new ProductService(productModel);

export { productService }