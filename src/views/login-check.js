import * as Api from '/api.js';

async function loginCheck() {
    const hasTokenCheck = sessionStorage.getItem('token');
    const checkRole = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userId');

    // debugger;
    if (hasTokenCheck && checkRole === 'admin') {
        try {
            // 로그인 구분(유저 | 관리자)
            // 역할이 관리자이면 서버에서 관리자 인증

            // 잘못됨 get을 받았을 때 어떤 유저의 아이디인지 판별이 안됨.
            await Api.get(`/api/admin/users/${userId}/orders`);

            return { isLogined: true, isAdmin: true };
        } catch (error) {
            alert('관리자 접속에 실패했습니다.. 다시 로그인 해주세요.');
            console.log(error);
            sessionStorage.clear();
            window.location.href = '/';
        }
    } else if (hasTokenCheck) {
        // 일반 유저가 로그인 한 경우
        try {
            await Api.get('/api/auth');

            return { isLogined: true, isAdmin: false };
        } catch (error) {
            alert('유저 접속에 실패했습니다.. 다시 로그인 해주세요.');
            console.log(error);
            sessionStorage.clear();
            window.location.href = '/';
        }
    } else {
        sessionStorage.clear();
    }

    return { isLogined: false, isAdmin: false };
}

export { loginCheck };
