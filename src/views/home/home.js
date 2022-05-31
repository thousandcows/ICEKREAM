import Product from './product.js';
// import * as Api from '/api.js';
import { navTransition } from '../navTransition/navTransition.js';
import { randomId } from '/useful-functions.js';


navTransition('home');


const testCase = [
    { id: 1, name: 'apple', price: 1000 },
    { id: 2, name: 'banana', price: 2000 },
    { id: 3, name: 'apple', price: 1000 },
    { id: 4, name: 'banana', price: 2000 },
    { id: 5, name: 'apple', price: 1000 },
    { id: 6, name: 'banana', price: 2000 },
    { id: 7, name: 'apple', price: 1000 },
    { id: 8, name: 'banana', price: 2000 },
    { id: 9, name: 'apple', price: 1000 },
    { id: 10, name: 'banana', price: 2000 },
    { id: 11, name: 'apple', price: 1000 },
    { id: 12, name: 'banana', price: 2000 },
    { id: 13, name: 'apple', price: 1000 },
    { id: 14, name: 'banana', price: 2000 },
    { id: 15, name: 'apple', price: 1000 },
    { id: 16, name: 'banana', price: 2000 },
];


const ref = {
    productContainer: document.getElementById('product-container'),
};

const option = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    thredhold: 1,
};

const render = (target, products) => {
    products.forEach((product, i) => {
        const productUI = new Product(product);
        const productHTML = productUI.template();
        if (i === 15) {
            // 새로운 관찰자 지정
            const observer = new IntersectionObserver((entries, observer) => {
                if (entries[0].isIntersecting) {
                    observer.unobserve(entries[0].target);
                    getData();
                }
            }, option);
            observer.observe(productHTML);
        }
        target.appendChild(productHTML);
    });
};

const getData = () => {
    const newData = [...testCase];
    render(ref.productContainer, newData);
};

getData();
