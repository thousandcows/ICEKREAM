import * as Api from '/api.js';


const userId = sessionStorage.getItem('userId');
const productsContainer = document.querySelector('#productsContainer');


async function fetchOrderInfo(userId) {

    // 테스트용: 6291d6e14cc1920b02fb4ce1
    const orderList = await Api.get('/api/auth', `${userId}/orders`);


    const extractOrderInfo = orderList.map(orderInfo => {
        return [
            orderInfo.createdAt,
            orderInfo._id,
            orderInfo.paymentStatus,
            [...orderInfo.productList]
        ];
    });


    extractOrderInfo.forEach(async (orderItemInfo) => {
        const [orderDate, orderId, orderState, itemList] = [orderItemInfo[0],
        orderItemInfo[1],
        orderItemInfo[2],
        orderItemInfo[3]
        ];
        const orderDateForm = orderDate.slice(0, 10);

        // 주문 상태에 따라 구분
        const orderProgress = orderState === 'Ok' ?
                            '상품 준비중' : '결제완료';   

        // 주문 내역의 아이템 이름, 수량
        const productString = [];

        itemList.forEach((obj) => {
            if (obj.name !== undefined) {
                const info = {name: obj.name, quantity: obj.quantity};
                productString.push(info);
            }
        })

        if (productString.length !== 0) {
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
    button.addEventListener('click', (e) => {
        const orderId = e.target.id.slice(13);
        deleteOrder(button, orderId);
    });
})




async function deleteOrder(button, orderId) {
    const entireRow = button.parentNode.parentNode;
    const check = confirm(
        '한 번 삭제한 주문은 복구가 불가능합니다. 그래도 삭제하시겠습니까?',
    );

    if (check) {
        productsContainer.removeChild(entireRow);

        const result = await Api.delete(
            '',
            `api/auth/${userId}/orders/${orderId}`
        );

        if (result) {
            alert('삭제가 완료되었습니다.');
        }
    }
}






