import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from 'react-router';


export function Login_google() {
  const navigate = useNavigate();
  const google = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const googletoken = await axios.post('http://110.165.17.35:8080/api/auth/sign-in/google', { token: tokenResponse.access_token });
      console.log(googletoken);
      localStorage.setItem("access_token", JSON.stringify(googletoken.data['access_token']));
      const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );
      console.log(userInfo);
      localStorage.setItem("name", JSON.stringify(userInfo.data['name']));
      localStorage.setItem("email", JSON.stringify(userInfo.data['email']));
      localStorage.setItem("pictureURL", JSON.stringify(userInfo.data['picture']));
      const userInfoDB = await axios.get('http://110.165.17.35:8080/api/user/me',
        { headers: { Authorization: `Bearer ${googletoken.data['access_token']}` } },
      );
      console.log(userInfoDB);
      window.location.reload();
      navigate('/Home');
    },
    onError: errorResponse => console.log(errorResponse),
  });
  return (
    <img className="logo_socialLogin" src={require("../images/google_logo_img.png")} alt="google"
      onClick={google} style={{ cursor: "pointer" }} />
  );
}