export default class Product {
    constructor(product) {
        this.product = product;
    }

    template() {
        const div = document.createElement('div');
        div.classList.add('product');
        div.id = this.product._id;
        div.innerHTML = `
            <div class="product-img-container">
                <img
                    src=${this.product.img}
                    alt="product-img">
            </div>
            <div class="product-info-container">
                <div class="brand">${this.product.brand}</div>
                <div class="product-name">${this.product.productName}</div>
                <div class="price">${this.product.price}원</div>
            </div>
            <button class="cart-btn">장바구니</button>
        `;
        this.setEvent(div);
        return div;
    }

    setEvent(elem) {
        elem.querySelector('.cart-btn').addEventListener(
            'click',
            this.addCart.bind(this),
        );
    }

    addCart() {
        const cartCount = document.getElementById('cart-count');
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            localStorage.setItem(
                'cart',
                JSON.stringify({
                    [this.product._id]: {
                        productName: this.product.productName,
                        price: this.product.price,
                        quantity: 1,
                        size: 220,
                    },
                }),
            );
            alert('장바구니에 담겼습니다.');
            cartCount.innerText = parseInt(cartCount.innerText) + 1;
        } else {
            if (!cart.id) {
                cart[this.product._id] = {
                    productName: this.product.productName,
                    price: this.product.price,
                    quantity: 1,
                    size: 220,
                };
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('장바구니에 담겼습니다.');
                cartCount.innerText = parseInt(cartCount.innerText) + 1;
            } else {
                alert('이미 담긴 상품입니다.');
            }
        }
    }
}
