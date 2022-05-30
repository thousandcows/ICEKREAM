import joi from 'joi';

const categoryJoiSchema = joi.object({
    name: joi.string().required(),
    products: joi.array().items(joi.string()),
    size: joi.array().items(joi.string().required()), // 우선 4글자 이상이라고 register.js에 되어있는데 수정도 가능할 듯...
});

export { categoryJoiSchema };
