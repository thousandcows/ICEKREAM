import { Schema } from 'mongoose';
import { AddressSchema } from './address-schema';
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
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
            type: AddressSchema,
            required: false,
        },
        role: {
            type: String,
            required: false,
            default: 'basic-user',
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
