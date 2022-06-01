// import * as Api from '/api.js';
import Product from './product.js';
import { navTransition } from '../navTransition/navTransition.js';

const categoryList = ['All', 'Shoes', 'Clothes', 'Others'];

const ref = {
    categoryContainer: document.getElementById('category-container'),
    productContainer: document.getElementById('product-container'),
};

const drawCategoryList = (target, categoryList) => {
    const div = document.createElement('div');
    div.id = 'category';
    div.innerHTML = categoryList.reduce(
        (prev, curr) =>
            prev +
            `<a href="#product-container"><button class="category-btn" id=${curr}>${curr}</button></a>`,
        '',
    );
    target.appendChild(div);
};

const drawProductList = (target, productList) => {
    target.innerHTML = '';
    productList.forEach((p, i) => {
        const product = new Product(p);
        const productUI = product.template();
        if (i === 40) {
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    if (entries[0].isIntersecting) {
                        observer.unobserve(entries[0].target);
                        Initialize();
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
        console.log(e.target.id);
        Initialize(e.target.id).then((productList) =>
            drawProductList(ref.productContainer, productList),
        );
    });
};

const render = (productList) => {
    navTransition('home');
    drawCategoryList(ref.categoryContainer, categoryList);
    drawProductList(ref.productContainer, productList);
};

const Initialize = async (category) => {
    const res = await fetch(`/api/products?category=${category}`);
    const data = await res.json();
    return data.productList;
};

Initialize('')
    .then((productList) => render(productList))
    .then(() => setEvent());
