import { Schema } from 'mongoose';
const shortId = require('./types/short-id');

// required: shortId, category, brand, nameEnglish, price, firstDateAvailable, img, views, quantity
// optional: size
// in consideration: purchaseCount, purchasedUser
const ProductSchema = new Schema(
  {
    shortId,
    category: {
        type: String, // categories = SHOES, CLOTHES, ETC
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    firstDateAvailable: {
        type: String,
        required: true,
        default: "2022-05-25",
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
        default: 0
    },
    purchasedUsers: [String]
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

export { ProductSchema };
