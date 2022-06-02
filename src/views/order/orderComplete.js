import { navTransition } from '../nav-transition/nav-transition.js';

navTransition('order').then(checkData => {
    if (!checkData.isLogined) {
        alert('로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }
});

