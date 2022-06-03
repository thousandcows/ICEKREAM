import { navTransition } from '../nav-transition/nav-transition.js';

const test = document.querySelector('script.nav_trans');
console.log(test, test.id);

// 관리자만 접속 가능한 페이지 인증

navTransition('adminPage').then( checkData => {
    if (!checkData.isLogined || !checkData.isAdmin) {
        alert('관리자 로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }
})