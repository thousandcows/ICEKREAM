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
            // const { userId } = await Api.get('/api/auth');
            // await Api.patch('api/admin', `${userId}`, { });
            await Api.get(`/api/admin/users/${userId}/orders`);
            // const updatedUser = await Api.patch('', `api/admin/${userId}`, {});

            // 이 부분 수정해야함  => 로그인 시 최초만 userId 저장..

            // sessionStorage.setItem('userId', userId);



            // const adminCheck = sessionStorage.getItem('admin');
            // console.log(userId);
            // if (sessionStorage.getItem('userId') === null) {
            //     sessionStorage.setItem('userId', userId);
            // }

            return { isLogined: true, isAdmin: true };
        } catch (error) {
            // alert('로그인 인증에 실패했습니다..다시 로그인 해주세요.');
            alert('관리자 접속에 실패했습니다.. 다시 로그인 해주세요.');
            console.log(error);
            sessionStorage.clear();
            window.location.href = '/';
        }
    } else if (hasTokenCheck) {
        // 일반 유저가 로그인 한 경우
        try {
            // const { userId } = await Api.get('/api/auth');
            await Api.get('/api/auth');
            // sessionStorage.setItem('userId', userId);

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

    // else {
    //     alert('로그인을 해주세요..');
    //     console.log(error);
    //     sessionStorage.removeItem('token');
    //     window.location.href = '/';
    //     return { isLogined: false, isAdmin: false };
    // }

    return { isLogined: false, isAdmin: false };

}



// async function loginRequiredPage() {
//     const hasTokenCheck = sessionStorage.getItem('token');
//     // debugger;
//     if (hasTokenCheck) {
//         try {
//             // await Api.post('/api/auth/', {authMsg});
//             await Api.get('/api/auth');
//             return true;
//         } catch (error) {
//             alert('유효한 계정이 아닙니다...');
//             console.log(error);
//             sessionStorage.removeItem('token');
//             window.location.href = '/';
//         }
//     } else {
//         alert('로그인이 필요한 페이지 입니다...');
//         window.location.href = '/';
//     }
//     return false;
// }


export { loginCheck };