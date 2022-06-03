import joi from 'joi';

const orderJoiSchema = joi.object({
    postalCode: joi
        .string()
        .pattern(/[0-6][0-3]\d{3}/)
        .required()
        .messages({
            'string.empty': '우편번호는 비어있을 수 없습니다.',
            'any.required': '우편번호는 필수로 입력해야 합니다.',
            'string.pattern.base': '우편번호는 5자리 숫자 형식입니다.',
        }),
    address1: joi.string().required().messages({
        'string.empty': '주소는 비어있을 수 없습니다.',
        'any.required': '주소는 필수로 입력해야 합니다.',
    }), //이것도 data validation이 필요할까요?
    address2: joi.string(),
    billingMethod: joi.string().required().messages({
        'string.empty': '결제 방식은 비어있을 수 없습니다.',
        'any.required': '결제 방식은 필수로 입력해야 합니다.',
    }),
    productList: joi.array().items(
        joi
            .object({
                id: joi.string().required().messages({
                    'string.empty': '상품아이디는 비어있을 수 없습니다.',
                    'any.required': '상품아이디는 필수로 입력해야 합니다.',
                }),
                name: joi.string().messages({
                    'string.empty': '상품 이름은 비어있을 수 없습니다.',
                }),
                quantity: joi.number().greater(0).required().messages({
                    'number.greater': '상품 수량은 0보다 커야합니다.',
                    'any.required': '상품 수량은 필수로 입력해야 합니다.',
                }),
            })
            .required(),
    ),
}); //address validation은 어떻게 할까? ....
export { orderJoiSchema };
