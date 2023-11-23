import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from 'react-router';


export function Login_google() {
  const navigate = useNavigate();
  const google = useGoogleLogin({
    redirectUri: 'http://www.sportspie.xyz/Home',
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      axios({
        method: 'post',
        url: 'http://110.165.17.35:8080/api/auth/sign-in/google',
        data: {
          token: codeResponse.code,
        },
      })
        .then((result) => {
          console.log('요청 성공');
          console.log(result);

          const google = result.data['token'];
          console.log(google);
          
          const googletoken = axios.post('http://110.165.17.35:8080/api/auth/sign-in/google', { token: google });
          localStorage.setItem("access_token", JSON.stringify(googletoken.data['access_token']));
        })
        .catch((error) => {
          console.log('요청 실패');
          console.log(error);
        })
      //const data = await axios.post("http://115.85.182.229:8080/api/auth/sign-in/google",{token : tokenResponse.access_token});
      //localStorage.setItem('access_token', data.access_token);         

      /*const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );
      console.log(userInfo);*/
      navigate('/Home');
    },
    onError: errorResponse => console.log(errorResponse),
  });
  return (
    <img className="logo_socialLogin" src={require("../images/google_logo_img.png")} alt="google"
      onClick={google} style={{ cursor: "pointer" }} />
  );


}