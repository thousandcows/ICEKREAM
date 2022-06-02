import * as Api from '/api.js';
import { patchUserInfo } from '../account/update-info.js';


const userId = sessionStorage.getItem('userId');
const buyerName = document.querySelector('.buyer_name strong');
const buyerEmail = document.querySelector('.buyer_email strong');
const buyerPhone = document.querySelector('.show_buyer_phone strong');
const showBuyerPhone = document.querySelector('.show_buyer_phone');
const phoneNumberForm = document.querySelector('#phone-number-form');
const changePhone = document.querySelector('#change_phone');
const cancelNumberBtn = document.querySelector('#cancel_number_btn');
const cancelAddressBtn = document.querySelector('#cancel_address_btn');

// const deliveryAddress = document.querySelector('.input_address strong');

const orderList = document.querySelector('#order_list');
const priceSum = document.querySelector('#price_sum');


// 번호 변경 클릭했을 때 전환
changePhone.addEventListener('click', () => {
    showBuyerPhone.classList.add('hide');
    phoneNumberForm.classList.remove('hide');
})

cancelNumberBtn.addEventListener('click', () => {
    showBuyerPhone.classList.remove('hide');
    phoneNumberForm.classList.add('hide');
})

cancelAddressBtn.addEventListener('click', () => {
    showBuyerPhone.classList.remove('hide');
    phoneNumberForm.classList.add('hide');
})



try {
    const data = await Api.get('/api/auth/', userId);
    console.log(data);
    buyerEmail.textContent = data.email;
    buyerName.textContent = data.fullName;
    buyerPhone.textContent = data.phoneNumber ? data.phoneNumber : '저장된 번호가 없습니다.';

} catch (error) {
    console.log(error);
}


// 장바구니 내용 불러오기
const cartData = JSON.parse(localStorage.cart);
console.log(cartData);
export const checkedItems1 = [];
export const checkedItems = [];


for (const [key, value] of Object.entries(cartData)) {
    const itemInfo = {"id": key, "name": value.productName, "quantity": value.quantity};
    checkedItems.push(itemInfo);
    checkedItems1.push(value);
}

let paymentPrice = 0;
checkedItems1.forEach((item) => {
    const info = `<div><strong>상품이름: ${item.productName}  /  사이즈: ${item.size}  /  상품가격: ${item.price}  /  주문수량: ${item.quantity}</strong></div>`;
    orderList.insertAdjacentHTML('beforeend', info);
    paymentPrice += item.price * item.quantity;
})

// 전체 상품 값의 합을 화면에 보여줌
priceSum.textContent = `${paymentPrice}`;



// 주문 / 결제 창에서 전화번호를 patch 할 수 있는 부분


phoneNumberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
})

phoneNumberForm.addEventListener('formdata', async (e) => {
    const formData = e.formData;
    const numberInput = formData.get('numberInput');
    const passwordInput = formData.get('passwordCheck');

    const data = {
        phoneNumber: numberInput,
        currentPassword: passwordInput,
    };

    const resetInput = await patchUserInfo(passwordInput, data);
    if (!resetInput) {
        e.target.reset();
    }
})





// export { fetchOrderData };