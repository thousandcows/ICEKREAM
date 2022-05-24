import { Schema } from 'mongoose';

const OrderSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        deliveryAddress: {
            type: new Schema(
                {
                    postalCode: String,
                    address1: String,
                    address2: String,
                },
                {
                    _id: false,
                },
            ),
            required: true,
        },
        billingMethod: {
            type: String,
            required: true,
        },
        paymentStatus: {
            type: String,
            required: true,
        },
        productList: [
            {
                id: String,
                quantity: Number,
            },
        ],
    },
    {
        collection: 'users',
        timestamps: true,
    },
);

export { OrderSchema };
