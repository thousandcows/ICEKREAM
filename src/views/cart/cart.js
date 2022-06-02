import Product from './product.js';
import { navTransition } from '../nav-transition/nav-transition.js';

navTransition('cart');

const ref = {
    cartContainer: document.querySelector('.cart'),
    selectAllBtn: document.getElementById('select-all-product'),
};

const drawCartList = (target, productList) => {
    console.log(productList);
    const cart = JSON.parse(localStorage.getItem('cart'));
    productList.forEach((product, i) => {
        const productUI = new Product(target, product, cart[i]);
        target.appendChild(productUI.template(i));
    });
};

const setEvents = () => {
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

const initialize = async () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let query = cart.reduce((prev, curr) => prev + `id=${curr.id}&`, '');
    const res = await fetch(`/api/products/cart?${query}`);
    const cartList = await res.json();
    return cartList;
};

const render = (productList) => {
    drawCartList(ref.cartContainer, productList);
};

initialize()
    .then((cartList) => render(cartList))
    .then(() => setEvents());
