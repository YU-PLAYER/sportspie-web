import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

export const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
export const clientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET;
export const redirectURI = encodeURIComponent(process.env.REACT_APP_NAVER_REDIRECT_URI);
export const state = 'RANDOM';

export async function getAccessNaverToken(authCode) {
    console.log('getAccessNaverToken called with authCode:', authCode);
    try {
      const apiUrl = 'https://nid.naver.com/oauth2.0/token';
      const params = {
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectURI,
          code: authCode,
          state: state,
      };

      const token_response = await axios.get(apiUrl, { params: params });
      console.log('Token response:', token_response);
      const Navertoken = token_response.data['access_token'];
      console.log('Navertoken:', Navertoken);

      const response = await axios.post('http://115.85.182.229:8080/api/auth/sign-in/naver', {token: Navertoken});

      localStorage.setItem('access_token', response.data['access_token']);
    } catch (error) {
        console.error('An error occurred:', error);
      }
};
