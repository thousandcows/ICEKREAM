const productLayout = (productInfo, userAddToCart) => {
    return `
        <li class='items' id=${productInfo._id}>
            <div class='infoWrap'>
                ${
                    userAddToCart.checked
                        ? `<input type=checkbox  class="select-btn" data-id=${productInfo._id} checked=true>`
                        : `<input type=checkbox class="select-btn" data-id=${productInfo._id}>`
                }
                <div class='cartSection'>
                    <img src=${productInfo.img} alt='' class='itemImg' />
                    <h3>${productInfo.productName}</h3>
                    <p>
                        <input 
                            type='text'  
                            class='qty'
                            data-id=${productInfo._id}
                            placeholder=${userAddToCart.quantity}
                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')"/>
                        x ${productInfo.price}
                    </p>
                    <p class='stockStatus'>In Stock</p>
                    <div class='size'>SIZE | ${userAddToCart.size}</div>
                </div>
                <div class='prodTotal cartSection'>
                    <p class='prod-total-text'>${
                        productInfo.price * userAddToCart.quantity
                    }</p>
                </div>
                <div class='cartSection remove-btn remove' data-id=${
                    productInfo._id
                }>
                <a href='#' class='remove' data-id=${productInfo._id}>x</a>
                </div>
            </div>
        </li>
    `;
};

export { productLayout };
