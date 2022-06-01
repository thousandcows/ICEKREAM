export default class Product {
    constructor(product) {
        this.product = product;
    }

    template() {
        const div = document.createElement('div');
        div.classList.add('product');
        div.id = this.product.id;
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
        `;
        return div;
    }

    // setEvent(elem) {
    //     elem.querySelector('.qty').addEventListener(
    //         'click',
    //         this.setCategory.bind(this),
    //     );
    // }

    // setCategory() {}
}
