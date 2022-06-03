import Product from './product.js';
import { navTransition } from '../nav-transition/nav-transition.js';

const ref = {
    cartContainer: document.querySelector('.cart'),
    selectAllBtn: document.getElementById('select-all-product'),
    deleteSelectedBtn: document.getElementById('delete-selected-btn'),
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

    // 선택 삭제
    ref.deleteSelectedBtn.addEventListener('click', () => {
        const productDomList = document.querySelectorAll('.items');
        productDomList.forEach((productDom) => {
            const selectBtn = productDom.querySelector('.select-btn');
            const removeBtn = productDom.querySelector('.remove-btn');
            if (selectBtn.checked) {
                removeBtn.click();
            }
        });
    });

    // 결제 버튼
    ref.checkoutBtn.addEventListener('click', (e) => {
        const allProductUI = Array.from(document.querySelectorAll('.items'));
        const cart = JSON.parse(localStorage.getItem('cart'));
        const selectedProduct = allProductUI.reduce((prev, productUI) => {
            const selectBtn = productUI.querySelector('.select-btn');
            if (selectBtn.checked) {
                prev[productUI.id] = cart[productUI.id];
            }
            return prev;
        }, {});
        if (!Object.keys(selectedProduct).length) {
            e.preventDefault();
            alert('장바구니에 담긴 상품이 없습니다.');
        } else {
            localStorage.setItem('payment', JSON.stringify(selectedProduct));
        }
    });
};

const render = (productList) => {
    navTransition('cart');
    drawCartList(ref.cartContainer, productList);
};

const initialize = async () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart) {
        const res = await fetch(`/api/products/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productIds: Object.keys(cart).map((key) => key),
            }),
        });
        return await res.json();
    } else {
        return null;
    }
};

initialize()
    .then((cartList) => render(cartList))
    .then(() => setEvents());
