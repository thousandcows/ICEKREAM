export default class Product {
    constructor(product) {
        this.product = product;
    }

    template() {
        const div = document.createElement('div');
        div.classList.add('product');
        div.id = this.product.id;
        div.innerHTML = `<div class='product-card' style='color:black'>${this.product.name}의 가격은 ${this.product.price}입니다.</div>`;
        return div;
    }
}
