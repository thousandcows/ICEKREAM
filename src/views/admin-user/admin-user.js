import * as Api from '/api.js';
console.log('hello');
const users = await Api.get('api/admin/users');
console.log(users);
