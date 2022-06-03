import { loginCheck } from '../login-check.js';

/*

  nav가 변하는 부분   =>    로그인  /  회원가입  /  카트
  
  관리자 계정으로 로그인 했을 때 =>  페이지 관리 / 계정 관리 / 로그아웃 / 카트

*/

async function navTransition(pageName) {
    // debugger
    const checkData = await loginCheck();
    console.log('확인');
    // const isAdmin = checkData.isAdmin === 'true' ? true : false;
    // const isLogined = checkData.isLogined ? true : false;
    const isAdmin = checkData.isAdmin;
    const isLogined = checkData.isLogined;
    const navSelect = document.querySelector('#navSelect');

    const loginTag =
        '<li><a href="/login" style="color: black">Login</a></li>';
    const logOutTag =
        '<li><a href="/" id="logout" style="color: black">Logout</a></li>';
    const registerTag =
        '<li class="register_btn"><a href="/register" style="color: black">Register</a></li>';
    const accountManageTag =
        '<li><a href="/account" style="color: black">Manage Account</a></li>';
    const adminPageTag =
        '<li><a href="/admin" style="color: black">Edit Page</a></li>';
    // const cartTag = `<li>
    //                   <a href="/cart" aria-current="page">
    //                     <span class="icon">
    //                       <i class="fas fa-cart-shopping"></i>
    //                     </span>
    //                     <div id="cart-count">0</div>
    //                   </a>
    //                 </li>`;

    if (isLogined && isAdmin) {
        // logOutTag
        // adminPageTag
        // accountManageTag
        // cartTag
        if (pageName === 'adminPage') {
            const navContent = logOutTag + accountManageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else if (pageName === 'account') {
            const navContent = logOutTag + adminPageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else if (pageName === 'cart') {
            const navContent = logOutTag + adminPageTag + accountManageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else {
            const navContent = logOutTag + adminPageTag + accountManageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        }
    } else if (isLogined && !isAdmin) {
        // logOutTag
        // accountManageTag
        // cartTag
        if (pageName === 'account') {
            const navContent = logOutTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else if (pageName === 'cart') {
            const navContent = logOutTag + accountManageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else {
            const navContent = logOutTag + accountManageTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        }
    } else {
        // loginTag
        // registerTag
        // cartTag
        if (pageName === 'login') {
            const navContent = registerTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else if (pageName === 'register') {
            const navContent = loginTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else if (pageName === 'cart') {
            const navContent = loginTag + registerTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        } else {
            const navContent = loginTag + registerTag;
            navSelect.insertAdjacentHTML('afterbegin', navContent);
        }
    }

    // if (pageName !== 'login') {
    //   const content = isLogined ?
    //     '<li><a href="/" id="logout">로그아웃</a></li>'
    //     : '<li><a href="/login">로그인</a></li>';
    //   navSelect.insertAdjacentHTML('afterbegin', content);
    // }

    // // debugger
    // if (pageName === 'register' || isLogined) {
    //   const registerBtn = document.querySelector('.register_btn');
    //   registerBtn.parentNode.removeChild(registerBtn);
    // }

    // if (pageName !== 'account' && isLogined) {
    //   const account = `<li><a href="/account">계정관리</a></li>`;
    //   navSelect.insertAdjacentHTML('afterbegin', account);
    // }

    // if (isAdmin && pageName !== 'adminPage') {
    //   const addminPage = `<li><a href="/admin">페이지 관리</a></li>`;
    //   navSelect.insertAdjacentHTML('afterbegin', addminPage);
    // }

    // 로그아웃 시 토큰, userId이 삭제되며 홈페이지로 이동
    if (isLogined) {
        document.querySelector('#logout').addEventListener('click', () => {
            sessionStorage.clear();
        });
    }

    return checkData;
}

export { navTransition };
