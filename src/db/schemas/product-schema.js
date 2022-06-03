import { Schema } from 'mongoose';
const ProductSchema = new Schema(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: 'category',
        },
        brand: {
            type: String,
            required: true,
        },
        productName: {
            type: String,
            required: true,
            index: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        launchDate: {
            type: String,
            required: true,
            default: '2022-05-25',
        },
        img: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            rerquired: true,
            default: 0,
        },
        quantity: {
            type: Number,
            required: true,
            default: 100,
        },
        purchaseCount: {
            type: Number,
            required: false,
            default: 0,
        },
        purchasedUsers: [String],
        size: {
            type: [String],
        },
        sellerId: {
            type: String,
        },
    },
    {
        collection: 'products',
        timestamps: true,
    },
);

export { ProductSchema };
