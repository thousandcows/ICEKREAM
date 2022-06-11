const linkTag = {
    login: '<li><a href="/login" style="color: black">Login</a></li>',
    logout: '<li><a href="/" id="logout" style="color: black">Logout</a></li>',
    register: '<li class="register_btn"><a href="/register" style="color: black">Register</a></li>',
    account: '<li><a href="/account" style="color: black">Manage Account</a></li>',
    admin: '<li><a href="/admin" style="color: black">Edit Page</a></li>',
};

const userNav = {
    all: linkTag.logout + linkTag.account,
    account: linkTag.logout,
    cart: linkTag.logout + linkTag.account,
};

const adminNav = {
    all: linkTag.logout + linkTag.account + linkTag.admin,
    account: linkTag.logout + linkTag.admin,
    cart: linkTag.logout + linkTag.account + linkTag.admin,
    admin: linkTag.login + linkTag.admin,
};

const makeDOM = (page, isLogined, isAdmin) => {
    if (!isLogined) {
        switch (page) {
            case 'login':
                return linkTag.register;
            case 'register':
                return linkTag.login;
            default:
                return linkTag.login + linkTag.register;
        }
    } else if (isAdmin) {
        switch (page) {
            case 'adminPage':
                return adminNav.admin;
            case 'account':
                return adminNav.account;
            case 'cart':
                return adminNav.cart;
            default:
                return adminNav.all;
        }
    } else {
        switch (page) {
            case 'account':
                return userNav.account;
            case 'cart':
                return userNav.cart;
            default:
                return userNav.all;
        }
    }
    // document.querySelector('#logout').addEventListener('click', () => {
    //     sessionStorage.clear();
    // });
};

const insertDOM = (target, dom) => {
    target.insertAdjacentHTML('afterbegin', dom);
};

const drawNavbar = async (page, isLogined, isAdmin) => {
    const navContainer = document.querySelector('#navSelect');
    const navDom = makeDOM(page, isLogined, isAdmin);
    insertDOM(navContainer, navDom);
};

export default drawNavbar;

// 파일 정리
// 각 파일에서 계정 처리하여 drawNavbar 연결할 것
//
// nav_user;
// const pageName = document.querySelector('script.nav_trans').id;
// // 로그인된 유저만 접속 가능한 페이지
// drawNavbar(pageName).then((checkData) => {
//     if (!checkData.isLogined) {
//         alert('로그인이 필요한 페이지 입니다...');
//         window.location.href = '/';
//     }
// });

// nav_admin;
// const pageName = document.querySelector('script.nav_trans').id;
// // 관리자만 접속 가능한 페이지 인증
// drawNavbar(pageName).then((checkData) => {
//     if (!checkData.isLogined || !checkData.isAdmin) {
//         alert('관리자 로그인이 필요한 페이지 입니다...');
//         window.location.href = '/';
//     }
// });

// nav_logout;
// import drawNavbar from './index.js';

// const pageName = document.querySelector('script.nav_trans').id;

// // 로그아웃한 유저

// drawNavbar(pageName);
