import * as Api from '/api.js';
import { patchUserInfo } from '../account/update-info.js';

const userId = sessionStorage.getItem('userId');
const buyerName = document.querySelector('.buyer_name strong');
const buyerEmail = document.querySelector('.buyer_email strong');
const buyerPhone = document.querySelector('.show_buyer_phone strong');
const showAddress = document.querySelector('.input_address');
const searchAddress = document.querySelector('.search_address');
const cancelAddressBtn = document.querySelector('#cancel_address_btn');

const orderList = document.querySelector('#order_list');
const priceSum = document.querySelector('#price_sum strong');

// 배송지를 검색하는 부분 화면 전환

cancelAddressBtn.addEventListener('click', () => {
    showAddress.classList.remove('hide');
    searchAddress.classList.add('hide');
});

// 사용자 정보 불러오기

try {
    const data = await Api.get('/api/auth/', userId);
    console.log(data);
    buyerEmail.textContent = data.email;
    buyerName.textContent = data.fullName;
    buyerPhone.textContent = data.phoneNumber
        ? data.phoneNumber
        : '저장된 번호가 없습니다.';
} catch (error) {
    console.log(error);
}

// 장바구니 내용 불러오기
const cartData = JSON.parse(localStorage.payment);
console.log(cartData);
export const checkedItems1 = [];
export const checkedItems = [];

for (const [key, value] of Object.entries(cartData)) {
    const itemInfo = {
        id: key,
        name: value.productName,
        quantity: value.quantity,
    };
    checkedItems.push(itemInfo);
    checkedItems1.push(value);
}

let paymentPrice = 0;
checkedItems1.forEach((item) => {
    const info = `<div><strong>상품이름: ${item.productName}  /  사이즈: ${item.size}  /  상품가격: ${item.price}  /  주문수량: ${item.quantity}</strong></div>`;
    orderList.insertAdjacentHTML('beforeend', info);
    paymentPrice += item.price * item.quantity;
});

// 전체 상품 값의 합을 화면에 보여줌
priceSum.textContent = `${paymentPrice}`;
