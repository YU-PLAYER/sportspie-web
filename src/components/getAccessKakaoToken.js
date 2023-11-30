import axios from 'axios';
import qs from 'qs';

const REST_API_KEY = process.env.REACT_APP_CLIENT_KAKAO_ID;
const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;

export async function getAccessKakaoToken(authCode) {
  console.log('getAccessKakaoToken called with authCode:', authCode);
  try {
    const apiUrl = 'https://kauth.kakao.com/oauth/token';
    const body = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      client_secret: REACT_APP_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: authCode
    });

    const header = { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' };

    const token_response = await axios.post(apiUrl, body, header);
    window.Kakao.init(REST_API_KEY);
    console.log('Token response:', token_response);
    const Kakaotoken = token_response.data['access_token'];
    console.log('Kakaotoken:', Kakaotoken);

    const response = await axios.post('http://110.165.17.35:8080/api/auth/sign-in/kakao', { token: Kakaotoken });

    console.log(response);
    if (response.status != 200) { }
    else { // test
      localStorage.setItem('access_token', JSON.stringify(response.data['access_token']));
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export default getAccessKakaoToken;
