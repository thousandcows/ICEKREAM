import Product from './product.js';

// 테스트 케이스
(function testCart() {
    localStorage.setItem(
        'cart',
        JSON.stringify({
            1: { name: 'apple', price: 1000, checked: true, quantity: 1 },
            2: { name: 'orange', price: 2000, checked: false, quantity: 3 },
            3: { name: 'banana', price: 3000, checked: true, quantity: 4 },
            4: { name: 'apple', price: 1000, checked: false, quantity: 1 },
            5: { name: 'orange', price: 2000, checked: true, quantity: 2 },
        }),
    );
})();

const ref = {
    productContainer: document.querySelector('.cart'),
    selectAllBtn: document.getElementById('select-all-product'),
};

const addEvents = () => {
    ref.selectAllBtn.addEventListener('input', () => {
        const selectBtns = document.querySelectorAll('.select-btn');
        if (ref.selectAllBtn.checked) {
            selectBtns.forEach(
                (selectBtn) => !selectBtn.checked && selectBtn.click(),
            );
        } else {
            selectBtns.forEach(
                (selectBtn) => selectBtn.checked && selectBtn.click(),
            );
        }
    });
};

// id에 해당되는 실제 데이터 요청 필요
const initialCart = () => JSON.parse(localStorage.getItem('cart'));

const render = (target, products) => {
    Object.entries(products).forEach(([key, value], i) => {
        const product = new Product(target, key, value);
        target.appendChild(product.template(i));
    });
};

render(ref.productContainer, initialCart());
addEvents();
