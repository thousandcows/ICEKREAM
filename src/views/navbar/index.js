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

// ?????? ??????
// ??? ???????????? ?????? ???????????? drawNavbar ????????? ???
//
// nav_user;
// const pageName = document.querySelector('script.nav_trans').id;
// // ???????????? ????????? ?????? ????????? ?????????
// drawNavbar(pageName).then((checkData) => {
//     if (!checkData.isLogined) {
//         alert('???????????? ????????? ????????? ?????????...');
//         window.location.href = '/';
//     }
// });

// nav_admin;
// const pageName = document.querySelector('script.nav_trans').id;
// // ???????????? ?????? ????????? ????????? ??????
// drawNavbar(pageName).then((checkData) => {
//     if (!checkData.isLogined || !checkData.isAdmin) {
//         alert('????????? ???????????? ????????? ????????? ?????????...');
//         window.location.href = '/';
//     }
// });

// nav_logout;
// import drawNavbar from './index.js';

// const pageName = document.querySelector('script.nav_trans').id;

// // ??????????????? ??????

// drawNavbar(pageName);
