<추가적으로 설치가 필요한 라이브러리> 

npm install styled-components     // CSS-in-JS 라이브러리 <br>
npm install sweetalert2    // alert 디자인 라이브러리 <br>
npm install swiper  // 이미지 슬라이더 라이브러리 <br>

<주요 변경사항>

컨테이너 기본 구조 수정 <br>

<미구현 사항>

각 페이지별 로그인 및 사용자인증 처리 기능(마이프로필 페이지는 완성)  <br> 

<꼭 읽어주세요>

하단 네비바의 페이지 이동링크를 바꾸고싶을 시 App.js의 라우트 태그안에 이동할 페이지를 추가한 뒤 NavBar.js 페이지에서 경로를 수정해주시면 됩니다. <br>
Alert 라이브러리의 비정상 작동으로 인해 reset.css는 App.js에서 제거하였습니다. 만약 reset.css를 사용해야한다면 임시방편으로 자신이 만든 각각의 페이지에 개별적으로 적용해주세요.

