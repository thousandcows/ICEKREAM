import { common_nav } from "../common_nav/common_nav.js";

const nav = document.querySelector('.navbar');
const content = common_nav('account');

nav.insertAdjacentHTML('beforeend', content);

// 회원 가입 버튼 삭제
const registerBtn = document.querySelector('.register_btn');
registerBtn.parentNode.removeChild(registerBtn);

// 로그아웃 버튼 클릭 시 토큰이 삭제되며 기본 페이지로 이동
const logoutBtn = document.querySelector('.logout');
logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('token');
  window.location.href = '/';
})