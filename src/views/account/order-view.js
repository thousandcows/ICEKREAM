import * as Api from '/api.js';
import { navTransition } from '../nav-transition/nav-transition.js';


navTransition('order-view').then(checkData => {
    if (!checkData.isLogined) {
        alert('로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }
});

async function fetchOrderInfo(userId) {

    // 테스트용: 6291d6e14cc1920b02fb4ce1
    const orderList = await Api.get('/api/auth',`${userId}/orders`);
    const productsContainer = document.querySelector('#productsContainer');
    // const orderList = await Api.get('/api/auth', `6291d6e14cc1920b02fb4ce1/orders`);

    // console.log(orderList);

    const extractOrderInfo = orderList.map(orderInfo => {
        return [
            orderInfo.createdAt,
            orderInfo.userId,
            orderInfo.paymentStatus,
            [...orderInfo.productList]
        ];
    });

    // console.log(extractOrderInfo);

    extractOrderInfo.forEach( async (orderItemInfo) => {
        const [orderDate, orderId, orderState, orderList] = [orderItemInfo[0],
        orderItemInfo[1],
        orderItemInfo[2],
        orderItemInfo[3]
        ];
        // console.log(orderDate);
        const orderDateForm = orderDate.slice(0, 10);

        const itemID = orderList[0].id;
        // console.log(itemID, orderList);
        const orderProduct = await Api.get(`/api/products/${itemID}`);
        // console.log(orderProduct);
        const ProductName = orderProduct.productName;

        const orderInfo = `<div class="columns orders-item" id="${orderId}">
        <div class="column is-2">${orderDateForm}</div>
        <div class="column is-6 order-summary">${ProductName}</div>
        <div class="column is-2">${orderState}</div>
        <div class="column is-2">
        <button class="button" id="deleteButton-${orderId}">주문 취소</button>
        </div>
        </div>`;

        productsContainer.insertAdjacentHTML('beforeend', orderInfo);



    });


}

// billingMethod: " ALI Pay"
// createdAt: "2022-05-29T10:48:01.866Z"
// deliveryAddress: { postalCode: '12345', address1: '경기도 수원시 무슨동 어떤길', address2: '1004-104' }
// paymentStatus: "Ok"
// productList: (2)[{… }, {… }]
// updatedAt: "2022-05-29T10:48:01.866Z"
// userId: "6291d6e14cc1920b02fb4ce1"



const userId = sessionStorage.getItem('userId');

fetchOrderInfo(userId);





