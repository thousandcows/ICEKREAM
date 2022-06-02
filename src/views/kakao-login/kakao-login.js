const params = new URL(document.location).searchParams;
const token = params.get('token');
const userId = params.get('userId');
const role = params.get('role');

if (token) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('role', role);

    window.location.href = '/';
} else {
    window.location.href = '/login';
}
