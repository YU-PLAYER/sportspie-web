import axios from 'axios';

export const clientId = '1Lo9Dc4AHo54vgDPegQ2';
export const clientSecret = 'T8LLJOZjGQ';
export const redirectURI = encodeURIComponent('http://localhost:3000/Home');
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
      const Navertoken = token_response.data;
      console.log('Navertoken:', Navertoken);

      const response = await axios.post('http://115.85.182.229:8080/api/auth/sign-in/naver', {token: Navertoken});

      localStorage.setItem('access_token', response.data);
    } catch (error) {
        console.error('An error occurred:', error);
      }
};
