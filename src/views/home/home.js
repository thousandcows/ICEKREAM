// import * as Api from '/api.js';
import Product from './product.js';
import { navTransition } from '../nav-transition/nav-transition.js';

navTransition('home');

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
    if (!cart) target.innerText = 0;
    else target.innerText = Object.keys(cart).length;
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
    if (setPage === 1) target.innerHTML = '';
    console.log(productList);
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
    const category = document.getElementById('category');
    category.addEventListener('click', (e) => {
        Initialize(e.target.id).then((productList) =>
            drawProductList(ref.productContainer, productList),
        );
    });
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
    // navTransition('home');
    drawCartCount(ref.cartCount);
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
