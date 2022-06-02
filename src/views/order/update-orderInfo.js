import * as Api from '/api.js';
import { patchUserInfo } from '../account/update-info.js';

// async function fetchOrderData() {
// }

const userId = sessionStorage.getItem('userId');
const buyerName = document.querySelector('.buyer_name strong');
const buyerEmail = document.querySelector('.buyer_email strong');
const buyerPhone = document.querySelector('.buyer_phone strong');
const buyerAddress = document.querySelector('.current_address strong');

// const priceSum = document.querySelector('#total_th');
const priceSum = document.querySelector('#payment_tr td strong');
const payOption = document.querySelector('#payment-option-select');

try {
    const data = await Api.get('/api/auth/', userId);
    console.log(data);
    buyerAddress.textContent = data?.address?.address1;
    buyerEmail.textContent = data.email;
    buyerName.textContent = data.fullName;
    buyerPhone.textContent = data.phoneNumber ? data.phoneNumber : '저장된 번호가 없습니다.';

    // 상품 주문 정보 불러오기, 장바구니에서 불러오는 경우 와 상품 자체의 정보를 불러오는 경우
    // 각각의 상품에 대한 가격을 합치고 화면에 보여줌

    // const orderData = await Api.get('/api/auth/', `${userId}/orders`);
    // const orderList = sessionStorage.getItem('장바구니 상품정보 리스트');
    // const productData = await Api.get('/api/products/cart', `?id="${}"&id="${}"&id="${}"`);
    // const orderPriceSum = productData.reduce((prevProduct, curProduct) => {
    //     return { price: prevProduct.price + curProduct.price }
    // }
    // , { price: 0 });


    // 전체 상품 값의 합을 화면에 보여줌
    // priceSum.textContent = `${orderPriceSum.price}`;


} catch (error) {
    console.log(error);
}




// 주문 / 결제 창에서 전화번호를 patch 할 수 있는 부분


const phoneNumberForm = document.querySelector('#phone-number-form');

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