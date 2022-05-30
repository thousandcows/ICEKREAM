const {categoryModel} = require('../db/models/category-model');

class CategoryService {
    
    constructor(categoryModel){
        this.categoryModel = categoryModel;
    }

    // 1. 새 카테고리 추가
    async addCategory(categoryInfo){

        const {name, products, size} = categoryInfo;

        const isCategoryExist = await categoryModel.findOne(name);
        
        if (isCategoryExist){
            throw new Error('이미 존재하는 카테고리입니다.');
        }

        const newCategory = await categoryModel.addCategory({name: name, products: products, size: size});

        return newCategory;
    }

    // 2. 카테고리 삭제
    async deleteCategory(categoryId){
        const result = await categoryModel.deleteCategory(categoryId);
        return result;
    }

    // 3. 카테고리 목록 조회
    async findAllCategories(){
        const categoryList = await categoryModel.findAllCategories();
        return categoryList;
    }

    // 4. 카테고리 검색
    async findOne(categoryName){
        const category = await categoryModel.findOne(categoryName);
        return category;
    }

    // 5. 카테고리 수정
    async updateCategory(categoryId, name, size){
        const updatedCategory = await categoryModel.updateCategory(categoryId, name, size);
        return updatedCategory;
    }

    // 6. 상품 추가 시 카테고리에 반영
    async addProductToCategory(categoryName, productId){
        const updatedCategory = await categoryModel.addProductToCategory(categoryName, productId);
        return updatedCategory;
    }

    // 7. 상품 삭제 시 카테고리에 반영
    async removeProductFromCategory(categoryName, productId){
        const updatedCategory = await Category.updateOne(categoryName,productId);
        return updatedCategory;
    }
}

const categoryService = new CategoryService();

export { categoryService }