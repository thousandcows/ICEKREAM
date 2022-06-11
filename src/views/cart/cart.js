import { checkAccount } from '../check-account.js';
import drawNavbar from '../navbar/index.js';
import { productLayout } from './component.js';

import {
    state,
    selectProduct,
    selectAllProduct,
    updateQty,
    deleteProduct,
    deleteSelectedProduct,
    initState,
} from './state.js';

const ref = {
    cartContainer: document.querySelector('.cart-container'),
    selectAllBtn: document.getElementById('select-all-product'),
    deleteSelectedBtn: document.getElementById('delete-selected-btn'),
    quantity: document.getElementById('quantity'),
    total: document.getElementById('total'),
    checkoutBtn: document.getElementById('checkout-btn'),
};

const drawCartList = () => {
    const productDomList = Object.keys(state.cartList).reduce(
        (prev, productId) =>
            prev +
            productLayout(
                state.productInfo[productId],
                state.cartList[productId],
            ),
        '',
    );
    ref.cartContainer.innerHTML = productDomList;
};

const drawCheckoutInfo = () => {
    ref.quantity.innerText = state.quantity;
    ref.total.innerText = state.total;
};

const setEvents = () => {
    // 이벤트 위임 : 삭제 버튼
    ref.cartContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove')) {
            const productId = e.target.dataset.id;
            deleteProduct(productId);
            render();
        }
    });

    // 이벤트 위임 : 수량 변경
    ref.cartContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('qty')) {
            const productId = e.target.dataset.id;
            const newQty = parseInt(e.target.value) || 0;
            updateQty(productId, newQty);
            render();
        } else if (e.target.classList.contains('select-btn')) {
            const productId = e.target.dataset.id;
            selectProduct(productId);
            render();
        }
    });

    // 전체 선택
    ref.selectAllBtn.addEventListener('input', (e) => {
        const checkState = e.target.checked;
        selectAllProduct(checkState);
        render();
    });

    // 선택 삭제
    ref.deleteSelectedBtn.addEventListener('click', () => {
        deleteSelectedProduct();
        render();
    });

    // 결제 버튼
    ref.checkoutBtn.addEventListener('click', (e) => {
        const selectedProduct =
            Object.keys(state.cartList).reduce((prev, productId) => {
                const targetProduct = state.cartList[productId];
                console.log(targetProduct);
                if (targetProduct.checked && targetProduct.quantity) {
                    console.log('hi');
                    prev[productId] = targetProduct;
                    return prev;
                }
            }, {}) || {};

        if (!Object.keys(selectedProduct).length) {
            e.preventDefault();
            alert('장바구니에 담긴 상품이 없습니다.');
        } else {
            localStorage.setItem('payment', JSON.stringify(selectedProduct));
        }
    });
};

const render = async () => {
    drawCartList();
    drawCheckoutInfo();
};

checkAccount()
    .then(({ isLogined, isAdmin }) => drawNavbar('cart', isLogined, isAdmin))
    .then(() => initState())
    .then(() => render())
    .then(() => setEvents());
