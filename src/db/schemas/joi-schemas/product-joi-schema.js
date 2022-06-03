import joi from 'joi';

const productJoiSchema = joi.object({
    category: joi.string().required().messages({
        'string.empty': `카테고리는 비어있을 수 없습니다.`,
        'any.required': '카테고리는 반드시 입력해야 합니다.',
    }),
    brand: joi.string().required().messages({
        'string.empty': `브랜드는 비어있을 수 없습니다.`,
        'any.required': '브랜드는 반드시 입력해야 합니다.',
    }),
    productName: joi.string().required().messages({
        'string.empty': `상품명은 비어있을 수 없습니다.`,
        'any.required': '상품명은 반드시 입력해야 합니다.',
    }),
    price: joi.number().required().greater(500).messages({
        'any.required': '가격은 반드시 입력해야 합니다.',
        'number.greater': '가격은 500원보다 커야합니다.',
    }), 
    launchDate: joi.string().messages({
        'date.base': '날짜형식는 비어있을 수 없습니다.',
    }), 
    img: joi.string().required().uri().messages({
        'string.empty': `이미지 url은 비어있을 수 없습니다.`,
        'any.required': '이미지 url은 반드시 입력해야 합니다.',
        'string.uri': '이미지 url이 올바른 형식이 아닙니다.',
    }), 
    quantity: joi.number().required().greater(1).messages({
        'any.required': '재고 수량은 반드시 입력해야 합니다.',
        'number.greater': '재고 수량은 1개보다 커야합니다.',
    }),
    size: joi.array().items(joi.string().required()), 
});
const productUpdateJoiSchema = joi.object({
    price: joi.number().required().greater(500).messages({
        'any.required': '가격은 반드시 입력해야 합니다.',
        'number.greater': '가격은 500원보다 커야합니다.',
    }), 
    img: joi.string().required().uri().messages({
        'string.empty': `이미지 url은 비어있을 수 없습니다.`,
        'any.required': '이미지 url은 반드시 입력해야 합니다.',
        'string.uri': '이미지 url이 올바른 형식이 아닙니다.',
    }), 
    quantity: joi.number().required().greater(1).messages({
        'any.required': '재고 수량은 반드시 입력해야 합니다.',
        'number.greater': '재고 수량은 1개보다 커야합니다.',
    }),
});
export { productJoiSchema, productUpdateJoiSchema };
