import { fetchUserData } from "./form-handler.js";

/*

    페이지가 로드되었을 때 서버에서 데이터를 받아서 화면에 보여줌
    
*/

fetchUserData();

const showArea = document.querySelectorAll('.show_area button');
const changeArea = document.querySelectorAll('.change_area');


// 정보 변경 클릭 시 인풋 박스가 뜨는 화면 구성
showArea.forEach((element) => {
    element.addEventListener('click', (e) => {
        const trElement = e.target.parentNode.parentNode;
        trElement.classList.add('hide');
        const changeTrElment = trElement.nextElementSibling;
        changeTrElment.classList.remove('hide');
    })
})


// 정보 변경 완료 버튼 클릭 시 데이터 fetch, 취소 클릭시 원래 화면
changeArea.forEach((element) => {
    const select = element.getAttribute('id');
    const cancelBtn = element.querySelector(`#cancel_${select}_btn`);

    cancelBtn.addEventListener('click', () => {
        element.classList.add('hide');
        element.previousElementSibling.classList.remove('hide');
    })
})









