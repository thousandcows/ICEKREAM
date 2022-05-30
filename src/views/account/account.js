import { navTransition } from '../navTransition/navTransition.js';

navTransition('account').then( isLogined => {
    if (!isLogined) {
        alert('로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }
});


