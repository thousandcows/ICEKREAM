

import { navTransition } from './nav-transition.js';

navTransition('adminPage').then( checkData => {
    if (!checkData.isLogined || !checkData.isAdmin) {
        alert('관리자 로그인이 필요한 페이지 입니다...');
        window.location.href = '/';
    }
});

