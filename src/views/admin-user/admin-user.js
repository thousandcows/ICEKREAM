import * as Api from '/api.js';
// 어떻게 해야지 user 가 접근했을 때 권한이 없으면 바로 redirect 할까...

async function handleSwitchRole() {
    const userId = this.id.slice(4);
    const updatedUser = await Api.patch('', `api/admin/${userId}`, {});
    if (this.innerHTML === 'basic-user') {
        this.innerHTML = 'admin';
    } else {
        this.innerHTML = 'basic-user';
    }
    this.classList.toggle('admin');
    this.classList.toggle('basic-user');
}

const users = await Api.get('', 'api/admin/users');
const sectionContainer = document.querySelector('.section-container');
users.forEach((user) => {
    let userAddress = user.address
        ? user.address.postalCode + user.address.address1
        : 'not available';
    let userEmail = user.email.slice(0, -9) + '*********';
    let fullname = '*' + user.fullName.slice(1);
    let userContent = `<div class="table-column">${userEmail}</div>
    <div class="table-column">${fullname}</div>
    <div class="table-column">${user.phoneNumber || 'not available'}</div>
    <div class="table-column"><button class="role-button ${user.role}" id=user${
        user._id
    }>${user.role}</button></div>
    <div class="table-column">${user.registerType}</div>
    <div class="table-column">${userAddress}</div>`;
    sectionContainer.innerHTML += userContent;
});

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', handleSwitchRole);
});
