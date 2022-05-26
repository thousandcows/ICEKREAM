export default function Product(id, product) {
    this.id = id;
    this.product = product;
  
    this.template = function () {
      const div = document.createElement("li");
      div.classList.add("items");
      div.id = this.id;
      div.innerHTML = `
          <div class="infoWrap">
              <input type="checkbox" class="select-btn"/>
              <div class="cartSection">
                  <img src="./product.png" alt="" class="itemImg" />
                  <h3>${product.name}</h3>
                  <p><input type="text" class="qty" placeholder="3" /> x ${product.price}</p>
                  <p class="stockStatus">In Stock</p>
              </div>
              <div class="prodTotal cartSection">
                  <p>${product.price}</p>
              </div>
              <div class="cartSection removeWrap">
                  <a href="#" class="remove">x</a>
              </div>
          </div>
      `;
      this.setEvent(div);
      return div;
    };
  
    this.setEvent = function (elem) {
      const deleteBtn = elem.querySelector(".remove");
      const selectInput = elem.querySelector(".select-btn");
      deleteBtn.addEventListener("click", this.del.bind(this));
      selectInput.addEventListener("change", this.select.bind(this));
    };
  
    this.select = function () {
      const total = document.getElementById("total");
      const price = document.getElementById("price");
      const prevtotal = Number(total.innerText);
      const prevprice = Number(price.innerText);
      const input = document.getElementById(this.id).querySelector(".select-btn");
      if (input.checked) {
        total.innerText = prevtotal + 1;
        price.innerText = prevprice + this.product.price;
      } else {
        total.innerText = prevtotal - 1;
        price.innerText = prevprice - this.product.price;
      }
    };
  
    this.del = function () {
      const productContainer = document.querySelector(".cart");
      const cart = JSON.parse(localStorage.getItem("cart"));
      delete cart[this.id];
      localStorage.setItem("cart", JSON.stringify(cart));
      productContainer.removeChild(document.getElementById(this.id));
    };
  }
  