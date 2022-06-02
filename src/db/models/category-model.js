import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('catagory', CategorySchema);

export class CategoryModel {

    // 1. 새 카테고리 추가
    async addCategory(categoryInfo){
        const newCategory = await Category.create(categoryInfo);
        return newCategory;
    }
    // 2. 카테고리 삭제
    async deleteCategory(categoryId){
        const result = await Category.deleteOne({_id: categoryId});
        return result;
    }
    // 3. 전체 카테고리 조회
    async findAllCategories(){
        const categoyList = await Category.find({})
        return categoyList;
    }
    // 4. 카테고리 검색 - 이름
    async findOne(categoryName){
        const catagory = await Category.findOne({name: categoryName});
        return catagory;
    }

    // 5. 카테고리 검색 - id
    async findById(categoryId){
        const category = await Category.findById(categoryId)
        return category;
    }

    // 6. 카테고리 수정
    async updateCategory({categoryId, name, size}){
        const filter = {_id: categoryId};
        const update = {name: name, size : size};
        const option = { returnOriginal : false };
        const updateCategory = await Category.updateOne(filter, update, option);
        return updateCategory;

    }

    // 7. 상품 추가 시 카테고리에 반영
    async addProductToCategory(categoryName, productId){
        const filter = { name: categoryName};
        const update = { $push : { products : productId}};
        const option = { returnOriginal : false };

        const updatedCategory = await Category.updateOne(filter, update, option);
        return updatedCategory;
    }

    // 8. 상품 삭제 시 카테고리에 반영
    async removeProductFromCategory(categoryName, productId){
        const filter = { name: categoryName};
        const update = { $pull : { products : productId}};
        const option = { returnOriginal : false };

        const updatedCategory = await Category.updateOne(filter, update, option);
        return updatedCategory;
    }

    // 9. 상품의 카테고리 명 검색
    async findCategoryName(productId){
        const category = await Category.find({products: productId}).populate({path: 'products', select : 'name'});
        const categoryName = category[0].name;
        return categoryName;
    }

}

const categoryModel = new CategoryModel();

export { categoryModel }
