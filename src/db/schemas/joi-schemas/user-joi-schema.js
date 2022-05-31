import joi from 'joi';

const registerJoiSchema = joi.object({
    email: joi.string().email().lowercase().required().messages({
        'string.empty': '이메일은 비어있을 수 없습니다.',
        'any.required': '이메일은 반드시 입력되어야 합니다.',
        'string.email': '올바르지 않은 이메일 형식입니다.',
    }),
    fullName: joi
        .string()
        .pattern(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/) //한글 이름, 영문 이름 regex;
        .required()
        .messages({
            'string.empty': `이름은 비어있을 수 없습니다.`,
            'any.required': `이름은 반드시 입력되어야 합니다.`,
            'string.pattern.base':
                '이름은 한글 2글자-4글자이거나 영문 형식 firstname lastname이어야 합니다.',
        }),
    password: joi.string().required().min(4).messages({
        'string.empty': `비밀번호는 비어있을 수 없습니다.`,
        'any.required': '비밀번호는 반드시 입력해야 합니다.',
        'string.min': '비밀번호는 최소 4글자 이상이어야 합니다.',
    }), // 우선 4글자 이상이라고 register.js에 되어있는데 수정도 가능할 듯...
});

const userUpdateJoiSchema = joi.object({
    fullName: joi
        .string()
        .pattern(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/)
        .messages({
            'string.empty': `이름은 비어있을 수 없습니다.`,
            'string.pattern.base':
                '이름은 한글 2글자-4글자이거나 영문 형식 firstname lastname이어야 합니다.',
        }), //한글 이름, 영문 이름 regex;
    password: joi.string().min(4).messages({
        'string.empty': `비밀번호는 비어있을 수 없습니다.`,
        'string.min': '비밀번호는 최소 4글자 이상이어야 합니다.',
    }), // 우선 4글자 이상이라고 register.js에 되어있는데 수정도 가능할 듯...
    address: joi.object({
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
        }),
        address2: joi.string(),
    }), //address validation은 어떻게 할까? ....
    role: joi.string(),
    phoneNumber: joi
        .string()
        .pattern(/^\d{3}-\d{3,4}-\d{4}$/)
        .messages({
            'string.empty': '전화번호는 비어있을 수 없습니다.',
            'string.pattern.base':
                '전화번호는 000-0000-0000의 형식을 따라야합니다.',
        }),
    currentPassword: joi.string().required().min(4).messages({
        'string.empty': `비밀번호는 비어있을 수 없습니다.`,
        'any.required': '비밀번호는 반드시 입력해야 합니다.',
        'string.min': '비밀번호는 최소 4글자 이상이어야 합니다.',
    }),
});

export { registerJoiSchema, userUpdateJoiSchema };
