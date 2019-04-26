# Vanilla World News Aggregator
[News API](https://newsapi.org)를 이용해 세계 여러 뉴스 기사를 제공하는 웹 어플리케이션입니다.

<p align="center">
 <img src="vanilla-news.gif">
</p>

## Setup

Install dependencies

```sh
 npm install
```

## Development

```sh
 npm start
 visit http://localhost:3000
```

## Features

- `Firebase`를 통해 Google 로그인을 할 수 있습니다.
- 로그인한 사용자만 검색어를 입력할 수 있습니다.
- 사용자는 검색을 원하는 날짜를 설정할 수 있습니다. (예: 2018년 2월 1일 - 2018년 2월 5일 뉴스 검색)
- 검색을 원하는 소스를 선택할 수 있어야 합니다. (다중 선택 가능, 최대 20개)
  - 검색 소스는 [News API Source](https://newsapi.org/docs/endpoints/sources)를 통해 요청합니다.
- 검색 결과는 [News API Everything](https://newsapi.org/docs/endpoints/everything)을 통해 받아와 표시합니다.
- 검색 결과가 로딩 중인 상태를 표시합니다.
- 검색 결과는 항상 "인기" 순으로 정렬되어있습니다.
- 첫 검색 결과는 30개를 보여줍니다.
- 검색 결과 화면 아래로 스크롤을 내릴 경우, 계속하여 30개씩 추가하여 보여줍니다.
- 사용자는 검색 결과를 "리스트" 형식 혹은 "카드" 형식으로 선택하여 볼 수 있습니다.
- "리스트" 형식의 각 검색 결과는 다음 정보를 보여주어야 합니다.
  - [ ] 검색 소스 이름
  - [ ] 뉴스 작성자
  - [ ] 뉴스 제목
  - [ ] 뉴스 작성일
- "카드" 형식의 각 검색 결과는 다음 정보를 보여주어야 합니다.
  - [ ] 뉴스 이미지
  - [ ] 뉴스 작성자
  - [ ] 뉴스 제목
- 각 검색 결과를 클릭할 경우, Modal을 이용하여 다음과 같은 상세 정보를 보여줍니다.
  - [ ] 검색 소스 이름
  - [ ] 뉴스 작성자
  - [ ] 뉴스 제목
  - [ ] 뉴스 작성일
  - [ ] 뉴스 설명
  - [ ] 뉴스 내용
  - [ ] 뉴스 이미지
  - [ ] 뉴스 링크
- Modal 바깥 부분을 클릭할 경우, Modal이 사라집니다.

Tech
- React
- Firebase
