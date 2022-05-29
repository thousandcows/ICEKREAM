import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export class UserModel {
    async findByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }

    async findById(userId) {
        const user = await User.findOne({ _id: userId });
        return user;
    }

    async create(userInfo) {
        const createdNewUser = await User.create(userInfo);
        return createdNewUser;
    }

    async findAll() {
        const users = await User.find({});
        return users;
    }

    async update({ userId, update }) {
        const filter = { _id: userId };
        const option = { returnOriginal: false };

        const updatedUser = await User.findOneAndUpdate(filter, update, option);
        return updatedUser;
    }

    async deleteById(userId) {
        const deletedUser = await User.findOneAndDelete({ _id: userId });
        return deletedUser;
    }

    async updateOrder({ userId, orderId }) {
        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { orderList: orderId } },
        );
        return updatedUser;
    }

    async deleteOrder({ userId, orderId }) {
        const orderRemovedUser = await User.updateOne(
            { _id: userId },
            { $pull: { orderList: orderId } },
        );
        return orderRemovedUser;
    }
}

const userModel = new UserModel();

export { userModel };
