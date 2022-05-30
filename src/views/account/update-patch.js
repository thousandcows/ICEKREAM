import * as Api from '/api.js';


// async function deleteUser() {
//     const passwordInput = document.querySelector('.check_password').value;
//     const userId = sessionStorage.getItem('userId');
//     const data = { currentPassword: passwordInput };
//     try {
//         await Api.delete(`/api/auth`, userId, data);
//         alert('정상 처리되었습니다.');
//         sessionStorage.clear();
//         window.location.href = '/';
//     } catch (error) {
//         console.error(error.stack);
//         alert(`${error.message}`);
//     }

//     return false;
// }


// async function patchName() {
//     const nameInput = document.querySelector('.name_input').value;
//     const passwordInput = getPasswordCheckValue();
//     const userId = sessionStorage.getItem('userId');

//     if (!passwordInput) {
//         alert('비밀번호가 입력되지 않았습니다.');
//         return false;
//     }

//     const data = {
//         fullName: nameInput,
//         currentPassword: passwordInput
//     };
//     try {
//         await Api.patch(`/api/auth`, userId, data);
//         alert('정상 처리되었습니다.');
//         window.location.reload();
//     } catch (error) {
//         console.error(error.stack);
//         alert(`${error.message}`);
//     }

//     return false;
// }

// async function patchPassword() {
//     const passwordInput = document.querySelectorAll('#password_form .input_el');
//     const currentPassword = passwordInput[0].value;
//     const newPassword = passwordInput[1].value;
//     const checkPassword = passwordInput[2].value;

//     if (newPassword !== checkPassword) {
//         alert('새로 입력하신 패스워드가 다릅니다. 다시입력하세요!');
//         return false;
//     }

//     const userId = sessionStorage.getItem('userId');

//     const data = {
//         password: newPassword,
//         currentPassword: currentPassword
//     };

//     try {
//         await Api.patch(`/api/auth`, userId, data);
//         alert('정상 처리되었습니다.');
//         window.location.reload();
//     } catch (error) {
//         console.error(error.stack);
//         alert(`${error.message}`);
//     }

//     return false;
// }

// async function patchAdress() {
//     const addressInput = document.querySelector('.address_input').value;
//     const postalInput = document.querySelector('.postal_input').value;
//     const passwordInput = getPasswordCheckValue();
//     const userId = sessionStorage.getItem('userId');

//     console.log(passwordInput);
//     if (!passwordInput) {
//         alert('비밀번호가 입력되지 않았습니다.');
//         return false;
//     }

//     const data = {
//         address: {
//             postalCode: postalInput,
//             address1: addressInput,

//         },
//         currentPassword: passwordInput
//     };
//     try {
//         await Api.patch(`/api/auth`, userId, data);
//         alert('정상 처리되었습니다.');
//         window.location.reload();
//     } catch (error) {
//         console.error(error.stack);
//         alert(`${error.message}`);
//     }

//     return false;
// }

// async function patchNumber() {
//     const numberInput = document.querySelector('.number_input').value;
//     const passwordInput = getPasswordCheckValue();
//     const userId = sessionStorage.getItem('userId');

//     const data = {
//         phoneNumber: numberInput,
//         currentPassword: passwordInput
//     };

//     try {
//         await Api.patch(`/api/auth`, userId, data);
//         alert('정상 처리되었습니다.');
//         window.location.reload();
//     } catch (error) {
//         console.error(error.stack);
//         alert(`${error.message}`);
//     }

//     return false;
// }


async function patchUserInfo(password, data, userDelete = false) {
    const userId = sessionStorage.getItem('userId');

    if (!password) {
        alert('비밀번호가 입력되지 않았습니다.');
        return false;
    }

    try {
        if (!userDelete) {
            await Api.patch(`/api/auth`, userId, data);
            alert('정상 처리되었습니다.');
            window.location.reload();
        } else {
            await Api.delete(`/api/auth`, userId, data);
            alert('정상 처리되었습니다.');
            sessionStorage.clear();
            window.location.href = '/';
        }
        return true;
    } catch (error) {
        console.error(error.stack);
        alert(`${error.message}`);
        return false;
    }
}


const nameForm = document.querySelector('#name_form');
const passwordForm = document.querySelector('#password_form');
const addressForm = document.querySelector('#address_form');
const numberForm = document.querySelector('#number_form');
const withdrawForm = document.querySelector('#withdraw_form');


nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
})

nameForm.addEventListener('formdata', async (e) => {

    const formData = e.formData;
    const nameInput = formData.get('nameInput');
    const passwordInput = formData.get('passwordCheck');


    const data = {
        fullName: nameInput,
        currentPassword: passwordInput
    };

    const resetInput = await patchUserInfo(passwordInput, data);

    if (!resetInput) {
        e.target.reset();
    }

})

passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(e, 'ghkrdls');
    new FormData(e.target);
})

passwordForm.addEventListener('formdata', async (e) => {
    const formData = e.formData;

    const currentPassword = formData.get('currentPwd');
    const newPassword = formData.get('newPwd');
    const checkPassword = formData.get('checkNewPwd');

    if (newPassword !== checkPassword) {
        alert('새로 입력하신 패스워드가 다릅니다. 다시입력하세요!');
        return false;
    }


    const data = {
        password: newPassword,
        currentPassword: currentPassword
    };

    const resetInput = await patchUserInfo(currentPassword, data);

    if (!resetInput) {
        e.target.reset();
    }

})

addressForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
})

addressForm.addEventListener('formdata', async (e) => {
    const formData = e.formData;
    const addressInput = formData.get('address');
    const postalInput = formData.get('post');
    const passwordInput = formData.get('passwordCheck');

    const data = {
        address: {
            postalCode: postalInput,
            address1: addressInput,

        },
        currentPassword: passwordInput
    };

    const resetInput = await patchUserInfo(passwordInput, data);
    if (!resetInput) {
        e.target.reset();
    }

})

numberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
})

numberForm.addEventListener('formdata', async (e) => {
    const formData = e.formData;
    const numberInput = formData.get('number');
    const passwordInput = formData.get('passwordCheck');

    const data = {
        phoneNumber: numberInput,
        currentPassword: passwordInput
    };

    const resetInput = await patchUserInfo(passwordInput, data);
    if (!resetInput) {
        e.target.reset();
    }

})

withdrawForm.addEventListener('submit', (e) => {
    e.preventDefault();
    new FormData(e.target);
})

withdrawForm.addEventListener('formdata', async (e) => {
    const formData = e.formData;
    const passwordInput = formData.get('passwordCheck');
    const data = { currentPassword: passwordInput };

    const resetInput = await patchUserInfo(passwordInput, data, true);
    if (!resetInput) {
        e.target.reset();
    }
})




async function fetchUserData() {
    const domList = ['email', 'name', 'password', 'number', 'address']
        .map((e) => {
            return document.querySelector(`#${e}_area td strong`);
        })
    const [email, name, password, number, address] = [...domList];
    const userId = sessionStorage.getItem('userId');

    try {
        const data = await Api.get('/api/auth/', userId);
        console.log(data);
        email.textContent = data.email;
        name.textContent = data.fullName;
        password.textContent = '변경하시려면 클릭하세요';
        number.textContent = data.phoneNumber ? data.phoneNumber : '저장된 번호가 없습니다.';
        address.textContent = data.address;

    } catch (error) {
        console.log(error);
    }
}




export { fetchUserData };