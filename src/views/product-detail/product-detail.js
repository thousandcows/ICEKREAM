const ref = {
    modalContainer: document.querySelector('.modal-container'),
    productImg: document.querySelector('.product-image'),
    productBrand: document.querySelector('.product-brand'),
    productName: document.querySelector('.product-name'),
    productPrice: document.querySelector('.product-price'),
    productLaunch: document.querySelector('.product-launch'),
    selectSizeBtn: document.querySelector('.select-size-btn'),
    cartBtn: document.querySelector('#cart'),
    cartCount: document.querySelector('#cart-count'),
    buyNowBtn: document.querySelector('#buy'),
};

const productId = window.location.pathname.split('/')[2];
let product = {};
let selectSize = '';

const drawProduct = () => {
    ref.productImg.src = product.img;
    ref.productBrand.innerHTML = product.brand;
    ref.productName.innerHTML = product.productName;
    ref.productPrice.innerHTML = product.price;
    ref.productLaunch.innerHTML = product.launchDate;
};

const drawCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        ref.cartCount.innerText = 0;
    } else {
        ref.cartCount.innerText = Object.keys(cart).length;
    }
};

const drawModal = () => {
    const selectSizeBtnList = product.size.reduce((prev, curr) => {
        return prev + `<button class="size-btn" id=${curr}>${curr}</button>`;
    }, '');
    ref.modalContainer.innerHTML = `
        <div class="modal-background">  
            <div class="modal-box">
                ${selectSizeBtnList}
            </div>
        </div>
    `;
    ref.modalContainer.style.visibility = 'hidden';
};

const addCart = (id) => {
    if (!selectSize) {
        alert('사이즈를 선택해 주세요');
    } else {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            localStorage.setItem(
                'cart',
                JSON.stringify({
                    [product._id]: {
                        productName: product.productName,
                        price: product.price,
                        quantity: 1,
                        size: selectSize,
                    },
                }),
            );
            alert('장바구니에 담겼습니다.');
            ref.cartCount.innerText = parseInt(ref.cartCount.innerText) + 1;
        } else {
            if (!cart[product._id]) {
                cart[product._id] = {
                    productName: product.productName,
                    price: product.price,
                    quantity: 1,
                    size: selectSize,
                };
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('장바구니에 담겼습니다.');
                ref.cartCount.innerText = parseInt(ref.cartCount.innerText) + 1;
            } else {
                alert('이미 담긴 상품입니다.');
            }
        }
    }
};

const setEvents = () => {
    // 사이즈 모달창
    ref.selectSizeBtn.addEventListener('click', () => {
        ref.modalContainer.style.visibility = 'visible';
    });

    // 사이즈 선택
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach((sizeBtn) => {
        sizeBtn.addEventListener('click', (e) => {
            ref.selectSizeBtn.innerText = e.target.id;
            selectSize = e.target.id;
            ref.modalContainer.style.visibility = 'hidden';
        });
    });

    // 장바구니
    ref.cartBtn.addEventListener('click', addCart);

    // 즉시구매
    ref.buyNowBtn.addEventListener('click', () => {
        if (!selectSize) {
            alert('사이즈를 선택해 주세요');
        } else {
            localStorage.setItem(
                'payment',
                JSON.stringify({
                    [product._id]: {
                        productName: product.productName,
                        price: product.price,
                        quantity: 1,
                        size: selectSize,
                    },
                }),
            );
            location.href = '/order';
        }
    });
};

const render = () => {
    drawProduct();
    drawCartCount();
    drawModal();
};

const initialize = async () => {
    const res = await fetch(`/api/products/${productId}`);
    product = await res.json();
};

initialize()
    .then(() => render())
    .then(() => setEvents());
