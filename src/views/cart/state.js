const state = {
    cartList: {},
    productInfo: {},
    quantity: 0,
    total: 0,
};

const selectProduct = (productId) => {
    const targetProduct = state.cartList[productId];
    if (targetProduct.checked) {
        targetProduct.checked = false;
        state.quantity -= targetProduct.quantity;
        state.total -= targetProduct.price * targetProduct.quantity;
    } else {
        targetProduct.checked = true;
        state.quantity += targetProduct.quantity;
        state.total += targetProduct.price * targetProduct.quantity;
    }
    localStorage.setItem('cart', JSON.stringify(state.cartList));
};

const selectAllProduct = (checkState) => {
    if (checkState) {
        Object.keys(state.cartList).forEach((productId) => {
            const targetProduct = state.cartList[productId];

            if (!targetProduct.checked) {
                targetProduct.checked = true;
                state.quantity += targetProduct.quantity;
                state.total += targetProduct.price * targetProduct.quantity;
            }
        });
    } else {
        Object.keys(state.cartList).forEach((productId) => {
            const targetProduct = state.cartList[productId];

            if (targetProduct.checked) {
                targetProduct.checked = false;
                state.quantity -= targetProduct.quantity;
                state.total -= targetProduct.price * targetProduct.quantity;
            }
        });
    }
    localStorage.setItem('cart', JSON.stringify(state.cartList));
};

const updateQty = (productId, newQty) => {
    const targetProduct = state.cartList[productId];
    const oldQty = parseInt(targetProduct.quantity);

    if (newQty > oldQty) {
        state.quantity += newQty - oldQty;
        state.total += targetProduct.price * (newQty - oldQty);
    } else {
        state.quantity -= oldQty - newQty;
        state.total -= targetProduct.price * (oldQty - newQty);
    }

    targetProduct.quantity = newQty;
    localStorage.setItem('cart', JSON.stringify(state.cartList));
};

const deleteProduct = (productId) => {
    const targetProduct = state.cartList[productId];

    if (targetProduct.checked) {
        state.quantity -= targetProduct.quantity;
        state.total -= targetProduct.price * targetProduct.quantity;
    }
    delete state.cartList[productId];
    localStorage.setItem('cart', JSON.stringify(state.cartList));
};

const deleteSelectedProduct = () => {
    Object.keys(state.cartList).forEach((productId) => {
        const targetProduct = state.cartList[productId];

        if (targetProduct.checked) {
            delete state.cartList[productId];
            state.quantity -= targetProduct.quantity;
            state.total -= targetProduct.price * targetProduct.quantity;
        }
    });
    localStorage.setItem('cart', JSON.stringify(state.cartList));
};

const requestProductInfo = async () => {
    const res = await fetch(`/api/products/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productIds: Object.keys(state.cartList).map((id) => id),
        }),
    });
    return await res.json();
};

const createMap = (arr, key) => {
    return arr.reduce((prev, curr) => {
        prev[curr[key]] = curr;
        return prev;
    }, {});
};

const initState = async () => {
    const cartListFromLocalStorage = JSON.parse(localStorage.getItem('cart'));

    if (cartListFromLocalStorage) {
        state.cartList = cartListFromLocalStorage;
        const productInfo = await requestProductInfo();

        state.productInfo = createMap(productInfo, '_id');
        Object.keys(state.cartList).forEach((id) => {
            if (state.cartList[id].checked) {
                state.quantity += parseInt(state.cartList[id].quantity);
                state.total +=
                    state.cartList[id].quantity * state.cartList[id].price;
            }
        });
    }
};

export {
    state,
    selectProduct,
    selectAllProduct,
    updateQty,
    deleteProduct,
    deleteSelectedProduct,
    initState,
};
