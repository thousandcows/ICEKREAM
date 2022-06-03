const ref = {
    productImg: document.querySelector('.product-image'),
    productBrand: document.querySelector('.product-brand'),
    productName: document.querySelector('.product-name'),
    productPrice: document.querySelector('.product-price'),
    productLaunch: document.querySelector('.product-launch'),
    productSize: document.querySelector('.product-size'),
};

const productId = window.location.pathname.split('/')[2];

const drawProduct = (product) => {
    ref.productImg.src = product.img;
    ref.productBrand.innerHTML = product.brand;
    ref.productName.innerHTML = product.productName;
    ref.productPrice.innerHTML = product.price;
    ref.productLaunch.innerHTML = product.launchDate;
    ref.productSize.innerHTML = product.size[0];
};

const setEvents = () => {};

const render = (product) => {
    drawProduct(product);
};

const initialize = async () => {
    const res = await fetch(`/api/products/${productId}`);
    return await res.json();
};

initialize()
    .then((product) => render(product))
    .then(() => setEvents());
