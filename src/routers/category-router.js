import { Router } from 'express';
import is from '@sindresorhus/is';
import { model } from 'mongoose';
import { categoryService } from '../services/category-service';
import errors from 'eslint-plugin-import/config/errors';

const categoryRouter = Router();

// 1. 카테고리 업데이트: 상품 추가
    categoryRouter.patch('/', async (req, res, next) => {
        try {
            const {categoryName, productId} = req.body;
            const updateCategory = await categoryService.updateCategory(categoryName, productId);
            res.status(200).json(updateCategory);
        } catch (error) {
            next(error);
        }
    });
    // 2. 새 카테고리 추가
    categoryRouter.post('/', async (req, res, next) => {
        try {
            const categoryInfo = req.body;
            const newCategory = await categoryService.addCategory(categoryInfo);
            res.status(200).json(newCategory);

        } catch (error) {
            next(error);
        }
    });
    // 3. 카테고리 삭제
    categoryRouter.delete('/', async (req, res, next) => {
        try {
            const categoryId = req.params.categoryId;
            const result = await categoryService.deleteCategory(categoryId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    });
    // 4. 카테고리 목록 조회
    categoryRouter.get('/', async (req, res, next) => {
        try {
            const categoryList = await categoryService.findAllCategories();
            res.status(200).json(categoryList);
        } catch (error) {
            next(error);
        }
    });
    // 5. 카테고리 검색
    categoryRouter.get('/search', async (req, res, next) => {
        try {
            const {categoryName} = req.query;
            const category = await categoryService.findOne(categoryName);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    });


export { categoryRouter };
