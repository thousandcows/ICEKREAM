import { loginCheck } from "../login-check.js";


/*

  nav가 변하는 부분   =>    로그인  /  회원가입  /  카트
  
  관리자 계정으로 로그인 했을 때 =>  페이지 관리 / 계정 관리 / 로그아웃 / 카트

*/



async function navTransition(pageName) {
  // debugger
  const checkData = await loginCheck();
  // const isAdmin = checkData.isAdmin === 'true' ? true : false;
  // const isLogined = checkData.isLogined ? true : false;
  const isAdmin = checkData.isAdmin
  const isLogined = checkData.isLogined
  console.log( isLogined, isAdmin, checkData);
  const navSelect = document.querySelector('#navSelect');


  if (pageName !== 'login') {
    const content = isLogined ?
      '<li><a href="/" id="logout">로그아웃</a></li>'
      : '<li><a href="/login">로그인</a></li>';
    navSelect.insertAdjacentHTML('afterbegin', content);
  }

  // debugger
  if (pageName === 'register' || isLogined) {
    const registerBtn = document.querySelector('.register_btn');
    registerBtn.parentNode.removeChild(registerBtn);
  }

  if (pageName !== 'account' && isLogined) {
    const account = `<li><a href="/account">계정관리</a></li>`;
    navSelect.insertAdjacentHTML('afterbegin', account);
  }

  if (isAdmin && pageName !== 'adminPage') {
    const addminPage = `<li><a href="/admin">페이지 관리</a></li>`;
    navSelect.insertAdjacentHTML('afterbegin', addminPage);
  }


  // 로그아웃 시 토큰, userId이 삭제되며 홈페이지로 이동
  if (isLogined) {
    document.querySelector('#logout').addEventListener('click', () => {
      sessionStorage.clear();
    })
  }

  return checkData;
}



export { navTransition };




