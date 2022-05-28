import { common_nav } from "../common_nav/common_nav.js";
import * as Api from '/api.js';


common_nav('order');

const orderBtn = document.querySelector('.orderbox button');
const paymentOverlay = document.querySelector('.payment_modal');
const cancelBtn = document.querySelector('#cancel_btn');


orderBtn.addEventListener('click', () => {
    paymentOverlay.classList.remove('hide');
})

cancelBtn.addEventListener('click', () => {
    paymentOverlay.classList.add('hide');
})


// // 결제창 밖을 클릭했을 때 결제창이 없어짐
// paymentOverlay.addEventListener('click', (e) => {
//     const clickTarget = e.target;
//     if(clickTarget.classList.contains('payment_modal')) {
//         paymentOverlay.classList.add('hide');
//     }
// })