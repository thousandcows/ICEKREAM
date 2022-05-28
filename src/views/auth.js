import * as Api from '/api.js';


async function loginAuth() {
    const hasTokenCheck = sessionStorage.getItem('token');
    // debugger;
    const authMsg = '로그인 인증';
    if (hasTokenCheck) {
        try {
            // await Api.post('/api/auth/', {authMsg});
            await Api.get('/api/auth/628fa1111ebfd1b6dddd69e8', 'orders');
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