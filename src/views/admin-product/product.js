import * as Api from '/api.js';

// 1. 상품 조회 기능
const products = await Api.get('/api/admin/product', '');
const productContainer = document.querySelector('.section-container');
const modal = document.querySelector('#modal');
const modalBox = document.querySelector('.modal-box');

for (let i = 0; i < products.length; i++) {
    const { _id, productName, launchDate, price, quantity } = products[i];

    const productId = _id;
    const priceDisplay = price.toLocaleString('ko-KR');

    const productContent = `
            <div class="table-column title-column product${productId}">${productName}</div>
            <div class="table-column title-column product${productId}">${launchDate}</div>
            <div class="table-column title-column product${productId}">${priceDisplay}원</div>
            <div class="table-column title-column product${productId}">${quantity}</div>
            <div class="table-column title-column product${productId}">
                <button class="editButton" id="product${productId}">수정</button>
            </div>
            <div class="table-column title-column" id="product${productId}">
                <button class="deleteButton" id="product${productId}">삭제</button>
            </div>
        `;

    productContainer.innerHTML += productContent;
}

// 2. 상품 삭제 기능
async function deleteProduct() {
    
    const entireRow = document.querySelector(`.${this.id}`);

    const productContainer = document.querySelector('.section-container');

    const check = confirm(`상품 정보 삭제 시 복구할 수 없습니다. 정말로 삭제하시겠습니까?`);
    
    if (check) {
        productContainer.removeChild(entireRow);

        const productId = this.id.slice(7);
        const data = { productId };
        const result = await Api.delete(
            '',
            `api/admin/product/${productId}`,
            data,
        );

        if (result) {
            alert('삭제가 완료되었습니다.');
        }
        closeModal();
    } else{
        closeModal();
    }
}


// 3. 상품 수정 기능
async function editModal() {
    const productId = this.id.slice(7);
    const productInfo = await Api.get('/api/products', productId);
    
    const { productName, price, img, quantity } = productInfo;

    const informationToUpdate = `
            
            <div class="product-info">
                <div>
                    <div class="title">Update Item</div>
                <div class="field">
                    <label class="label" for="titleInput">상품 이름</label>
                    <div class="control">
                        <input
                          class="input"
                          id="nameInput"
                          type="text"
                          value="${productName}"
                          autocomplete="on"
                          readonly
                        />
                    </div>
                </div>    
                <div class="field">
                    <label class="label" for="inventoryInput">사이즈 당 재고 수</label>
                    <div class="control">
                        <input
                          class="input"
                          id="inventoryInput"
                          type="number"
                          autocomplete="on"
                          placeholder="최소 5개, 최대 100개까지 입력 가능합니다."
                          min="5"
                          max="100"
                          value="${quantity}"
                          required
                        />
                    </div>
              </div>
                <div class="field">
                    <label class="label" for="priceInput">가격</label>
                    <div class="field">
                        <input
                          class="input"
                          id="priceInput"
                          type="number"
                          placeholder="최소 500원, 최대 1000만원까지 입력 가능합니다."
                          autocomplete="on"
                          min="500"
                          max="10000000"
                          value="${price}"
                          required
                        />
                        <span class="icon is-small is-right"> 원 </span>
                    </div>
                </div>

                <div class="field is-fullwidth">
                    <label class="label" for="imageInput">상품 사진</label>
                    <div class="field">
                    <div class="control">
                        <input
                          class="input"
                          id="imgInput"
                          type="text"
                          value="${img}"
                          autocomplete="on"
                          required
                        />
                        </div>
                    </div>

                </div>
            </div>
            </div>
                <div class="buttons">
                    <button class="update-button mt-5" id="editCompleteButton"aria-label="close">
                      변경
                    </button>
                    <button class="cancel-button is-primary mt-5" id="editCancelButton" aria-label="close">
                      취소
                    </button>
            </div>
            </div>
        `;

    modalBox.innerHTML += informationToUpdate;
    modal.style.display = 'flex';

    const editBtn = document.querySelector('#editCompleteButton');
    const cancelBtn = document.querySelector('#editCancelButton');

    editBtn.addEventListener('click', () => {
        const check = confirm('정말 변경하시겠습니까?');

        if (check) {
            let newPrice = document.querySelector('#priceInput').value;
            let newImg = document.querySelector('#imgInput').value;
            let newQuantity = document.querySelector('#inventoryInput').value;

            let newInfo = { productId, newPrice, newImg, newQuantity };

            updateProduct(newInfo);
        } else {
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

// 5. 변경 시 파일 정보 수정
async function updateProduct(productInfo) {
    const { productId, newPrice, newImg, newQuantity } = productInfo;

    const data = { price: newPrice, img: newImg, quantity: newQuantity };

    const result = await Api.patch('', `api/admin/product/${productId}`, data);

    if (result) {
        alert('성공적으로 수정되었습니다!');
        closeModal();
    }
}

// 5. 버튼에 삭제 기능 추가
const deleteButtons = document.querySelectorAll('.deleteButton');

deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteProduct);
});

// 6. 모달 창 닫히는 기능
async function closeModal() {
    modal.style.display = 'none';
    modalBox.innerHTML = '';
}
