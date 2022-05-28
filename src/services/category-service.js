const {categoryModel} = require('../db/models/category-model');

class CategoryService {
    
    constructor(categoryModel){
        this.categoryModel = categoryModel;
    }
    
    // 1. 상품 추가 시 카테고리에 반영
    async addProductToCategory(categoryName, productId){
        const updatedCategory = await categoryModel.addProductToCategory(categoryName, productId);
        return updatedCategory;
    }

    // 2. 새 카테고리 추가
    async addCategory(categoryInfo){

        const {name, products, size} = categoryInfo;
        console.log(name, products, size);

        const isCategoryExist = await categoryModel.findOne(name);
        
        if (isCategoryExist){
            throw new Error('이미 존재하는 카테고리입니다.');
        }

        const newCategory = await categoryModel.addCategory({name: name, products: products, size: size});

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

    // 6. 카테고리 수정
    async updateCategory(name, size){
        const updatedCategory = await categoryModel.updateCategory(name, size);
        return updatedCategory;
    }
}

const categoryService = new CategoryService();

export { categoryService }