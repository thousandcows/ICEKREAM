export default class ProductLayout {
    constructor(products, target) {
        this.products = products;
        this.target = target;
        this.render();
    }

    template(product) {
        const div = document.createElement('div');
        div.id = 'product';
        div.addEventListener('click', this.setEvent);
        div.innerHTML = `<div id='product-card' style='color:black'>${product.name}의 가격은 ${product.price}입니다.</div>`;
        return div;
    }

    setEvent() {
        alert('hello');
    }

    render() {
        this.products.forEach((product) => {
            this.target.appendChild(this.template(product));
        });
    }
}
