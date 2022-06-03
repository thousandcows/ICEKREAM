import { Schema } from 'mongoose';
import { AddressSchema } from './address-schema';
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            index: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        address: {
            type: AddressSchema, //address 부분을 수정해야하는지 토론
            required: false,
        },
        role: {
            type: String,
            required: false,
            default: 'basic-user',
        },
        registerType: {
            type: String,
            default: 'Email', //email or kakao;
        },
        orderList: {
            type: [String],
            required: false,
            default: [],
        },
    },
    {
        collection: 'users',
        timestamps: true,
    },
);

export { UserSchema };
