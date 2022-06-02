import * as Api from '/api.js';
import { navTransition } from '../nav-transition/nav-transition.js';

const userId = sessionStorage.getItem('userId');

navTransition('order-view').then(checkData => {
    if (!checkData.isLogined) {
        alert('로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }
});

// async function getProductName(itemList) {
//     const List = [];
//     itemList.forEach(async (item) => {
//         const itemID = item.id;
//         const orderProduct = await Api.get(`/api/products/${itemID}`);
//         // return orderProduct.productName;
//         // console.log(orderProduct, typeof orderProduct);
//         // console.log(orderProduct['productName']);
//         if (orderProduct['productName'] !== null) {
//             List.push(orderProduct['productName']);
//             console.log(List);
//         }
//     });
//     return List;
// }

async function getProductName(itemList) {

    const orderProduct = await Api.get(`/api/auth`);

}



async function fetchOrderInfo(userId) {

    // 테스트용: 6291d6e14cc1920b02fb4ce1
    const orderList = await Api.get('/api/auth', `${userId}/orders`);
    console.log(orderList);
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

    extractOrderInfo.forEach(async (orderItemInfo) => {
        const [orderDate, orderId, orderState, itemList] = [orderItemInfo[0],
        orderItemInfo[1],
        orderItemInfo[2],
        orderItemInfo[3]
        ];
        const orderDateForm = orderDate.slice(0, 10);
        // console.log(itemList, orderItemInfo);

        const List = ['확인'];
        let productResult;
        // 주문 내역의 아이템 리스트
        const productString = itemList.map(async (obj) => {
            // console.log(obj.id);
            const product = await Api.get(`/api/products/${obj.id}`);
            // console.log(product);
            if (product !== null) {
                // List.push(product.productName);
                return product.productName;
            }
        })
        // console.log(productString);

        productString.forEach((item) => {
            item.then((res) => {
                if (res !== undefined) {
                    const ProductName = res;
                    const orderInfo = `<div class="columns orders-item" id="${orderId}">
                <div class="column is-2">${orderDateForm}</div>
                <div class="column is-6 order-summary">${ProductName}</div>
                <div class="column is-2">${orderState}</div>
                <div class="column is-2">
                <button class="button" id="deleteButton-${orderId}">주문 취소</button>
                </div>
                </div>`;
                    productsContainer.insertAdjacentHTML('beforeend', orderInfo);

                }
                console.log('확인1');
            })

        })
        // const ProductList = itemList.map(async (item) => {
        //     const itemID = item.id;
        //     const orderProduct = await Api.get(`/api/products/${itemID}`);
        //     // console.log(orderProduct);
        //     if (orderProduct) {
        //         resolve(orderProduct);
        //     } else {
        //         reject();
        //     }
        //     // return orderProduct;

        //     // const productList = [];

        //     // if (orderProduct) {
        //     //     // console.log(orderProduct['productName']);
        //     //     // productList.push(orderProduct['productName']);
        //     //     const ProductName = orderProduct['productName'];

        //     //     const orderInfo = `<div class="columns orders-item" id="${orderId}">
        //     //     <div class="column is-2">${orderDateForm}</div>
        //     //     <div class="column is-6 order-summary">${ProductName}</div>
        //     //     <div class="column is-2">${orderState}</div>
        //     //     <div class="column is-2">
        //     //     <button class="button" id="deleteButton-${orderId}">주문 취소</button>
        //     //     </div>
        //     //     </div>`;
        //     //     productsContainer.insertAdjacentHTML('beforeend', orderInfo);
        //     // }
        // }).then((res) => {
        //     console.log(res);
        // }).catch(() => {

        // });

        // for( const item of itemList) {
        //     console.log(item);
        //     new Promise(())
        // }

        // console.log(ProductList);
        // console.log(itemID, orderId, orderItemInfo, itemList);


        // const ProductList = await getProductName(itemList);
        // console.log(ProductList);





        // const orderInfo = `<div class="columns orders-item" id="${orderId}">
        // <div class="column is-2">${orderDateForm}</div>
        // <div class="column is-6 order-summary">${ProductName}</div>
        // <div class="column is-2">${orderState}</div>
        // <div class="column is-2">
        // <button class="button" id="deleteButton-${orderId}">주문 취소</button>
        // </div>
        // </div>`;


        // productsContainer.insertAdjacentHTML('beforeend', orderInfo);

        // const removeBtn = document.querySelectorAll('.button');
        // console.log(removeBtn);
        // removeBtn.forEach((button) => {
        //     button.addEventListener('click', (e) => {
        //         console.log(this, e.target);
        //         deleteOrder(itemID);
        //     });
        // });


        // console.log(removeBtn);
        // removeBtn.addEventListener('click', (e) => {
        //     const orderItemBox = e.target.parentNode.parentNode;
        //     orderItemBox.remove();
        //     // orderItemBox.parentNode.removeChild(orderItemBox);
        //     console.log(orderItemBox);
        // })


        // 5. 버튼에 삭제 기능 추가
        // const deleteButtons = document.querySelectorAll('.deleteButton');

        // deleteButtons.forEach((button) => {
        //     button.addEventListener('click', deleteCategory);
        // });

    });
}

await fetchOrderInfo(userId);


async function Test() {
    
    const removeBtn = document.querySelectorAll('.button');
    console.log(removeBtn);
    removeBtn.forEach((button) => {
        console.log(button);
        button.addEventListener('click', (e) => {
            // console.log(this, e.target, e.target.id);
            // console.log(orderID);
            // debugger;
            const orderID = e.target.id.slice(13);
            deleteOrder(e.target, orderID);
        });
    });
}
await Test();


async function deleteOrder(button, orderId) {
    // console.log(button, button.parentNode.parentNode);

    // const rowBtn = document.querySelector(`#${button}`);
    // console.log(rowBtn.parentNode.parentNode);
    console.log('확인');
    const entireRow = button.parentNode.parentNode;
    const check = confirm(
        '한 번 삭제한 주문은 복구가 불가능합니다. 그래도 삭제하시겠습니까?',
    );

    if (check) {
        productsContainer.removeChild(entireRow);

        // const productId = this.id.slice(13);
        const data = { orderId };

        // api/admin/product/:productId
        // /api/auth/:userId/:productId
        // /api/auth/:userId/orders/:orderId 
        console.log(orderId);
        const result = await Api.delete(
            '',
            `api/auth/${userId}/orders/${orderId}`,
            data
        );

        if (result) {
            alert('삭제가 완료되었습니다.');
        }
    }
}

// billingMethod: " ALI Pay"
// createdAt: "2022-05-29T10:48:01.866Z"
// deliveryAddress: { postalCode: '12345', address1: '경기도 수원시 무슨동 어떤길', address2: '1004-104' }
// paymentStatus: "Ok"
// productList: (2)[{… }, {… }]
// updatedAt: "2022-05-29T10:48:01.866Z"
// userId: "6291d6e14cc1920b02fb4ce1"

// const productsContainer = document.querySelector('#productsContainer');






