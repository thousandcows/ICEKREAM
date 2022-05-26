
import { common_nav } from "../common_nav/common_nav.js";
import * as Api from '/api.js';


const nav = document.querySelector('.navbar');
const content = common_nav('account');

nav.insertAdjacentHTML('beforeend', content);

const emailBtn = document.querySelector('#email_area button');
const nameBtn = document.querySelector('#name_area button');
const passwordBtn = document.querySelector('#password_area button');
const locationBtn = document.querySelector('#location_area button');
const numberBtn = document.querySelector('#number_area button');


/*

    사용자 정보를 수정할 경우 input으로 데이터 받고 post 요청을 보내서 현재 상태 변경

*/


// 페이지가 로드되었을 때 서버에서 데이터를 받아서 화면에 보여줌



// 백엔드에서 정보를 받아와야 함( user-router 폴더에서 만들어줘야 함)
async function getUserInfo() {
    // 현재 로그인 된 유저 이름를 저장함.
    // const userId;
    try {
        const data = await Api.get('/api/user~~', `:${userId}`);
        // 이메일, 이름 영역 등에 정보가 기입됨
        
    } catch (error) {
        throw new Error(error);
    }
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


// 변경 버튼을 클릭했을 때 변경 요소가 보임
emailBtn.addEventListener('click',(e) => {
    document.querySelector('#email_area').classList.add('hide');
    document.querySelector('#change_email_area').classList.remove('hide');
})

nameBtn.addEventListener('click',(e) => {
    document.querySelector('#name_area').classList.add('hide');
    document.querySelector('#change_name_area').classList.remove('hide');
})

passwordBtn.addEventListener('click',(e) => {
    document.querySelector('#password_area').classList.add('hide');
    document.querySelector('#change_password_area').classList.remove('hide');
})


numberBtn.addEventListener('click',(e) => {
    document.querySelector('#number_area').classList.add('hide');
    document.querySelector('#change_number_area').classList.remove('hide');
})

// 배송지 수정하는 인풋박스를 보여줌
locationBtn.addEventListener('click',(e) => {
    document.querySelector('#location_area').classList.add('hide');
    document.querySelector('#change_location_area').classList.remove('hide');
})



