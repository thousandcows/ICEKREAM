import Product from './product.js';
import { navTransition } from '../nav-transition/nav-transition.js';

navTransition('cart');

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
