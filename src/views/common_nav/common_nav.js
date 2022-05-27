import { loginAuth } from "../auth.js";


/*

  nav에 들어갈 공통적인 부분인데
  login, logout 관련 부분은 실제 로그인 여부에 따라 업데이트 예정

*/


async function common_nav(pageName) {
  // const isLogined = sessionStorage.getItem('token');
  const isLogined = await loginAuth();
  const navBar = document.querySelector('.navbar');
  // debugger;
  const navContent = `<div class="container mt-3">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="/elice-rabbit.png" width="30" height="30" />
          <span class="has-text-link">쇼핑-n팀</span>
        </a>
  
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
  
      <div class="navbar-end breadcrumb my-auto" aria-label="breadcrumbs">
        <ul id="navSelect">
          ${!isLogined ? '<li><a href="/login">로그인</a></li>' : '<li><button type="button" class="logout">로그아웃</button></li>'}
          <li class="register_btn"><a href="/register">회원가입</a></li>
          <li>
            <a href="#cart" aria-current="page">
              <span class="icon">
                <i class="fas fa-cart-shopping"></i>
              </span>
              <span>카트</span>
            </a>
          </li>
        </ul>
      </div>
    </div>`;

  navBar.insertAdjacentHTML('beforeend', navContent);

  if (isLogined) {
    if (pageName === 'home') {
      // 계정 관리 요소 추가
      const navSelect = document.querySelector('#navSelect');
      const account = `<li><a href="/account">계정관리</a></li>`
      navSelect.insertAdjacentHTML('afterbegin', account);
    }

    // 회원 가입 버튼 삭제
    const registerBtn = document.querySelector('.register_btn');
    registerBtn.parentNode.removeChild(registerBtn);
  
    // 로그아웃 버튼 클릭 시 토큰이 삭제되며 기본 페이지로 이동
    const logoutBtn = document.querySelector('.logout');
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('token');
        window.location.href = '/';
    })
  }

}



export { common_nav };



// ${!isLogined ? '<li><a href="/login">로그인</a></li>' : '<li><button type="button" class="logout">로그아웃</button></li>'}

