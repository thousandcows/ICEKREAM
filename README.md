# Shopping Mall Icekream

-   의류 상품을 고객에게 판매하는 온라인 쇼핑몰 서비스입니다.

## 서비스 구성 안내

## 1. 서비스 소개

**기술 스택**

-   **VanillaJS, CSS, HTML**
-   **MongoDB/mongoose**
-   **NodeJS/ExpressJS**
-   Joi data validation
-   font awesome icon
-   Daum 주소 api
-   passport-local/jwt/kakao
-   Bulma CSS

**소개**
인기 최신 의류 상품을 판매하는 쇼핑몰 Icekream입니다.

-   상품들이 홈페이지에 인기순으로 정렬됩니다.
-   신발, 상의, 모자 등 다양한 상품을 판매합니다.

## 2. 서비스 주요 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**
**사용자 관련 주요 기능**

-   회원 가입 후 로그인
-   카카오 소셜 로그인
-   로그 아웃
-   상품 메인 페이지에 카테고리별 상품 조회
    -   상품 조회시 무한 스크롤로 많은 개수의 상품 확인 가능
-   상품 클릭시 상품 상세 페이지 확인 가능
-   장바구니 기능

    -   바로 결제 페이지로 이동 가능
    -   원하는 상품만 체크하여 결제 가능

-   마이페이지 기능
    -   프로필 수정 -회원 탈퇴
    -   주문 조회
        -   주문 취소 가능
    -   주문 결제 페이지
        -   배송지 입력 시 주소 API 검색 기능

**관리자 관련 주요 기능**

-   관리자가 유저의 권한 변경
-   유저의 주문 조회, 취소
-   상품 조회 등록, 수정, 삭제
-   카테고리 등록, 수정, 삭제

## 3. 서비스 구성도

<!-- **서비스 구조도 그림 (사용한 기술 스택) ** -->

**프론트엔드**

-   와이어프레임으로 figma 사용- 정보:https://www.figma.com/file/WvXunzwTziYdEpK6RphZlm/%EC%9D%98%EB%A5%98-%EC%87%BC%ED%95%91%EB%AA%B0-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0%3A1
-   VanillaJS, CSS, HTML
-   font awesome 아이콘 활용 - 정보: https://fontawesome.com/
-   다음 주소 API 활용하여 주소 검색 기능 추가 - 정보: https://postcode.map.daum.net/guide
-   페이지 헤더 부분 Bulma css 활용 - 정보:https://bulma.io/

**백엔드**

-   ExpressJS로 web framework 구성- 정보: https://expressjs.com/
-   Draw.io로 ERD 작성 -https://drive.google.com/file/d/1tC4tLetg8BZMW5LNFUqOMNCFcdjhGFq0/view?usp=sharing
-   MongoDB의 MongoDB Atlas로 DB 사용 - 정보: https://www.mongodb.com/ko-kr
-   Mongoose를 활용하여 schema 설정과 index 설정 - 정보: https://mongoosejs.com/
-   JOI API로 data 검증 - 정보:https://joi.dev/api/
-   Passport를 활용하여 passport-local, passport-jwt, passport-kakao 로그인 구현 - 정보:https://www.passportjs.org/
-   Bcrypt 를 활용하여 user password 암호화 - 정보: https://www.npmjs.com/package/bcrypt
-   JsonWebToken과 passport-jwt로 stateless한 Restful한 서비스 구축 - 정보: https://www.npmjs.com/package/jsonwebtoken , http://www.passportjs.org/packages/passport-jwt/
-   OAuth 소셜 인증 시 카카오 developer 사이트 활용 - 정보:https://developers.kakao.com/
-   Postman으로 API test - 정보: https://www.postman.com/
-   Notion을 활용하여 API 문서 정리 - 정보: https://www.notion.so/API-123fb3ee1c0347d696797ab36d857a9d

**기타**

-   cors를 활용한 cors 에러 해결 - 정보: https://www.npmjs.com/package/cors
-   nodemon을 활용한 웹서버 실행 - 정보: https://www.npmjs.com/package/nodemon
-   dotenv를 활용한 환경 변수 설정 - 정보: https://www.npmjs.com/package/dotenv

## 4. 프로젝트 팀원 역할 분담

| 이름   | 담당 업무            |
| ------ | -------------------- |
| 김성은 | 팀장/프론트엔드 개발 |
| 권강훈 | 프론트엔드 개발      |
| 천현우 | 백엔드 개발          |
| 백성호 | 백엔드 개발          |

**멤버별 responsibility**

1. 김성은: 팀장/프론트엔드 담당

-   기획 단계: 구체적인 설계, 기능, 페이지 레이아웃등의 핵심 기획 부분 작성
-   개발 단계: 팀원간의 일정 등 조율 + 프론트 개발 (홈페이지, 장바구니 페이지, 상품 페이지 등)
-   수정 단계: 무한 스크롤 기능 구현, 메인 페이지 레이아웃 수정,코치님 피드백 반영해서 수정 등

2. 권강훈: 프론트엔드 담당

-   기획 단계: 프론트 업무 배분 계획, 구체적인 사이트 동작 기능 설계 아이디어 제시
-   개발 단계: 프론트 개발 (주문 페이지, 로그인 페이지, 회원 가입 페이지, 관리자 페이지, 헤더 등)
-   수정 단계: 피드백 반영해서 수정, 주문 페이지 등 다양한 기능 수정, 주소 api 추가 등

3. 천현우: 백엔드 담당

-   기획 단계: 와이어 프레임을 바탕으로 구체적인 API 설계 계획 작성, 업무 계획 로드맵 작성, Team notion 페이지 작성
-   개발 단계: 데이터 베이스 스키마 (상품, 카테고리) 작성, 데이터 모델/서비스 작성, 각종 상품/카테고리 관련 API 작성
-   수정 단계: 피드벡을 바탕으로 코드 수정, 팀 발표 준비, 카테고리/상품 api 수정 등

4. 백성호: 백엔드 담당

-   기획 단계: 와이어 프레임을 바탕으로 구체적인 ERD 작성, 구체적인 API 설계 계획 작성
-   개발 단계: 데이터 베이스 스키마 작성(유저, 주문), 데이터 모델/서비스 작성, 각종 유저 관련 API 작성, passport로 인증 방식 변경
-   수정 단계: 피드벡을 바탕으로 코드 수정, joi data validation 기능 추가, 카카오 소셜 로그인 추가, 페이지 레이아웃/디자인 수정

**협업 방법**

-   GitLab 활용- 정보:https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project/team18/shopping-mall/
-   코드 정리로 eslint와 prettier 사용- 정보:https://eslint.org/, https://prettier.io/
-   Notion으로 Team Page 정리/공유 - 정보:https://www.notion.so/IceKream-Shopping-Mall-f0003ed683fe43bd8d9caf296c1408c2

## 5. 실행 방법

-   백엔드:
    ```bash
    1. mongodb 실행 (.env 작성시 올바른 형태의 mongodb url인지 확인, kakao developer 계정의 올바른 client ID 설정)
    2. npm start
    3. http://localhost:5000/ 접속/실행 여부 확인
    4. 각종 API를 postman으로 확인
    (Postman 사용 시 로그인을 통하여 jwt 토큰 확인 후, http header에 Authorization부분에 Bearer {jwt token}, body에 알맞은 형식의 정보를 json 형태로 전달)
    5. Postman 결과 값 확인
    6. Mongo Atlas에 접속하여 DB와 API의 정상 동작 여부 확인
    ```

## 6. 버전

-   1.0.0

## 7. FAQ

**자주 받는 질문 정리**

-   이 서비스는 어떻게 실행하면 되나요?
    -   git clone을 하신 후 .env의 변수 {PORT, MONGODB_URL, JWT_SECRET_KEY,KAKAO_CLIENT_ID}를 올바른 값으로 설정한 후 5번의 실행 방법을 따르면 됩니다.
-   카카오 로그인에 에러가 있는 것 같은데 어떻게 해야 하나요?
    -   shopping-mall>src>services>passport.js의 kakaoConfig 의 callback url을 올바르게 바꾸면 정상 실행됩니다.
-   카카오 로그인 시 프로필 변경할 때 입력해야할 비밀 번호를 모르겠어요.
    -   카카오 로그인 기능을 마지막에 추가하여, 일반유저/카카오 유저의 분리가 완벽하지 않은 점 사과드립니다. kakaoPassword를 비밀번호로 입력하면 정보 수정이 가능합니다.
-   결제할 때 결제 수단이 없는 것 같은데 정상인가요?
    -   이번 프로젝트는 시간, 검증이 오래 걸리는 결제 부분을 제외하고 만들어진 프로젝트여서 결제 수단이 없는 것이 정상입니다.
-   장바구니의 물건이 로그아웃이 되어도 그대로 남아있는데 정상인가요?
    -   장바구니는 localStorage를 활용하여 만들어서 로그인 하여도 물건이 남아있는 것이 정상입니다.
