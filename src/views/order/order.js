import * as Api from '/api.js';
// import { navTransition } from '../nav-transition/nav-transition.js';
import {checkedItems} from './update-orderInfo.js';

// debugger


// navTransition('order').then(checkData => {
//     if (!checkData.isLogined) {
//         alert('로그인이 필요한 페이지 입니다...');
//         window.location.href = '/';
//     }
// });





const addressForm = document.querySelector('#address-form');
const showAddress = document.querySelector('.input_address');
const addressInput = document.querySelector('.input_address strong');
const searchAddress = document.querySelector('.search_address');
const searchAddressBtn = document.querySelector('.input_address button');
const selectAdressBtn = document.querySelector('#select_address_btn');
const orderBtn = document.querySelector('#orderBtn');

// const orderBtn = document.querySelector('.orderbox button');
// const cancelBtn = document.querySelector('#cancel_btn');

// const paymentOverlay = document.querySelector('.payment_modal');



// 주소 검색을 해서 배송지 입력하는 부분

searchAddressBtn.addEventListener('click', () => {
    showAddress.classList.add('hide');
    searchAddress.classList.remove('hide');
})

addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
})

const postalInfo = [];
const addressOne = [];
addressForm.addEventListener('formdata', (e) => {
    const formData = e.formData;
    const postalNum = formData.get('postal');
    const address = formData.get('address');
    const detailAddress = formData.get('detail');
    const ref = formData.get('ref');

    // 배열 비우기
    postalInfo.splice(0, postalInfo.length);
    addressOne.splice(0, addressOne.length);
    
    postalInfo.push(postalNum);
    addressOne.push(`${address} ${detailAddress} ${ref}`);

    if (!postalNum || !address) {
        alert('주소 검색을 해주세요.');
    } else if (!detailAddress) {
        alert('상세 주소를 입력해주세요!');
    } else {
        // 검색 내용 배송지로 보여주기
        addressInput.textContent = `(${postalNum})  ${address} ${detailAddress} ${ref} `;
        showAddress.classList.remove('hide');
        searchAddress.classList.add('hide');
    }
    console.log(postalInfo, addressOne);
})



// 주문 결제 버튼 누를 시

orderBtn.addEventListener('click', async () => {
    // paymentOverlay.classList.remove('hide');
 
    console.log(checkedItems);
    
    // 배송지가 입력되었다면 결제하기
    if (addressOne.length === 0) {
        alert('배송지가 입력되지 않았습니다..');
        return;
    }
    const postal = postalInfo[0];
    const address = addressOne[0];

    console.log(checkedItems);
    // "userId":"{{userId}}",
    // "postalCode":"EA2 35Z",
    // "address1":"경기도 수원시 무슨동 어떤길",
    // "address2":"1004-104",
    // "billingMethod":" ALI Pay",
    // "productList
    // 정보 보내기
    const data = {
        postalCode: postal,
        address1: address,
        billingMethod: 'KAKAOPAY',
        productList: checkedItems,
        // productList: [{id: '62963738ef6fb5c039dc7f08', name: 'check', quantity: 1},{id: "62963731ef6fb5c039dc7ed7", name: 'check', quantity:1}]
    }
    try {
        await Api.post('/api/order', data);
        alert('주문이 완료되었습니다.')
        localStorage.clear();
        // 배열 비우기
        postalInfo.splice(0, postalInfo.length);
        addressOne.splice(0, addressOne.length);
        // location.href='orderCompletion.html';
        location.replace("orderCompletion.html")
    } catch(err) {
        alert(err);
    }

})

// cancelBtn.addEventListener('click', () => {
//     paymentOverlay.classList.add('hide');
// })

