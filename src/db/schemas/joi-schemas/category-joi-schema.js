import joi from 'joi';

const categoryJoiSchema = joi.object({
    name: joi.string().required().messages({
        'string.empty': `카테고리 이름은 비어있을 수 없습니다.`,
        'any.required': '카테고리 이름은 반드시 입력해야 합니다.',
    }),
    size: joi.array().items(joi.string().required()),

});

export { categoryJoiSchema };
