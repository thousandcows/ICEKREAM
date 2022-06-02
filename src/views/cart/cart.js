import Product from './product.js';
import { navTransition } from '../nav-transition/nav-transition.js';

const ref = {
    cartContainer: document.querySelector('.cart'),
    selectAllBtn: document.getElementById('select-all-product'),
    checkoutBtn: document.getElementById('checkout-btn'),
    deleteSelectedBtn: document.getElementById('delete-selected-btn'),
};

const drawCartList = (target, productList) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart && productList) {
        productList.forEach((product, i) => {
            const productUI = new Product(target, product, cart[product._id]);
            target.appendChild(productUI.template(i));
        });
    }
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
        const selectBtns = document.querySelectorAll('.select-btn');
        const cart = JSON.parse(localStorage.getItem('cart'));
        selectBtns.forEach((selectBtn) => {
            if (selectBtn.checked) {
                const productId = selectBtn.click();
                cart.removeItem(productId);
            }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    // 결제 버튼
    ref.checkoutBtn.addEventListener('click', (e) => {
        const allProductUI = document.querySelectorAll('.items');
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
            localStorage.removeItem('payment');
            localStorage.setItem('payment', JSON.stringify(selectedProduct));
        }
    });
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

const render = (productList) => {
    navTransition('cart');
    drawCartList(ref.cartContainer, productList);
};

initialize()
    .then((cartList) => render(cartList))
    .then(() => setEvents());
