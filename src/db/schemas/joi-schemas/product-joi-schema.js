import joi from 'joi';

const productJoiSchema = joi.object({
    category: joi.string().required(),
    brand: joi.string().required(),
    productName: joi.string().required(),
    price: joi.number().required().greater(500), //500원?
    launchDate: joi.date(), //어떤 형식의 date인가 정해야함.
    img: joi.string().required().uri(), //맞나 확인.
    quantity: joi.number().required().greater(1),
    size: joi.array().items(joi.string().required()),
});
const productUpdateJoiSchema = joi.object({
    price: joi.number().required().greater(500), //500원?
    img: joi.string().required().uri(), //맞나 확인.
    quantity: joi.number().required().greater(1),
});
export { productJoiSchema, productUpdateJoiSchema };
