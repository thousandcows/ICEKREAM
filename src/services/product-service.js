import { orderService } from './order-service';
const { productModel } = require('../db/models/product-model');
const {categoryModel} = require('../db/models/category-model');

class ProductService {
    
    constructor(productModel){
        this.productModel = productModel;
    }
    
    // 1. 전체 / 카테고리 상품 목록 조회 기능
    async findAllProducts(category, page, perPage){

            let query = {}
        
            if (category !== null && category !== undefined){
                
                const isCategoryExist = await categoryModel.findOne(category);
                
                if(isCategoryExist){
                    query = {category: isCategoryExist._id}
                }
            }
            const [productList, totalPage] = await this.productModel.getPaginatedProducts(query, page, perPage);
            
            return [ productList, totalPage ];
            

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
    async putOrderProductList(userId, productList){

        // 아이디 중복시 아이디 추가 x, 구매량과 주문량만 변경
        // 재고 수량 남지 않았을 때 throw error

        for (let i = 0; i < productList.length; i++){
            const updatedProductList = []
            const {id, quantity} = productList[i];

            // 7-1. 재고 확인
            const productToCheck = await this.productModel.findById(id);

            if (productToCheck.quantity < quantity){
                throw new Error(`${productToCheck.productName}상품 개수가 ${quantity - productToCheck.quantity}개 부족합니다.`);
            }

            // 7-2. 유저가 이미 구입했는지 확인
            // 7-2-1. 기본 업데이트: 유저, 구매량, 재고 수량 업데이트
            let update = {$push : {purchasedUsers : userId}, $inc : {quantity : -quantity, purchaseCount : quantity}};

            // 7-2-2. 이미 구입하는 유저일 때 
            
            if (productToCheck.purchasedUsers.includes(userId)) {
                update = {$inc : {quantity : -quantity, purchaseCount : quantity}};
            }

            // 7-3. 업데이트
            const updatedProduct = await this.productModel.updateProduct(id, update);
            updatedProductList.push(updatedProduct);
        }

        return updatedProductList;
    }

    // 8. 주문 취소 시 구매자/재고/주문량 변경
    // 유저의 주문량을 확인하고, 취소한 분량 만큼만 뺀다.
    // 유저의 주문 취소량이 전체 구매 건수와 같은 경우 => 유저를 뺀다.
    //                                   작은 경우 => 수량만 조절한다.
    async pullOrderProductList(userId, orderId){

        }

    // 8. 관리자 상품 목록 조회 기능
    async findAllProductsForAdmin(){
        const productList = await this.productModel.findAllProducts();
        return productList;
        

    }
}

const productService = new ProductService(productModel);

export { productService }