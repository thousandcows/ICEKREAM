// import bcrypt from 'bcrypt';
import { orderModel } from '../db/models/order-model';
class OrderService {
    // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    // 회원가입
    async addOrder(orderInfo) {
        // 객체 destructuring
        const {
            userId,
            postalCode,
            address1,
            address2,
            billingMethod,
            productList,
        } = orderInfo;

        //

        // billingMethod확인
        // 품절 확인?
        // 주소 확인

        // 우선 비밀번호 해쉬화(암호화)
        const newAddress = {
            postalCode,
            address1,
            address2,
        };

        const newOrderInfo = {
            userId,
            deliveryAddress: newAddress,
            billingMethod,
            productList,
        };

        // db에 저장
        const createdNewOrder = await this.orderModel.create(newOrderInfo);

        return createdNewOrder;
    }

    async findAllOrders() {
        const orders = await this.orderModel.findAll();
        return orders;
    }

    async findOrders(userId) {
        const orders = await this.orderModel.findAllForOneUser(userId);
        return orders;
    }

    async deleteUserOrder(orderId) {
        const deletedOrder = await this.orderModel.deleteById(orderId);
        return deletedOrder;
    }
}

const orderService = new OrderService(orderModel);

export { orderService };
