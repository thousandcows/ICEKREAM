import * as Api from '../api.js';

export default class State {
    constructor() {
        this.filter = 'top20';
        this.products = [];
    }

    // filter 바뀌면 스테이트 초기화
    async initializeState(filter) {
        this.products = await Api.get('url');
    }

    // state 추가 (무한스크롤)
    async setState(filter) {
        const newProducts = await Api.get('url');
        this.products = [...this.products, ...newProducts];
    }

    setFiter(filter) {
        this.filter = filter;
        initializeState(filter);
    }
}
