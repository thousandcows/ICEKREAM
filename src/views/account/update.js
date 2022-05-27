
import { common_nav } from "../common_nav/common_nav.js";
import * as Api from '/api.js';


common_nav('update');


/*

    페이지가 로드되었을 때 서버에서 데이터를 받아서 화면에 보여줌
    사용자 정보를 수정할 경우 input으로 데이터 받고 post 요청을 보내서 현재 상태 변경
    
*/


fetchUserData();
   
async function fetchUserData() {
    const domList = ['email', 'name', 'password', 'number', 'location']
        .map((e) => {
            return document.querySelector(`#${e}_area td strong`);
        })
    const [email, name, password, number, location] = [...domList];

    // patch api가 정해지면 진행예정
    try {
        // const data = await Api.patch('/api/auth/${userId}', 'userId', {});
        email.textContent = 'data.email';
        name.textContent = 'data.name';
        password.textContent = 'data.password';
        number.textContent = 'data.number';
        location.textContent = 'data.location';

    } catch (error) {
        console.log(error);
    }
}


// 요청 데이터를 data로 전달하고 서버 데이터 patch
async function patchUserData(data) {
    try {
        // const patchData = await Api.patch('/api/auth/${userId}', 'userId', data);
        fetchUserData();
    } catch (error) {
        console.log(error);
    }
}




const showArea = document.querySelectorAll('.show_area button');
const changeArea = document.querySelectorAll('.change_area');
// const withdrawBtn = document.querySelector('.withdraw_area button');

// 정보 변경 클릭 시 인풋 박스가 뜨는 화면 구성
showArea.forEach((element) => {
    element.addEventListener('click', (e) => {
        const trElement = e.target.parentNode.parentNode;
        trElement.classList.add('hide');
        const changeTrElment = trElement.nextElementSibling;
        changeTrElment.classList.remove('hide');
    })
})


// 정보 변경 완료 버튼 클릭시 서버로 post 요청하며 hide 전환
changeArea.forEach((element) => {
    const select = element.getAttribute('id');
    const changeBtn = element.querySelector(`#change_${select}_btn`);
    const cancelBtn = element.querySelector(`#cancel_${select}_btn`);
    const inputEl = element.querySelector('.inputEl');
    console.log(changeBtn);
    // 변경 완료 버튼 클릭시 수정된 데이터가 서버로 전송됨
    changeBtn.addEventListener('click', () => {
        element.classList.add('hide');
        element.previousElementSibling.classList.remove('hide');
        const inputValue = inputEl?.value;
        
        
        // 여기서 patchUserData()를 사용

        // switch (select) {
        //     case 'name':
        //         patchUserData({name: inputValue});
        //         break;
        
        //     case 'password':
                
        //         break;
        
        //     case 'location':
                
        //         break;
        
        //     case 'number':
                
        //         break;
        
        //     case 'email':
                
        //         break;

        //     case 'withdraw':

        //     // 여기서 Api.delete 요청을 해야 함.
        //          break;
        
        //     default:
        //         break;
        // }

        
    })

    cancelBtn.addEventListener('click', () => {
        element.classList.add('hide');
        element.previousElementSibling.classList.remove('hide');
    })
})








