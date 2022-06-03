import * as Api from '/api.js';


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


export {patchUserInfo};