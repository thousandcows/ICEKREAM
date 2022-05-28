import joi from 'joi';

const registerSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    fullName: joi.string().alphanum().required(),
    password: joi.string().required().min(8),
});

export { registerSchema };
