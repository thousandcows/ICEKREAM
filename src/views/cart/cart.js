import Product from "./product.js";

// 테스트 케이스
(function testCart() {
  localStorage.setItem(
    "cart",
    JSON.stringify({
      1: { name: "apple", price: 1000, checked: true },
      2: { name: "orange", price: 2000, checked: false },
      3: { name: "banana", price: 3000, checked: true },
      4: { name: "apple", price: 1000, checked: false },
      5: { name: "orange", price: 2000, checked: true },
      6: { name: "banana", price: 3000, checked: true },
      7: { name: "apple", price: 1000, checked: true },
      8: { name: "orange", price: 2000, checked: false },
      9: { name: "banana", price: 3000, checked: true },
    })
  );
})();

const productContainer = document.querySelector(".cart");
const selectAllBtn = document.getElementById("select-all-product");

selectAllBtn.addEventListener("input", () => {
  const selectBtns = document.querySelectorAll(".select-btn");
  if (selectAllBtn.checked) {
    selectBtns.forEach((selectBtn) => {
      !selectBtn.checked && selectBtn.click();
    });
  } else {
    selectBtns.forEach((selectBtn) => {
      selectBtn.checked && selectBtn.click();
    });
  }
});

// id에 해당되는 실제 데이터 요청 필요
const initialCart = () => JSON.parse(localStorage.getItem("cart"));

const render = (products) => {
  Object.entries(products).forEach(([key, value]) => {
    const product = new Product(key, value);
    productContainer.appendChild(product.template());
  });
};

render(initialCart());
