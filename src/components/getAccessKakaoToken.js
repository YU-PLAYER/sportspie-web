import axios from 'axios';
import qs from 'qs';

const REST_API_KEY= process.env.REACT_APP_CLIENT_KAKAO_ID;
const REACT_APP_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URL = encodeURIComponent(process.env.REACT_APP_NAVER_REDIRECT_URI);

export async function getAccessKakaoToken(authCode) {
    console.log('getAccessKakaoToken called with authCode:', authCode);
    try {
      const apiUrl = 'https://kauth.kakao.com/oauth2.0/token';
      const params = qs.stringify({
          grant_type: 'authorization_code',
          client_id: REST_API_KEY,
          client_secret: REACT_APP_CLIENT_SECRET,
          redirect_uri: REDIRECT_URL,
          code: authCode
      });

      const token_response = await axios.post(apiUrl, params);
      window.Kakao.init(REST_API_KEY);
      console.log('Token response:', token_response);
      const Kakaotoken = token_response.data['access_token'];
      console.log('Kakaotoken:', Kakaotoken);

      const response = await axios.post('http://115.85.182.229:8080/api/auth/sign-in/kakao', {token: Kakaotoken});

      localStorage.setItem('access_token', response.data['access_token']);
    } catch (error) {
        console.error('An error occurred:', error);
      }
};

export default getAccessKakaoToken;
