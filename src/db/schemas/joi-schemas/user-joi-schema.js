import joi from 'joi';

const registerJoiSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    fullName: joi
        .string()
        .pattern(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/) //한글 이름, 영문 이름 regex;
        .required(),
    password: joi.string().required().min(4), // 우선 4글자 이상이라고 register.js에 되어있는데 수정도 가능할 듯...
});

const userUpdateJoiSchema = joi.object({
    fullName: joi
        .string()
        .pattern(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/), //한글 이름, 영문 이름 regex;
    password: joi.string().min(4), // 우선 4글자 이상이라고 register.js에 되어있는데 수정도 가능할 듯...
    address: joi.object({
        postalCode: joi
            .string()
            .pattern(/[0-6][0-3]\d{3}/)
            .required(),
        address1: joi.string().required(),
        address2: joi.string(),
    }), //address validation은 어떻게 할까? ....
    role: joi.string(),
    phoneNumber: joi.string().pattern(/^\d{3}-\d{3,4}-\d{4}$/),
    currentPassword: joi.string().required().min(4),
});

export { registerJoiSchema, userUpdateJoiSchema };
