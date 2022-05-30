import * as Api from '/api.js';


// 정보 변경하는 버튼을 클릭했을 시 비밀번호 입력 창이 아래에 뜸
document.querySelector('.password_check').classList.remove('hide');
const passwordCheckInput = document.querySelector('#password_check_input');

function getPasswordCheckValue() {
   return passwordCheckInput.value;
}

async function deleteUser() {
    const passwordInput = document.querySelector('.check_password').value;
    const userId = sessionStorage.getItem('userId');
    // debugger
    // console.log(userId, sessionStorage);

    // patch 경로 설정
    // passwordForm.action = `/api/auth/${userId}`;

    // Api.patch(`/api/auth`, userId, )
    const data = { currentPassword: passwordInput };
    try {
        await Api.delete(`/api/auth`, userId, data);
        // alert(result);
        alert('정상 처리되었습니다.');
        sessionStorage.clear();
        window.location.href = '/';
    } catch (error) {
        console.error(error.stack);
        alert(`${error.message}`);
        // return false;
    }

    return false;
}

async function patchEmail() {
    const emailInput = document.querySelector('.email_input').value;
    const passwordInput = getPasswordCheckValue();
    const userId = sessionStorage.getItem('userId');

    const data = { 
        email: emailInput,
        currentPassword: passwordInput
     };
    try {
        await Api.patch(`/api/auth`, userId, data);
        // alert(result);
        alert('정상 처리되었습니다.');
        // fetchUserData();       
        window.location.reload();
    } catch (error) {
        console.error(error.stack);
        alert(`${error.message}`);
        // return false;
    }

    return false;
}

async function patchName() {

}

async function patchPassword() {

}

async function patchLocation() {

}

async function patchNumber() {

}



function patchUserData(patchTitle) {

    switch (patchTitle) {
        case 'email':
            patchEmail();
            break;

        case 'name':
            patchName();
            break;

        case 'password':
            patchPassword();
            break;

        case 'location':
            patchLocation();
            break;

        case 'number':
            patchNumber();
            break;

        case 'withdraw':
            deleteUser();
            break;

        default:
            break;
    }
    // fetchUserData();







}


async function fetchUserData() {
    const domList = ['email', 'name', 'password', 'number', 'location']
        .map((e) => {
            return document.querySelector(`#${e}_area td strong`);
        })
    const [email, name, password, number, location] = [...domList];
    const userId = sessionStorage.getItem('userId');

    // patch api가 정해지면 진행예정
    try {
        const data = await Api.get('/api/auth/', userId);
        console.log(data);
        email.textContent = data.email;
        name.textContent = data.fullName;
        password.textContent = '변경하시려면 클릭하세요';
        number.textContent = data.phoneNumber ? data.phoneNumber : '저장된 번호가 없습니다.' ;
        // location.textContent = data.location;

    } catch (error) {
        console.log(error);
    }
}




export { patchUserData, fetchUserData };