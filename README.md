<설치가 필요한 라이브러리>

react-router-dom <br>
axios <br>
styled-components <br>
sweetalert2 <br>
date-fns <br>
FontAwesome <br>
MUI <br>
Swiper<br>
Dayjs<br>

<라이브러리 설치 코드>

npm install react-router-dom <br>
npm install axios <br>
npm install styled-components <br>
npm install sweetalert2 <br>
npm install date-fns <br>
npm install @mui/icons-material <br>
npm install @mui/material @emotion/react @emotion/styled <br>
npm install swiper<br>
npm install dayjs<br>

<페이지별 기능 설명>


메인 페이지 : -배너 : 배너에서 축구 관련 대회정보를 확인할 수 있다. <br> - 생성된 경기 확인 : 날짜 슬라이더를 이용하여 날짜별 생성된 경기를 확인할 수 있다. 최신순/과거순의 정렬 기능과 제목 검색 기능은 사용자가 부가적으로 선택할 수 있다.
로그인 : 소셜 계정(구글/네이버/카카오)을 이용하여 로그인할 수 있는 기능이다.
인원 모집글 작성 : 제목 / 최대 참여 인원수 / 경기날짜 및 시간 / 경기장소 / 상세내역을 입력하여 경기글을 작성할 수 있는 기능이다.
내 경기목록 확인 : 사용자가 자신이 참여한 경기목록들을 확인할 수 있는 페이지이다. 예정된 경기에서는 경기가 시작되지 않는 경기로 인원이 모집중인 예정경기와 인원이 모두 확정된 확정경기를 종료된 경기에서는 경기가 시작된 경기들로 결과 미확정, 승리, 패배, 무승부 경기를 확인할 수 있다. 전체 경기는 이 모든 경기가 포함되며 사용자는 배너에서 자신이 원하는 경기 목록을 선택하여 확인할 수 있다.
내 주변 경기장 : 사용자 위치를 중심으로 10Km 내에 위치한 경기장을 표시하여 사용자에게 경기장 정보를 제공하는 페이지이다. 
공지사항 : 웹 사이트 이용과 관련된 공지 내역을 확인할 수 있는 기능이다.
안전정보 : 경기 간 발생할 수 있는 안전사고를 예방하고 알려주기 위한 기능이다.
알림 : 참가 신청한 경기가 확정되었거나 경기 결과가 확정되었을 때, 경기 하루 전날 사용자에게 알림을 전달해 주는 기능이다.
