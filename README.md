# 💻 김나은 | 풀스택 개발자 포트폴리오

> **"어제보다 더 발전하는 개발자"**  
> 풀스택 개발 역량을 쌓아가고 있는 개발자 김나은의 포트폴리오입니다.

## 🔍 미리보기

![히어로 이미지](images/readme.webp)

## 🚀 배포 링크

- **Live Demo :** [웹사이트 바로가기](https://naeun-k.github.io/resume2026/)
- **GitHub Repository :** [저장소 바로가기](https://github.com/Naeun-K/resume2026)

## ⚒️ 사용 기술 (Skills)

![Static Badge](https://img.shields.io/badge/HTML-43.6%25-orange)
![Static Badge](https://img.shields.io/badge/CSS-35.6%25-purple)
![Static Badge](https://img.shields.io/badge/JavaScript-20.8%25-yellow)

## 📁 디렉토리 구조

```text
resume2026/
├── dist/
│   ├── bundle.js
│   └── style.css
│
├── images/
│   ├── 2nd-main.webp
│   ├── 2nd-tech.webp
│   ├── 3rd-main.webp
│   ├── 3rd-tech-1.webp
│   ├── 3rd-tech-2.webp
│   ├── desktop-hero.webp
│   ├── mbti.webp
│   ├── mobile-hero.webp
│   ├── profile.webp
│   ├── python-gan.webp
│   ├── python-pandas.webp
│   ├── readme.webp
│   └── tech-smart.webp
│
├── node_modules/
│
├── public/
│   └── favicon.svg
│
├── scripts/
│   ├── accordion.js
│   ├── contact.js
│   ├── graph.js
│   ├── main.js
│   ├── smoothScrollTo.js
│   └── typing.js
│
├── styles/
│   ├── reset.css
│   └── style.css
│
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── webpack.config.js
```

## ⚙️ 주요 기능 (Implementation Details)

- 히어로
  - 백그라운드 이미지 삽입으로 히어로를 눈에 띄게 제작
  - 타이틀 텍스트가 잘 보일 수 있도록 text-shadow 활용

- 기본 프로필(About)
  - 주요 문구에 타이핑 애니메이션 적용
  - svg와 webp를 아이콘으로 활용
  - AI 이미지 활용

- 스킬 표시 막대그래프(Skills)
  - 보유 스킬 그래프화
  - 그래프가 해당 기술의 percent만큼 증가하는 애니메이션 추가
  - 그래프 값을 그래프 내부 우측에 작성 -> 사용자 직관성 높임

- 프로젝트(Projects)
  - 프론트엔드 작업물은 해당 사이트와 링크 연결
  - 다양한 프로젝트를 grid와 flexbox로 정렬
  - 각 프로젝트에 활용한 기술은 webp이미지(AI이미지)로 시각화

- 상 및 자격증(Awards & Licenses)
  - 줄 바꿈으로 글자깨짐 부분 처리(flexbox활용)

- 연락(Contact)
  - Formspree를 이용해 서버 없이 Form을 통한 연락보내기 설정 -> 이메일로 답변 받음
  - 빈칸일 경우 안내메세지 / 전송 완료 혹은 미완 시 안내메세지

## ⚠️ 개발 시 주요 고려 사항 (Technical Considerations)

1. 반응형 디자인
   - 히어로가 미디어쿼리 사이즈 변화에 따라 변경
     - 데스크톱 사이즈(1024px ~) : 글자색 - #1b3022, 그림자 - rgba(255, 255, 255, 0.8)
     - 태블릿 사이즈(768px ~) : 글자색 - #f9f9f9, 그림자 - rgba(0, 0, 0, 0.7)
     - 모바일 사이즈(320px ~) : 그림자 제거, 백그라운드 이미지(세로로 긴 이미지) 변경, 버튼 내 텍스트 제거
   - 프로필 파트 변화
     - 모바일 사이즈(320px ~) : 이미지 제거, 애니메이션 제거
   - 프로젝트 파트 변화
     - 데스크톱 사이즈(1024px ~) : grid 사용

     ```
     grid-template-columns: repeat(2, 1fr);
     ```

     - 태블릿 사이즈(768px ~), 모바일 사이즈(320px ~) : flexbox 활용

   - 상 및 자격증 파트와 연락 파트 묶음 부분 변화
     - 데스크톱 사이즈(1024px ~), 태블릿 사이즈(768px ~) : flexbox 활용
     - 모바일 사이즈(320px ~) : flexbox 활용(flex-direction column으로 변경)

2. 웹 표준 및 웹 접근성, SEO, 렌더링 측면 확인
   - svg만 사용한 아이콘일 경우 텍스트를 모두 sr-only클래스로 묶어 overflow : hidden을 적용

   - form에 focus ring 추가
   - style.css에 prefers-reduced-motion: reduce 시 애니메이션 적용 해제 추가
   - cdn.jsdelivr.net와 images.unsplash.com에 대한 preconnect 추가
   - 헤더 내 탐색을 `<nav>`로 감싸 접근성 개선
   - GitHub 외부 링크에 rel="noopener noreferrer" 추가
   - form에 aria-label 추가

   - 모든 인라인 SVG에 aria-hidden="true" 및 focusable="false" 추가
   - 화살표 스크롤 버튼에 aria-label 추가

3. 애니메이션 효과

- smoothScroll 애니메이션
  : a태그 클릭하여 이동 시 부드럽게 움직일 수 있게 하는 애니메이션

- graph 상승 애니메이션
  : 현재 창에 기술테크 그래프가 나오면 그래프가 상승하며 그래프값을 보여주는 애니메이션

- typing 애니메이션 & caret 애니메이션
  - text.slice()와 인덱스를 이용해 출력할 문자열의 범위를 변경
  - setTimeout()으로 입력·삭제 속도와 대기 시간을 제어
  - isDeleting 상태를 기준으로 입력과 삭제 동작을 전환하여 타이핑 효과가 지속적으로 반복되도록 구현

## 💡 트러블슈팅 (Troubleshooting)

### 1. 발생한 에러

모바일 화면시 화면 깨짐 : 모바일 화면시 메인 클래스 화면이 왼쪽으로 치우쳐지면서 깨지는 현상 발생

#### 문제원인

확인 결과 애니메이션 특성 상 줄바꿈 불가로 메인클래스의 자식태그가 커지는 현상이 원인

#### 문제해결

모바일 화면 시 즐바꿈 가능하게 변경

### 2. 발생한 에러

모바일 화면시 CLS 발생 : 타이핑 효과 애니메이션의 줄바꿈이 4줄이상이었다가 2줄로 줄어드는 등의 모습을 보이며 전체적인 CLS 발생

#### 문제원인

JS가 실제 텍스트를 한 글자씩 추가하면서 여러 줄로 바뀌는 순간 strong 태그 자체의 실제 높이가 변형되는 부분이 원인

#### 문제해결

모바일 너비 320px일 때를 기준, 문장이 두 줄이 되므로 height를 2줄만큼 영역을 미리 주어 cls 발생 원인 제거

### 3. 발생한 에러

- mailto: 방식을 사용할 때 원하는 메일앱으로 자유롭게 연결이 어려움
- mailto: 폼 제출 방식으로 인해 브라우저가 경고하는 사항 발생

#### 문제원인

- mailto: 방식의 고질적인 문제가 존재

1. mailto: 는 외부의 메일앱과 링크를 연결하는 역할을 수행 -> 사용자가 미리 자신에게 맞는 메일앱을 설정해두지 않으면 실행 시 어려움을 느낄 수 있음
2. . mailto: 는 외부의 메일앱과 링크를 연결하는 역할을 수행 -> 브라우저 입장에서는 사용자가 입력한 데이터를 외부 프로그램으로 전달하려는 것이기 때문에 경고나 확인창이 나타날 수 있음

#### 문제해결

- Formspree 폼서비스 적용

1. 구현 방식이 아주 간단하고 무료로 사용 가능
2. 웹서비스 안에서만 문의를 정리할 수 있어 사용성이 훨씬 좋아짐
3. 일반적인 HTTPS 통신을 사용하는 서비스이므로 브라우저의 경고나 확인창 등이 사라짐
