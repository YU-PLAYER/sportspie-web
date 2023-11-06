import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";


const GlobalStyles = createGlobalStyle`

 ${reset}
	// 아래에 전역 스타일을 추가
	a {
        text-decoration : none;
        color : inherit;
  }
	body {
            font-family: 'Open Sans', sans-serif;
	        font-size : 12px;
	        background-color : rgba(20,20,20,1);
	        color: #2e363e;
	        padding-top: 50px ;
	        overflow-x : hidden;
	}
	`;

export default GlobalStyles;