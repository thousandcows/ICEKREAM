import * as Api from '/api.js';

// 1. 카테고리 조회 기능
const categories = await Api.get('/api/admin/product/category', '');
const categoryContainer = document.querySelector('.section-container');
const modal = document.querySelector('#modal');
const modalBox = document.querySelector('.modal-box');

categories.forEach((category) => {

    const {_id, name, products, size} = category;
    const categoryId = _id;
    
    let sizeDisplay = size;

    if (size.length > 6){
        sizeDisplay = `${size[0]} ~ ${size[size.length - 1]}`;
    }
    
    const numberOfProducts = products.length;

    const categoryContent = `
            <div class="table-column title-column">${name}</div>
            <div class="table-column title-column">${numberOfProducts}</div>
            <div class="table-column title-column">${sizeDisplay}</div>
            <div class="table-column title-column">
                <button class="editButton" id="category${categoryId}">수정</button>
            </div>
            <div class="table-column title-column">
                <button class="deleteButton" id="category${categoryId}">삭제</button>
            </div>
        `;

        categoryContainer.innerHTML += categoryContent;
});

// 2. 카테고리 삭제 기능
async function deleteCategory() {
    const entireRow = document.querySelectorAll(`.${this.id}`);

    const check = confirm(
        '한 번 삭제한 카테고리는 복구가 불가능합니다. 그래도 삭제하시겠습니까?',
    );

    if (check) {

        entireRow.forEach((el) => {
            sectionContainer.removeChild(el);
        });

        const categoryId = this.id.slice(8);
        const data = { categoryId };

        const result = await Api.delete('',`api/admin/product/category/${categoryId}`, data,);

        if (result) {
            alert('삭제가 완료되었습니다.');
        }
    }
}

// 3. 카테고리 수정 기능
async function editModal() {

    const categoryId = this.id.slice(8);

    const categoryInfo = await Api.get(`/api/admin/product/category/${categoryId}`, '');

    const {name, size} = categoryInfo;

    const informationToUpdate = `
            <div class="product-info">
                <div class="field">
                    <label class="label" for="titleInput">상품 이름</label>
                    <div class="control">
                        <input
                          class="input"
                          id="nameInput"
                          type="text"
                          value="${name}"
                          autocomplete="on"
                          readonly
                        />
                    </div>
                </div>    
                <div class="field">
                    <label class="label" for="inventoryInput">사이즈 목록</label>
                    <div class="control">
                        <input
                          class="input"
                          id="sizeInput"
                          type="text"
                          autocomplete="on"
                          placeholder="쉼표로 구분하여 입력해주세요."
                          min="5"
                          max="100"
                          value="${size}"
                          required
                        />
                    </div>
              </div>
            </div>
            </div>
                <div class="buttons">
                    <button class="update-button" id="category${categoryId}">
                      변경
                    </button>
                    <button class="cancel-button" id="category${categoryId}">
                      취소
                    </button>
            </div>
        `;

    modalBox.innerHTML += informationToUpdate;
    modal.style.display = 'flex';

    const editBtn = document.querySelector('.update-button');
    const cancelBtn = document.querySelector('.cancel-button');


    editBtn.addEventListener('click', () => {
        const check = confirm('정말 변경하시겠습니까?');
        
        if (check) {

            let newName = document.querySelector('#nameInput').value;
            let newSize =document.querySelector('#sizeInput').value.split(',');
              

            let newInfo = {categoryId, newName, newSize};

            updateCategory(newInfo);
            
        } else{
            closeModal();
        }

    });
    
    cancelBtn.addEventListener('click', () => {
        closeModal();
    });
}

// 4. 버튼에 수정 기능 추가
const editButtons = document.querySelectorAll('.editButton');

editButtons.forEach((button) => {
    button.addEventListener('click', editModal);
});

// 5. 변경 시 카테고리 정보 수정
async function updateCategory(categoryInfo){
    console.log("reached updateCategory")
    const {categoryId, newName, newSize} = categoryInfo;
    console.log(categoryId);
    const name = newName;
    const size = newSize;
    const data = {categoryId, name, size};
    console.log(data)
    const result = await Api.patch('',`api/admin/product/category`, data);

    if (result) {
        alert('성공적으로 수정되었습니다!');
        
        closeModal();
    }

}

// 5. 버튼에 삭제 기능 추가
const deleteButtons = document.querySelectorAll('.deleteButton');

deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteCategory);
});

// 6. 모달 창 닫히는 기능
async function closeModal(){
    modal.style.display = 'none';
    modalBox.innerHTML = '';
}