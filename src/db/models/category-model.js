import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('catagory', CategorySchema);

export class CategoryModel {
    
    // 1. 카테고리 업데이트: 상품 추가
    async updateCategory(categoryName, productId){

        const filter = { name: categoryName};
        const update = { $push : { products : productId}};
        const option = { returnOriginal : false };

        const updatedCategory = await Category.updateOne(filter, update, option);
        return updatedCategory;
    }

    // 2. 새 카테고리 추가
    async addCategory(categoryInfo){
        const newCategory = await Category.create(categoryInfo);
        return newCategory;
    }
    // 3. 카테고리 삭제
    async deleteCategory(categoryId){
        const result = await Category.deleteOne({_id: categoryId});
        return result;
    }
    // 4. 카테고리 목록 조회
    async findAllCategories(){
        const categoyList = await Category.find({})
        return categoyList;
    }
    // 5. 카테고리 검색
    async findOne(categoryName){
        const catagory = await Category.findOne({name: categoryName});
        return catagory;
    }


}

const categoryModel = new CategoryModel();

export { categoryModel }
