export default function Product(id, product) {
    this.id = id;
    this.product = product;

    this.template = function () {
        const div = document.createElement('div');
        div.classList.add('product-card');
        div.id = this.id;
        div.innerHTML = `
            <input type='checkbox' class='select-btn'>
            <div>${this.product.name}</div>
            <div>${this.product.price}</div>
            <button class='delete-btn' >X</button>
        `;
        this.setEvent(div);
        return div;
    };

    this.setEvent = function (elem) {
        const deleteBtn = elem.querySelector('.delete-btn');
        const selectInput = elem.querySelector('.select-btn');

        deleteBtn.addEventListener('click', this.del.bind(this));
        selectInput.addEventListener('change', this.select.bind(this));
    };

    this.select = function () {
        const total = document.getElementById('total');
        const price = document.getElementById('price');
        const prevtotal = Number(total.innerText);
        const prevprice = Number(price.innerText);
        const input = document
            .getElementById(this.id)
            .querySelector('.select-btn');
        if (input.checked) {
            total.innerText = prevtotal + 1;
            price.innerText = prevprice + this.product.price;
        } else {
            total.innerText = prevtotal - 1;
            price.innerText = prevprice - this.product.price;
        }
    };

    this.del = function () {
        const productContainer = document.getElementById('product-container');
        const cart = JSON.parse(localStorage.getItem('cart'));
        delete cart[this.id];
        localStorage.setItem('cart', JSON.stringify(cart));
        productContainer.removeChild(document.getElementById(this.id));
    };
}
