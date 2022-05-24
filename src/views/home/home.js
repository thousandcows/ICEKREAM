import State from './state.js';
import ProductLayout from './product.js';

const ref = {
    productContainer: document.getElementById('product-container'),
};

const state = new State();

state.initializeState().then(
    const productLayout = new ProductLayout(state.products, ref.productContainer);
)