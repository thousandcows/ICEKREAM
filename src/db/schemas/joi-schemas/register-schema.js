import joi from 'joi';

const registerSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    fullName: joi
        .string()
        .pattern(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/) //한글 이름, 영문 이름 regex;
        .required(),
    password: joi.string().required().min(4), // 우선 4글자 이상이라고 register.js에 되어있는데 수정도 가능할 듯...
});

export { registerSchema };
