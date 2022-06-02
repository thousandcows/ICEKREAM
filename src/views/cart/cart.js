import Product from './product.js';
import { navTransition } from '../nav-transition/nav-transition.js';

navTransition('cart');

const ref = {
    cartContainer: document.querySelector('.cart'),
    selectAllBtn: document.getElementById('select-all-product'),
    checkoutBtn: document.getElementById('checkout-btn'),
    deleteSelectedBtn: document.getElementById('delete-selected-btn'),
};

const drawCartList = (target, productList) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) return;
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

    // 선택 삭제
    ref.deleteSelectedBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        ref.cartContainer.innerHTML = '';
    });

    // 결제 버튼
    ref.checkoutBtn.addEventListener('click', (e) => {
        const selectedProduct = {};
        const cart = JSON.parse(localStorage.getItem('cart'));
        const allProductUI = document.querySelectorAll('.items');
        allProductUI.forEach((productUI) => {
            const selectBtn = productUI.querySelector('.select-btn');
            if (selectBtn.checked) {
                selectedProduct[productUI.id] = cart[productUI.id];
            }
        });
        if (!Object.keys(selectedProduct).length) {
            e.preventDefault();
            alert('장바구니에 담긴 상품이 없습니다.');
        } else {
            localStorage.setItem('payment', JSON.stringify(selectedProduct));
        }
    });
};

const initialize = async () => {
    localStorage.removeItem('payment');
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) return;
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
