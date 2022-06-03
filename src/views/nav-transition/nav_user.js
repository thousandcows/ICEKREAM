
import { navTransition } from './nav-transition.js';


const pageName = document.querySelector('script.nav_trans').id;
// console.log(test, test.id);

// 로그인된 유저만 접속 가능한 페이지

navTransition(pageName).then( checkData => {
    if (!checkData.isLogined) {
        alert('로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }
})