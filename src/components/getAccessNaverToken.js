import axios from 'axios';

export const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
export const clientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET;
export const redirectURI = encodeURIComponent(process.env.REACT_APP_NAVER_REDIRECT_URI);
export const state = 'NAVER';

export async function getAccessNaverToken(authCode) {
  console.log('getAccessNaverToken called with authCode:', authCode);
  try {
    const token_response = await axios.get(`http://110.165.17.35:8080/api/auth/sign-in/naver/token?code=${authCode}`);
    console.log('Token response:', token_response);
    const Navertoken = token_response.data['token'];
    console.log('Navertoken:', Navertoken);

    const response = await axios.post('http://110.165.17.35:8080/api/auth/sign-in/naver', { token: Navertoken });

    localStorage.setItem('access_token', response.data['access_token']);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
