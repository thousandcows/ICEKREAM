import Product from './product.js';

<<<<<<< HEAD
const testCase = [
    { id: 1, name: 'apple', price: 1000 },
    { id: 2, name: 'banana', price: 2000 },
    { id: 3, name: 'apple', price: 1000 },
    { id: 4, name: 'banana', price: 2000 },
    { id: 5, name: 'apple', price: 1000 },
    { id: 6, name: 'banana', price: 2000 },
    { id: 7, name: 'apple', price: 1000 },
    { id: 8, name: 'banana', price: 2000 },
    { id: 9, name: 'apple', price: 1000 },
    { id: 10, name: 'banana', price: 2000 },
    { id: 11, name: 'apple', price: 1000 },
    { id: 12, name: 'banana', price: 2000 },
    { id: 13, name: 'apple', price: 1000 },
    { id: 14, name: 'banana', price: 2000 },
    { id: 15, name: 'apple', price: 1000 },
    { id: 16, name: 'banana', price: 2000 },
];
=======
import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';
import { navTransition } from '../navTransition/navTransition.js';
>>>>>>> 363aa21aca8120b2410190aef51e78b455d3b6d8

const ref = {
    productContainer: document.getElementById('product-container'),
};

<<<<<<< HEAD
const option = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    thredhold: 1,
};

const render = (target, products) => {
    products.forEach((product, i) => {
        const productUI = new Product(product);
        const productHTML = productUI.template();
        if (i === 15) {
            // 새로운 관찰자 지정
            const observer = new IntersectionObserver((entries, observer) => {
                if (entries[0].isIntersecting) {
                    observer.unobserve(entries[0].target);
                    getData();
                }
            }, option);
            observer.observe(productHTML);
        }
        target.appendChild(productHTML);
    });
};

const getData = () => {
    const newData = [...testCase];
    render(ref.productContainer, newData);
};

getData();
=======
navTransition('home');




// 요소(element), input 혹은 상수
const landingDiv = document.querySelector('#landingDiv');
const greetingDiv = document.querySelector('#greetingDiv');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertTextToLanding();
  insertTextToGreeting();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  landingDiv.addEventListener('click', alertLandingText);
  greetingDiv.addEventListener('click', alertGreetingText);
}

function insertTextToLanding() {
  landingDiv.insertAdjacentHTML(
    'beforeend',
    `
      <h2>n팀 쇼핑몰의 랜딩 페이지입니다. 자바스크립트 파일에서 삽입되었습니다.</h2>
    `,
  );
}

function insertTextToGreeting() {
  greetingDiv.insertAdjacentHTML(
    'beforeend',
    `
      <h1>반갑습니다! 자바스크립트 파일에서 삽입되었습니다.</h1>
    `,
  );
}

function alertLandingText() {
  alert('n팀 쇼핑몰입니다. 안녕하세요.');
}

function alertGreetingText() {
  alert('n팀 쇼핑몰에 오신 것을 환영합니다');
}

async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const data = await Api.get('/api/user/data');
  const random = randomId();

  console.log({ data });
  console.log({ random });
}
>>>>>>> 363aa21aca8120b2410190aef51e78b455d3b6d8
