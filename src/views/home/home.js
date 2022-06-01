// import * as Api from '/api.js';
import Product from './product.js';
import { navTransition } from '../navTransition/navTransition.js';

navTransition('home');

const categoryList = ['Shoes', 'Clothes', 'Others'];

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
            `<a href="#product-container">
                <button 
                    class="category-btn" 
                    onclick=${categoryHandler()}>
                    ${curr}
                </button>
            </a>`,
        '',
    );
    target.appendChild(div);
};

const drawProductList = (target, productList) => {
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

const render = (productList) => {
    drawCategoryList(ref.categoryContainer, categoryList);
    drawProductList(ref.productContainer, productList);
};

const Initialize = async (category) => {
    const res = await fetch(`/api/products?category=${category}`);
    const data = await res.json();
    return data.productList;
};

Initialize('').then((productList) => render(productList));
