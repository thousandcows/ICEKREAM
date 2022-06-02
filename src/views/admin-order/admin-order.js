import * as Api from '/api.js';
// 어떻게 해야지 user 가 접근했을 때 권한이 없으면 바로 redirect 할까...

//async event handler - 취소누르면 취소되는 기능
async function handleCancelOrderClick() {
    const isConfirmed = window.confirm(
        '주문을 취소하면 되돌릴 수 없습니다. 정말 취소하겠습니까?',
    );
    if (isConfirmed) {
        const entireRow = document.querySelectorAll(`.${this.id}`); // 현재 orderId의 줄 node들
        const sectionContainer = document.querySelector('#section-container'); // parent node

        entireRow.forEach((el) => {
            sectionContainer.removeChild(el); // grid에서 삭제할 id의 주문 줄을 전부 골라 삭제
        });
        const orderId = this.id.slice(5); //orderId를 다시 그냥 숫자로 변환
        //주문 삭제
        await Api.delete('', `api/admin/orders/${orderId}`); // 잘 작동하는 것 확인;}
        alert('정상적으로 취소되었습니다');
    }
}

//order list 생성
const orders = await Api.get('', 'api/admin/orders');
const sectionContainer = document.querySelector('#section-container');
orders.forEach((order) => {
    let orderDate = order.createdAt.slice(0, 10); //date만 slice
    let deliveryAddress =
        order.deliveryAddress.postalCode + order.deliveryAddress.address1; //주소 변환
    let productListLength = order.productList.length; // 만약에 딱 한개의 상품 종류만 구입했다면,
    let productList = '';
    if (productListLength === 1) {
        productList = `상품 ID: ${order.productList[0].id} ${order.productList[0].quantity}개`; // 1개 정보
    } else {
        let remainder = productListLength - 1;
        productList = `상품 ID: ${order.productList[0].id} ${order.productList[0].quantity}개 외 ${remainder}개의 상품`; //1개 정보 + 몇개 더 있나
    }

    let paymentStatus = order.paymentStatus; // 기타 정보들
    let billingMethod = order.billingMethod;
    // table에는 들어가지 않지만, class와 id 값으로 사용함.
    let orderId = order._id;

    let orderContent = `<div class="table-column order${orderId}">${orderDate}</div>
    <div class="table-column order${orderId}">${deliveryAddress}</div>
    <div class="table-column order${orderId}">${productList}</div>
    <div class="table-column order${orderId}">${paymentStatus}</div>
    <div class="table-column order${orderId}">${billingMethod}</div>
    <div class="table-column order${orderId}">
                    <button id=order${orderId} >Cancel Order</button>
                </div>
    `;

    sectionContainer.innerHTML += orderContent; // grid에 붙이기.
});

const buttons = document.querySelectorAll('button'); //전부 작성이 끝난 후 모든 버튼 선택

buttons.forEach((button) => {
    // 모든 버튼에 event handler 부착.
    button.addEventListener('click', handleCancelOrderClick);
});
