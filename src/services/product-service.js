const { productModel } = require('../db/models/product-model');
const {categoryModel} = require('../db/models/category-model');

class ProductService {
    
    constructor(productModel){
        this.productModel = productModel;
    }
    
    // 1. 전체 / 카테고리 상품 목록 조회 기능
    async findAllProducts(category, page, perPage){

        let query = ""
        
        if (category !== null && category !== undefined){
            
            const isCategoryExist = await categoryModel.findOne(category);
            
            if(isCategoryExist){
                query = {category: isCategoryExist._id}
            }

        const [productList, totalPage] = await this.productModel.getPaginatedProducts(query, page, perPage);

        return [ productList, totalPage ];
        }
    }
    // 2. 상품 상세 정보 조회 기능
    async findById(productId){

        const product = await this.productModel.findById(productId);

        return product;
    }

    // 3. 상품 추가 기능
    async addProduct(categoryName, productInfo){
        const { productName }= productInfo

        // 3-1. 상품명 중복 확인
        const product = await this.productModel.findByName(productName);

        if (product){
            throw new Error("이미 존재하는 상품명입니다. 새로운 이름을 등록해주세요.");
        }
        
        // 3-2. 중복 확인을 통과한 경우, 상품이 소속할 카테고리 ObjectId 가져오기
        const categoryId = await categoryModel.findOne(categoryName);
        
        // 3-3. 카테고리와 새 상품이 many to many 관계를 형성
        const newProductInfo = {category: categoryId,...productInfo}

        const addedProduct = await this.productModel.create(newProductInfo);
        const productId = addedProduct._id;
        
        await categoryModel.addProductToCategory(categoryName, productId)
        
        // 3-4. 추가된 상품 객체 반환
        return addedProduct;
    }
    
    // 4. 상품 수정 기능
    async updateProduct(productId, update){
        const updatedProduct = await this.productModel.updateProduct(productId, update);
        return updatedProduct;
    }
    // 5. 상품 삭제 기능
    async deleteProduct(productId){
        const categoryName = await categoryModel.findCategoryName(productId);

        const updatedCategory = await categoryModel.removeProductFromCategory(categoryName, productId);
    
        const deletedProduct = await this.productModel.deleteProduct(productId);

        return updatedCategory, deletedProduct;
    }

    // 6. 장바구니 내에 있는 상품 상세 정보 조회
    async getProductsInCart(productIds){
        const productList = []

        for (let i = 0; i < productIds.length; i++){
            
            const productId = productIds[i];

            const productInfo = await this.productModel.findById(productId);

            productList.push(productInfo);
        }
        return productList;

    }

    // 7. 주문 시 구매자/재고/주문량 변경
    async manageProductQuantity(){
        
    }
}

const productService = new ProductService(productModel);

export { productService }