import * as Api from '/api.js';
import { navTransition } from '../nav-transition/nav-transition.js';
// import {fetchOrderData} from './update-orderInfo.js';
import './update-orderInfo.js';

// fetchOrderData();

navTransition('order').then( checkData => {
    if (!checkData.isLogined) {
        alert('로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }
});

// 현재 등록된 주소를 띄울 경우

const thisAdressBtn = document.querySelector('#this_select_btn');
thisAdressBtn.addEventListener('click', () => {
    const currentAddress = document.querySelector('.current_address strong').textContent;
    document.querySelector('#main_address_input').value = currentAddress;
})



// 배송지 검색
const selectAdress = document.querySelector('#search_btn');

selectAdress.addEventListener('click', () => {

})










// 결제 모달창 띄우면서 확인, 취소

const orderBtn = document.querySelector('.orderbox button');
const paymentOverlay = document.querySelector('.payment_modal');
const cancelBtn = document.querySelector('#cancel_btn');


orderBtn.addEventListener('click', () => {
    paymentOverlay.classList.remove('hide');
})

cancelBtn.addEventListener('click', () => {
    paymentOverlay.classList.add('hide');
})

