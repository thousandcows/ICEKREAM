import { loginCheck } from "../login-check.js";


/*

  nav가 변하는 부분   =>    로그인  /  회원가입  /  카트

*/



async function navTransition(pageName) {

  const isLogined = await loginCheck();

  // 인증이 필요한 페이지 : 계정관리, 주문 결제, 주문 조회 등, 추후에 추가 가능
  // if (!isLogined && (pageName === 'account' || 'order')) {
  //   alert('로그인이 필요한 페이지 입니다...');
  //   window.location.href = '/';
  // }

  // console.log(isLogined);
  const navSelect = document.querySelector('#navSelect');

  if (pageName !== 'login') {
    const content = isLogined ?
      '<li><a href="/" id="logout">로그아웃</a></li>'
      : '<li><a href="/login">로그인</a></li>';
    navSelect.insertAdjacentHTML('afterbegin', content);
  }


  if (pageName === 'register' || isLogined) {
    const registerBtn = document.querySelector('.register_btn');
    registerBtn.parentNode.removeChild(registerBtn);
  }

  if (pageName !== 'account' && isLogined) {
    const navSelect = document.querySelector('#navSelect');
    const account = `<li><a href="/account">계정관리</a></li>`;
    navSelect.insertAdjacentHTML('afterbegin', account);
  }


  // 로그아웃 시 토큰, userId이 삭제되며 홈페이지로 이동
  if (isLogined) {
    document.querySelector('#logout').addEventListener('click', () => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
    })
  }

  return isLogined;
}



export { navTransition };




