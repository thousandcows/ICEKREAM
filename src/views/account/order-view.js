import * as Api from '/api.js';
import { navTransition } from '../nav-transition/nav-transition.js';


navTransition('order-view').then(checkData => {
    if (!checkData.isLogined) {
        alert('로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }
});


const userId = sessionStorage.getItem('userId');
const productsContainer = document.querySelector('#productsContainer');


async function fetchOrderInfo(userId) {

    // 테스트용: 6291d6e14cc1920b02fb4ce1
    const orderList = await Api.get('/api/auth', `${userId}/orders`);


    // console.log(orderList);
    // const productsContainer = document.querySelector('#productsContainer');

    const extractOrderInfo = orderList.map(orderInfo => {
        return [
            orderInfo.createdAt,
            orderInfo._id,
            orderInfo.paymentStatus,
            [...orderInfo.productList]
        ];
    });

    console.log(orderList);

    extractOrderInfo.forEach(async (orderItemInfo) => {
        const [orderDate, orderId, orderState, itemList] = [orderItemInfo[0],
        orderItemInfo[1],
        orderItemInfo[2],
        orderItemInfo[3]
        ];
        const orderDateForm = orderDate.slice(0, 10);
        // console.log(itemList);

        // 주문 상태에 따라 구분
        const orderProgress = orderState === 'Ok' ?
                            '상품 준비중' : '결제완료';   
        // if (orderState === 'Ok') {
        //     orderState = '상품 준비중';
        // } else {
        //     orderState = '결제 완료';
        // }


        // 주문 내역의 아이템 이름, 수량
        const productString = [];

        itemList.forEach((obj) => {
            // console.log(obj.name, obj);
            if (obj.name !== undefined) {
                const info = {name: obj.name, quantity: obj.quantity};
                // productString.push(obj.name);
                productString.push(info);
            }
        })

        if (productString.length !== 0) {
            // const productName = productString.join();
            productString.forEach((productInfo) => {
                const orderInfo = `<div class="columns orders-item" id="${orderId}">
                            <div class="column is-2">${orderDateForm}</div>
                            <div class="column is-5 order-summary">${productInfo.name}</div>
                            <div class="column is-1 order-summary">${productInfo.quantity}</div>
                            <div class="column is-2">${orderProgress}</div>
                            <div class="column is-2">
                            <button class="button" id="deleteButton-${orderId}">주문 취소</button>
                            </div>
                            </div>`;

                productsContainer.insertAdjacentHTML('beforeend', orderInfo);
            })
        }

    });
}


await fetchOrderInfo(userId);


const removeBtn = document.querySelectorAll('.button');

removeBtn.forEach((button) => {
    // console.log(button);
    button.addEventListener('click', (e) => {
        // console.log(this, e.target.id);
        const orderId = e.target.id.slice(13);
        deleteOrder(button, orderId);
    });
})




async function deleteOrder(button, orderId) {
    const entireRow = button.parentNode.parentNode;
    // console.log(entireRow);
    const check = confirm(
        '한 번 삭제한 주문은 복구가 불가능합니다. 그래도 삭제하시겠습니까?',
    );

    if (check) {
        productsContainer.removeChild(entireRow);

        // const data = { userId };

        // api/admin/product/:productId
        // /api/auth/:userId/:productId
        // /api/auth/:userId/orders/:orderId 
        console.log(userId, orderId);
        const result = await Api.delete(
            '',
            `api/auth/${userId}/orders/${orderId}`
        );

        if (result) {
            alert('삭제가 완료되었습니다.');
        }
    }
}






