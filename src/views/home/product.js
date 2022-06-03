export default class Product {
    constructor(product) {
        this.product = product;
        this.size = '';
    }

    template() {
        const a = document.createElement('a');
        a.classList.add('product');
        a.href = `/products/${this.product._id}`;
        a.id = this.product._id;
        a.innerHTML = `
            <div class="product-img-container">
                <button class="cart-btn">Add to Cart</button>
                <img
                    src=${this.product.img}
                    alt="product-img">
            </div>
            <div class="product-info-container">
                <div class="brand">${this.product.brand}</div>
                <div class="product-name">${this.product.productName}</div>
                <div class="price">${this.product.price}원</div>
            </div>
            
        `;
        this.setEvent(a);
        return a;
    }

    modalTemplate() {
        const div = document.createElement('div');
        div.classList.add('modal-background');
        const sizeBtnList = this.product.size.reduce((prev, curr) => {
            return (
                prev + `<button class="size-btn" id=${curr}>${curr}</button>`
            );
        }, '');
        div.innerHTML = `        
            <div class="modal-box">
                ${sizeBtnList}
            </div>
        `;
        this.setModalEvent(div);
        return div;
    }

    setEvent(elem) {
        elem.querySelector('.cart-btn').addEventListener('click', (e) => {
            e.preventDefault();
            const cart = JSON.parse(localStorage.getItem('cart'));
            if (cart[this.product._id]) {
                alert('이미 담긴 상품입니다.');
            } else {
                this.showModal.bind(this)();
            }
        });
    }

    setModalEvent(elem) {
        const sizeBtns = elem.querySelectorAll('.size-btn');
        sizeBtns.forEach((sizeBtn) => {
            sizeBtn.addEventListener('click', (e) => {
                this.size = e.target.id;
                this.addCart.bind(this)();
            });
        });
    }

    showModal() {
        const modalContainer = document.querySelector('.modal-container');
        const tag = this.modalTemplate();
        modalContainer.appendChild(tag);
    }

    addCart() {
        const modalContainer = document.querySelector('.modal-container');
        modalContainer.innerHTML = '';
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
            if (!cart[this.product._id]) {
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
