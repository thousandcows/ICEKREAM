import * as Api from '/api.js';

const submitBtn = document.querySelector('#submitButton');
const nameInput = document.querySelector('#nameInput');
const sizeInput = document.querySelector('#sizeInput');

addAllElements();
addAllEvents();

async function addAllElements() {}

function addAllEvents() {
    submitBtn.addEventListener('click', handleSubmit);
}

async function handleSubmit(e) {
    e.preventDefault();

    const categoryName = nameInput.value;
    const categorySize = sizeInput.value;

    const sizeArray = categorySize.split(',');

    const sizes = []

    for (let i = 0; i < sizeArray.length; i++){
        const size = sizeArray[i];
        if (sizeArray[i] !== " "){
            sizes.push(size);
        }
    }

    const check = confirm(`카테고리: ${categoryName}, 사이즈: ${categorySize}로 추가하시겠습니까?`);

    if (check){
        try{
            
            const name = categoryName;
            const products = [];
            const size = sizes;

            const data = {name, products, size};

            const result = await Api.post('/api/admin/product/category', data);

            if (result) {
                alert(`${result.categoryName} 카테고리가 성공적으로 등록되었습니다!`);
                window.location.href = '/admin';
            }
        }catch(err){
            console.error(err.stack);
            alert(`${err.message}`);
        }
        
    } else{
        nameInput.value = "";
        sizeInput.value = "";
    }
    
}