import * as Api from '/api.js';

const submitBtn = document.querySelector('#submitButton');
const categoryBox = document.querySelector('#categorySelectBox');
const nameInput = document.querySelector('#nameInput');
const brandInput = document.querySelector('#manufacturerInput');
const launchDateInput = document.querySelector('#launchDateInput');
const sizeInput = document.querySelector('#sizeInput');
const inventoryInput = document.querySelector('#inventoryInput');
const priceInput = document.querySelector('#priceInput');

addAllElements();
addAllEvents();

async function addAllElements() {}

function addAllEvents() {
    getAllCatagories();

    categoryBox.addEventListener('change', getSizeOfCategory);

    submitBtn.addEventListener('click', handleSubmit);
}

// 1. 전체 카테고리 정보 조회 => 카테고리 토글에 추가
async function getAllCatagories() {
    try {
        const categoryList = await Api.get('/api/admin/product/category', '');

        for (let i = 0; i < categoryList.length; i++) {
            const name = categoryList[i].name;
            categoryBox.innerHTML += `<option value ="">${name}</option>`;
        }
    } catch (err) {
        console.error(err.stack);
        alert(`${err.message}`);
    }
}

// 2. 카테고리 이름을 선택했을 때 사이즈 정보를 불러오는 함수
async function getSizeOfCategory() {
    const categoryName = categoryBox.options[categoryBox.selectedIndex].text;

    const categoryInfo = await Api.get(
        '/api/admin/product/category/size/' + categoryName,
    );

    sizeInput.value = categoryInfo.size;
}

// 3. 새로운 상품 등록
async function handleSubmit(e) {
    e.preventDefault();

    const check = confirm('상품을 등록하시겠습니까?');

    if (check) {
        try {
            const category =
                categoryBox.options[categoryBox.selectedIndex].text;
            const brand = brandInput.value;
            const productName = nameInput.value;
            const price = priceInput.value;
            const launchDate = toStringByFormatting(
                new Date(launchDateInput.value),
            );
            const img = 'https://www.naver.com';
            const quantity = inventoryInput.value;
            const size = getSizeArray(sizeInput.value);
            const data = {
                category,
                brand,
                productName,
                price,
                launchDate,
                img,
                quantity,
                size,
            };

            const result = await Api.post('/api/admin/product', data);

            if (result) {
                alert(
                    `${result.productName} 상품이 성공적으로 등록되었습니다!`,
                );

                window.location.href = '/admin';
            }
        } catch (err) {
            console.error(err.stack);
            alert(`${err.message}`);
        }
    } else {
        nameInput.value = '';
        sizeInput.value = '';
    }
}

// 4. size 배열 처리하는 함수
function getSizeArray(value) {
    const sizeArray = value.split(',');

    const sizes = [];

    for (let i = 0; i < sizeArray.length; i++) {
        const size = sizeArray[i];
        if (sizeArray[i] !== ' ') {
            sizes.push(size);
        }
    }
    return sizes;
}

// 5. Date format 처리하는 함수
function toStringByFormatting(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return date.getFullYear() + '-' + month + '-' + day;
}