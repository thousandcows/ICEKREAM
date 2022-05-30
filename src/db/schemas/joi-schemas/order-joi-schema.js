import joi from 'joi';

const orderJoiSchema = joi.object({
    postalCode: joi
        .string()
        .pattern(/[0-6][0-3]\d{3}/)
        .required(),
    address1: joi.string().required(), //이것도 data validation이 필요할까요?
    address2: joi.string(),
    billingMethod: joi.string().required(),
    productList: joi.array().items(
        joi
            .object({
                id: joi.string().required(),
                quantity: joi.number().greater(0).required(),
            })
            .required(),
    ),
}); //address validation은 어떻게 할까? ....
export { orderJoiSchema };
