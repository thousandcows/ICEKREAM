import * as Api from '/api.js';
// 어떻게 해야지 user 가 접근했을 때 권한이 없으면 바로 redirect 할까...

const users = await Api.get('', 'api/admin/users');
const sectionContainer = document.querySelector('#section-container');
users.forEach((user) => {
    let userAddress = user.address
        ? user.address.postalCode + user.address.address1
        : 'not available';
    let userContent = `<div class="table-column">${user.email}</div>
    <div class="table-column">${user.fullName}</div>
    <div class="table-column">${user.phoneNumber || 'not available'}</div>
    <div class="table-column">${user.role || 'not available'}</div>
    <div class="table-column">${userAddress}</div>`;
    sectionContainer.innerHTML += userContent;
});
