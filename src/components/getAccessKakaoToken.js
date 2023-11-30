import axios from 'axios';
import qs from 'qs';

const REST_API_KEY = process.env.REACT_APP_CLIENT_KAKAO_ID;
const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = encodeURIComponent(process.env.REACT_APP_NAVER_REDIRECT_URI);

export async function getAccessKakaoToken(authCode) {
  console.log('getAccessKakaoToken called with authCode:', authCode);
  try {
    const token_response = await axios.post(`http://110.165.17.35:8080/api/auth/sign-in/kakao/token?code=${authCode}`);
    console.log('Token response:', token_response);
    const KakaoToken = token_response.data['token'];
    console.log('KakaoToken:', KakaoToken);
    
    const response = await axios.post('http://110.165.17.35:8080/api/auth/sign-in/kakao', { token: KakaoToken });

    localStorage.setItem('access_token', JSON.stringify(response.data['access_token']));
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default getAccessKakaoToken;
