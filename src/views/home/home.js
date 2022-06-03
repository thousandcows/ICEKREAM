// import * as Api from '/api.js';
import Product from './product.js';
import { navTransition } from '../nav-transition/nav-transition.js';

const ref = {
    categoryContainer: document.getElementById('category-container'),
    productContainer: document.getElementById('product-container'),
    cartCount: document.getElementById('cart-count'),
};

const categoryList = ['All', 'Shoes', 'Clothes', 'Others'];
let setCategory = '';
let setPage = 1;
let perPage = 20;

const drawCartCount = (target) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        target.innerText = 0;
    } else {
        target.innerText = Object.keys(cart).length;
    }
};

const drawBanner = () => {
    const slider = document.querySelector('#slider');
    const slides = slider.querySelector('.slides');
    const slide = slides.querySelectorAll('.slide');
    let currentSlide = 0;
    setInterval(function () {
        let from = -(100 * currentSlide);
        let to = from - 100;

        slides.animate(
            {
                marginLeft: [from + 'vw', to + 'vw'],
            },
            {
                duration: 500,
                easing: 'ease',
                iterations: 1,
                fill: 'both',
            },
        );
        currentSlide++;
        if (currentSlide === slide.length - 1) {
            currentSlide = 0;
        }
    }, 2500);
};

const drawCategoryList = (target, categoryList) => {
    const div = document.createElement('div');
    div.id = 'category';
    div.innerHTML = categoryList.reduce(
        (prev, curr) =>
            prev +
            `<a href="#scroll-top"><button class="category-btn" id=${curr}>${curr}</button></a>`,
        '',
    );
    target.appendChild(div);
};

const drawProductList = (target, productList) => {
    console.log(productList);
    if (setPage === 1) target.innerHTML = '';
    productList.forEach((p, i) => {
        const product = new Product(p);
        const productUI = product.template();
        if (i === perPage - 1) {
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    if (entries[0].isIntersecting) {
                        observer.unobserve(entries[0].target);
                        getData();
                    }
                },
                {
                    root: null,
                    rootMargin: '0px 0px 0px 0px',
                    thredhold: 1,
                },
            );
            observer.observe(productUI);
        }
        target.appendChild(productUI);
    });
};

const setEvent = () => {
    // 카테고리 선택
    const category = document.getElementById('category');
    category.addEventListener('click', (e) => {
        Initialize(e.target.id).then((productList) =>
            drawProductList(ref.productContainer, productList),
        );
    });

    // 뒤로가기 -> 장바구니 카운트 리렌더링
    window.onpageshow = function (event) {
        if (event.persisted || window.performance) {
            drawCartCount(ref.cartCount);
        }
    };
};

const getData = async () => {
    setPage += 1;
    const res = await fetch(
        `/api/products?category=${setCategory}&perPage=${perPage}&page=${setPage}`,
    );
    const data = await res.json();
    drawProductList(ref.productContainer, data.productList);
};

const render = (productList) => {
    navTransition('home');
    drawCartCount(ref.cartCount);
    drawBanner();
    drawCategoryList(ref.categoryContainer, categoryList);
    drawProductList(ref.productContainer, productList);
};

const Initialize = async (category) => {
    setPage = 1;
    setCategory = category;
    const res = await fetch(
        `/api/products?category=${setCategory}&perPage=${perPage}&page=${setPage}`,
    );
    const data = await res.json();
    return data.productList;
};

Initialize('')
    .then((productList) => render(productList))
    .then(() => setEvent());
