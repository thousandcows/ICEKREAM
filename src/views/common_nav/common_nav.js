/*

  nav에 들어갈 공통적인 부분인데
  login, logout 관련 부분은 실제 로그인 여부에 따라 업데이트 예정

*/



function common_nav() {
  const isLogined = sessionStorage.getItem('token');
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

  return navContent;
}


export { common_nav };



// ${page_name === 'login' || 'account' ? '' : '<li><a href="/login">로그인</a></li>'}
// ${page_name === 'account' ? '<li><button type="button" class="logout">로그아웃</button></li>' : ''}
// ${page_name === 'register' || 'account' ? '' : '<li><a href="/register">회원가입</a></li>'}