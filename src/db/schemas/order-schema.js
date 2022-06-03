import { Schema } from 'mongoose';
import { AddressSchema } from './address-schema';
const OrderSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        deliveryAddress: {
            type: AddressSchema,
            required: true,
        },
        billingMethod: {
            type: String,
            required: true,
        },
        paymentStatus: {
            type: String,
            default: "Ok",
        },
        productList: [
            {
                id: String,
                name: String,
                quantity: Number,
            },
        ],
    },
    {
        collection: 'orders',
        timestamps: true,
    },
);

export { OrderSchema };
