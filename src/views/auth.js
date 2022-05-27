import * as Api from '/api.js';


async function loginAuth() {
    const hasTokenCheck = sessionStorage.getItem('token');
    // debugger;
    const authMsg = '로그인 인증';
    if (hasTokenCheck) {
        try {
            await Api.post('/api/auth', {authMsg});
            return true;
        } catch (error) {
            alert('로그인이 유효하지 않습니다..');
            console.log(error);
            sessionStorage.removeItem('token');
            window.location.href = '/';
        }
    } 
    return false;
}


export { loginAuth };