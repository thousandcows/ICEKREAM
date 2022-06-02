import Product from './product.js';
import { navTransition } from '../nav-transition/nav-transition.js';

navTransition('cart');

const ref = {
    cartContainer: document.querySelector('.cart'),
    selectAllBtn: document.getElementById('select-all-product'),
    checkoutBtn: document.getElementById('checkout-btn'),
};

const drawCartList = (target, productList) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    productList.forEach((product, i) => {
        const productUI = new Product(target, product, cart[product._id]);
        target.appendChild(productUI.template(i));
    });
};

const setEvents = () => {
    // 전체 선택
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

    //
    ref.checkoutBtn.addEventListener('click', () => {
        const selectedProduct = {};
        const allProductUI = document.querySelectorAll('.items');
        allProductUI.forEach((productUI) => {
            const selectBtn = productUI.querySelector('.select-btn');
            if (selectBtn.checked) {
                const cart = JSON.parse(localStorage.getItem('cart'));
                selectedProduct[productUI.id] = cart[productUI.id];
                // delete cart[productUI.id];
                // localStorage.setItem('cart', JSON.stringify(cart));
                localStorage.setItem(
                    'payment',
                    JSON.stringify(selectedProduct),
                );
            }
        });
    });
};

const initialize = async () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let query = Object.keys(cart).reduce(
        (prev, key) => prev + `id=${key}&`,
        '',
    );
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
