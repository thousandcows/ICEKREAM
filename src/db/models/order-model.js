import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
  
    async findById(orderId) {
        const order = await Order.findOne({ _id: orderId });
        return order;
    }

    async create(orderInfo) {
        const createdNewOrder = await Order.create(orderInfo);
        return createdNewOrder;
    }

    async findAll() {
        const orders = await Order.find({});
        return orders;
    }

    async findAllForOneUser(userId){
        const orders = await Order.find({userId: userId});
        return orders;
    }

    async deleteById(orderId){
        const deletedOrder = await Order.findOneAndDelete({_id : orderId});
        return deletedOrder;
    }

    
}

const orderModel = new OrderModel();

export { orderModel };
