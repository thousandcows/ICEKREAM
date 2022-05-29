export default class Product {
    constructor(target, id, product) {
        this.target = target;
        this.id = id;
        this.product = product;
    }

    template(idx) {
        const li = document.createElement('li');
        li.id = this.id;
        if (idx % 2 === 0) {
            li.classList.add('items', 'even');
        } else {
            li.classList.add('items');
        }
        li.innerHTML = `
          <div class="infoWrap">
              <input type="checkbox" class="select-btn"/>
              <div class="cartSection">
                  <img src="./product.png" alt="" class="itemImg" />
                  <h3>${this.product.name}</h3>
                  <p><input type="text" class="qty" placeholder=${
                      this.product.quantity
                  } />x ${this.product.price}</p>
                  <p class="stockStatus">In Stock</p>
              </div>
              <div class="prodTotal cartSection">
                  <p class="prod-total-text">${
                      this.product.price * this.product.quantity
                  }</p>
              </div>
              <div class="cartSection remove-btn">
                  <a href="#" class="remove">x</a>
              </div>
          </div>
      `;
        this.setEvent(li);
        return li;
    }

    setEvent(elem) {
        elem.querySelector('.qty').addEventListener(
            'input',
            this.update.bind(this),
        );
        elem.querySelector('.remove-btn').addEventListener(
            'click',
            this.del.bind(this),
        );
        elem.querySelector('.select-btn').addEventListener(
            'change',
            this.select.bind(this),
        );
    }

    select() {
        const quantity = document.getElementById('quantity');
        const subTotal = document.getElementById('subtotal');
        const total = document.getElementById('total');
        const input = document
            .getElementById(this.id)
            .querySelector('.select-btn');
        if (input.checked) {
            quantity.innerText =
                Number(quantity.innerText) + this.product.quantity;
            subTotal.innerText =
                Number(subTotal.innerText) +
                this.product.quantity * this.product.price;
            total.innerText =
                Number(total.innerText) +
                this.product.quantity * this.product.price;
        } else {
            quantity.innerText =
                Number(quantity.innerText) - this.product.quantity;
            subTotal.innerText =
                Number(subTotal.innerText) -
                this.product.quantity * this.product.price;
            total.innerText =
                Number(total.innerText) -
                this.product.quantity * this.product.price;
        }
    }

    update(e) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newQty = Number(e.target.value);
        const oldQty = Number(cart[this.id].quantity);
        cart[this.id].quantity = newQty;
        this.product.quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(cart));
        const prodTotal = document
            .getElementById(this.id)
            .querySelector('.prod-total-text');
        prodTotal.innerText = newQty * this.product.price;

        const quantity = document.getElementById('quantity');
        const subTotal = document.getElementById('subtotal');
        const total = document.getElementById('total');
        const input = document
            .getElementById(this.id)
            .querySelector('.select-btn');
        if (input.checked) {
            if (newQty > oldQty) {
                quantity.innerText =
                    Number(quantity.innerText) + (newQty - oldQty);
                subTotal.innerText =
                    Number(subTotal.innerText) +
                    this.product.price * (newQty - oldQty);
                total.innerText =
                    Number(total.innerText) +
                    this.product.price * (newQty - oldQty);
            } else {
                quantity.innerText =
                    Number(quantity.innerText) - (oldQty - newQty);
                subTotal.innerText =
                    Number(subTotal.innerText) -
                    this.product.price * (oldQty - newQty);
                total.innerText =
                    Number(total.innerText) -
                    this.product.price * (oldQty - newQty);
            }
        }
    }

    del() {
        const quantity = document.getElementById('quantity');
        const subTotal = document.getElementById('subtotal');
        const total = document.getElementById('total');
        const input = document
            .getElementById(this.id)
            .querySelector('.select-btn');
        if (input.checked) {
            quantity.innerText =
                Number(quantity.innerText) - this.product.quantity;
            subTotal.innerText =
                Number(subTotal.innerText) -
                this.product.quantity * this.product.price;
            total.innerText =
                Number(total.innerText) -
                this.product.quantity * this.product.price;
        }
        const cart = JSON.parse(localStorage.getItem('cart'));
        delete cart[this.id];
        localStorage.setItem('cart', JSON.stringify(cart));
        this.target.removeChild(document.getElementById(this.id));
    }
}
