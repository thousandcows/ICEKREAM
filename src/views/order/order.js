import * as Api from '/api.js';
import { navTransition } from '../nav-transition/nav-transition.js';
// import {fetchOrderData} from './update-orderInfo.js';
import {checkedItems} from './update-orderInfo.js';

// fetchOrderData();

navTransition('order').then(checkData => {
    if (!checkData.isLogined) {
        alert('로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }
});

// 현재 등록된 주소를 띄울 경우

// const thisAdressBtn = document.querySelector('#this_select_btn');
// thisAdressBtn.addEventListener('click', () => {
//     const currentAddress = document.querySelector('.current_address strong').textContent;
//     document.querySelector('#sample6_address').value = currentAddress;
// })



// 배송지 검색
// const selectAdress = document.querySelector('#search_btn');

// selectAdress.addEventListener('click', () => {

// })

// 다음 api로 입력된 주소 저장

// const selectAdressBtn = document.querySelector('#select_address_btn');
const addressForm = document.querySelector('#address-form');
const showAddress = document.querySelector('.input_address');
const showAddressBtn = document.querySelector('.input_address button');
const searchAddress = document.querySelector('.search_address');
const addressInput = document.querySelector('.input_address strong');

// 결제 모달창 띄우면서 확인, 취소

const orderBtn = document.querySelector('.orderbox button');
const paymentOverlay = document.querySelector('.payment_modal');
const cancelBtn = document.querySelector('#cancel_btn');



showAddressBtn.addEventListener('click', () => {
    showAddress.classList.add('hide');
    searchAddress.classList.remove('hide');
})

addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
})

// console.log(checkedItems);
const postalInfo = [];
const addressOne = [];
addressForm.addEventListener('formdata', (e) => {
    const formData = e.formData;
    const postalNum = formData.get('postal');
    const address = formData.get('address');
    const detailAddress = formData.get('detail');
    const ref = formData.get('ref');

    
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

})





// 모달창 및 결제정보 보내기

orderBtn.addEventListener('click', async () => {
    paymentOverlay.classList.remove('hide');
    console.log(checkedItems);
    // console.log(postalInfo, addressOne, checkedItems);
    // console.log(typeof postalInfo,typeof addressOne);
    // console.log(postal, address, checkedItems);
    // {postalCode, address1, address2, billingMethod, productList}
    // console.log(typeof postal,typeof address);

    const postal = postalInfo.pop();
    const address = addressOne.pop();
    // console.log(postal, typeof postal);

    // "userId":"{{userId}}",
    // "postalCode":"EA2 35Z",
    // "address1":"경기도 수원시 무슨동 어떤길",
    // "address2":"1004-104",
    // "billingMethod":" ALI Pay",
    // "productList
    // 정보 보내기
    const data = {
        postalCode: '12345',
        address1: "경기도 수원시 무슨동 어떤길",
        billingMethod: 'KAKAOPAY',
        productList: checkedItems,
        // productList: [{id: '62963738ef6fb5c039dc7f08', quantity: 1},{id: "62963731ef6fb5c039dc7ed7", quantity:1}]
    }
    await Api.post('/api/order', data);
    try {
    } catch(err) {
        alert(err);
    }

    // 배열 비우기
    postalInfo.splice(0, postalInfo.length);
    addressOne.splice(0, addressOne.length);
})

cancelBtn.addEventListener('click', () => {
    paymentOverlay.classList.add('hide');
})

