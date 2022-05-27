const {categoryModel} = require('../db/models/category-model');

class CategoryService {
    
    constructor(categoryModel){
        this.categoryModel = categoryModel;
    }
    
    // 1. 카테고리 업데이트: 상품 추가
    async updateCategory(categoryName, productId){
        const updatedCategory = await categoryModel.updateCategory(categoryName, productId);
        return updatedCategory;
    }

    // 2. 새 카테고리 추가
    async addCategory(categoryInfo){

        const {name, products, size} = categoryInfo;

        const isCategoryExist = await categoryModel.findOne({name: name});

        if (isCategoryExist){
            throw new Error('이미 존재하는 카테고리입니다.');
        }

        const newCategory = await categoryModel.addCategory({name, products, size});
        return newCategory;
    }

    // 3. 카테고리 삭제
    async deleteCategory(categoryId){
        const result = await categoryModel.deleteCategory(categoryId);
        return result;
    }

    // 4. 카테고리 목록 조회
    async findAllCategories(){
        const categoryList = await categoryModel.findAllCategories();
        return categoryList;
    }

    // 5. 카테고리 검색
    async findOne(categoryName){
        const category = await categoryModel.findOne(categoryName);
        return category;
    }

}

const categoryService = new CategoryService();

export { categoryService }