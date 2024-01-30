# Base server boilerplate with DB (Redis, typeORM)

## ❓왜 만들게 되었나?

초기 구축마다 똑같은 구조와 라이브러리로 반복 작업을 하는 것이 지겨웠어요.<br/>
저만의 보일러플레이트를 만들어 단순 작업을 줄이기 위해 만들었어요. :)
Redis와 typeORM(mysql 기반)을 추가하여 DB도 함께 사용이 가능합니다.

## ⚒기술 스택

<img src="https://img.shields.io/badge/NPM-yellow?style=flat&logo=npm&logoColor=white"/> <img src="https://img.shields.io/badge/Typescript-blue?style=flat&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Express-green?style=flat&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Nodemon-yellow?style=flat&logo=nodemon&logoColor=white"/> <img src="https://img.shields.io/badge/Jest-orange?style=flat&logo=jest&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-purple?style=flat&logo=prettier&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-orange?style=flat&logo=eslint&logoColor=white"/>
<br/>
<img src="https://img.shields.io/badge/Redis-red?style=flat&logo=redis&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-blue?style=flat&logo=mysql&logoColor=white"/>

## 😯어떻게 쓰나요?

### 설치 및 설정하기

```bash
# 로컬로 다운받기
$ git clone https://github.com/gingaminga/server-boilerplate-with-db.git

# 다운받은 경로로 이동
$ cd server-boilerplate-with-db

# 라이브러리 설치
$ npm install
```

**끝입니다!**

### 사용하기

아래 명령어들로 프로젝트를 사용할 수 있어요.

```bash
# 개발 모드 실행
$ npm run dev

# transpiling
$ npm run build

# 단발성 테스트
$ npm run test

# 개발 모드 테스트
$ npm run test:dev

# 테스트 캐시 삭제
$ npm run test:clean

# 린트 처리
$ npm run eslint

# 자동 코드 포맷팅
$ npm run prettier
```

> 자세한 내용은 [package.json](https://github.com/gingaminga/server-boilerplate-with-db/blob/develop/package.json)의 `script`를 확인하세요. :)

### .env 설정

.env 파일이 없어도 문제없이 동작해요. <br/>
하지만 자주 변동이 생기는 값들은 따로 설정할 수 있도록 했어요. :)

```bash
# .env 파일 생성 및 작성하기
$ vi .env
```

> .env 구성에 관한 설명은 [.env.sample](https://github.com/gingaminga/server-boilerplate-with-db/blob/develop/.env.sample) 파일을 확인하세요 :)

만약 환경에 따라 다르게 하고 싶다면 `.env.development`, `.env.test`, `.env.production`로 분리해서 사용하세요. <br/>
**위 세개의 파일이 없다면 .env 파일을 참조해요.**

## 📁폴더 및 파일 설명

- `src`
  - `__tests__` : 테스트 폴더
    - `integration` : 통합 테스트 폴더
    - `unit` : 단위 테스트 폴더
  - `config` : 설정 관련 폴더
  - `controllers` : 컨트롤러로 구성된 폴더로, 기능 단위로 하위 폴더 구분
  - `db` : DB 관리 폴더
  - `dto` : class로 만든 DTO 폴더
  - `loaders` : 로더 폴더
  - `middlewares` : 공통 미들웨어 폴더
  - `routes` : API 라우터를 관리하는 폴더
  - `services` : 기능 단위 서비스 폴더
  - `types` : 프로젝트에서 사용하는 타입 관리 폴더
  - `utils` : 각종 유틸 관리 폴더
  - `validators` : 유효성 검사를 위한 폴더
  - `app.ts` : express 설정 root 파일
  - `index.ts` : 프로젝트의 root 파일
- `.env.sample` : .env 파일 설명 및 예시
