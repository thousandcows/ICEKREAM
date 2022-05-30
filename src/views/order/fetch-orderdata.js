import * as Api from '/api.js';


async function fetchOrderData() {
    const userId = sessionStorage.getItem('userId');
    const buyerName = document.querySelector('.buyer_name strong');
    const buyerEmail = document.querySelector('.buyer_email strong');
    const buyerPhone = document.querySelector('.buyer_phone strong');

    try {
        const data = await Api.get('/api/auth/', userId);
        console.log(data);
        buyerEmail.textContent = data.email;
        buyerName.textContent = data.fullName;
        buyerPhone.textContent = data.phoneNumber ? data.phoneNumber : '저장된 번호가 없습니다.' ;
        // location.textContent = data.location;

    } catch (error) {
        console.log(error);
    }
} 

// async function fetchOrderData() {

//     try {
//         const data = await Api.get('/api/auth/', userId);
//         console.log(data);
//         buyerEmail.textContent = data.email;
//         buyerName.textContent = data.fullName;
//         buyerPhone.textContent = data.phoneNumber ? data.phoneNumber : '저장된 번호가 없습니다.' ;
//         // location.textContent = data.location;

//     } catch (error) {
//         console.log(error);
//     }
// }



export {fetchOrderData};