import * as Api from '/api.js';


async function loginCheck() {
    const hasTokenCheck = sessionStorage.getItem('token');
    // debugger;
    if (hasTokenCheck) {
        try {
            // 로그인 상태
            const {userId} = await Api.get('/api/auth');
            sessionStorage.setItem('userId', userId);

            // console.log(userId);
            // if (sessionStorage.getItem('userId') === null) {
            //     sessionStorage.setItem('userId', userId);
            // }

            return true;
        } catch (error) {
            alert('로그인 인증에 실패했습니다..다시 로그인 해주세요.');
            console.log(error);
            sessionStorage.removeItem('token');
            window.location.href = '/';
        }
    } 
    return false;
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