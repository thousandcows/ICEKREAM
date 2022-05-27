import { Schema } from 'mongoose';

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products',
        },
    ],
    size: {
        type: [String],
        required: true,
    }
},{
    collection: 'category',
    timestamps: true,
},);

export { CategorySchema };
