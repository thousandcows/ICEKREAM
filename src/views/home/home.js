// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';
import { common_nav } from "../common_nav/common_nav.js";



// const navBar = document.querySelector('.navbar');
// const content = common_nav();
// navBar.insertAdjacentHTML('beforeend', content);
console.log('확인');
common_nav('home');
console.log('확인2');

// 로그인 상태일 시 로그인, 회원가입 항목 제거
// 로그아웃 상태일 시 현재 유저 이름 보여줌
// async function loginAuth() {
//   const hasTokenCheck = sessionStorage.getItem('token');
//   if (hasTokenCheck) {
//     try {
//       await Api.post('api/auth');

//       // 회원 가입 버튼 삭제
//       const registerBtn = document.querySelector('.register_btn');
//       registerBtn.parentNode.removeChild(registerBtn);

//       // 계정 관리 요소 추가
//       const navSelect = document.querySelector('#navSelect');
//       const account = `<li><a href="/account">계정관리</a></li>`
//       navSelect.insertAdjacentHTML('afterbegin', account);

//       // 로그아웃 버튼 클릭 시 토큰이 삭제되며 기본 페이지로 이동
//       const logoutBtn = document.querySelector('.logout');
//       logoutBtn.addEventListener('click', () => {
//         sessionStorage.removeItem('token');
//         window.location.href = '/';
//       })

//     } catch (error) {
//       alert(error, '로그인이 유효하지 않습니다..');
//       sessionStorage.removeItem('token');
//       window.location.href = '/';
//     }
//   }
// }

// loginAuth();





// 요소(element), input 혹은 상수
const landingDiv = document.querySelector('#landingDiv');
const greetingDiv = document.querySelector('#greetingDiv');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertTextToLanding();
  insertTextToGreeting();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  landingDiv.addEventListener('click', alertLandingText);
  greetingDiv.addEventListener('click', alertGreetingText);
}

function insertTextToLanding() {
  landingDiv.insertAdjacentHTML(
    'beforeend',
    `
      <h2>n팀 쇼핑몰의 랜딩 페이지입니다. 자바스크립트 파일에서 삽입되었습니다.</h2>
    `,
  );
}

function insertTextToGreeting() {
  greetingDiv.insertAdjacentHTML(
    'beforeend',
    `
      <h1>반갑습니다! 자바스크립트 파일에서 삽입되었습니다.</h1>
    `,
  );
}

function alertLandingText() {
  alert('n팀 쇼핑몰입니다. 안녕하세요.');
}

function alertGreetingText() {
  alert('n팀 쇼핑몰에 오신 것을 환영합니다');
}

async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const data = await Api.get('/api/user/data');
  const random = randomId();

  console.log({ data });
  console.log({ random });
}
