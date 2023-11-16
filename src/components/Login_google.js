import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from 'react-router';


export function Login_google(){    
    const navigate = useNavigate();
    const google=useGoogleLogin({
        redirectUri : 'http://localhost:3000/',
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
             try{
                const data = await axios.post("http://115.85.182.229:8080/api/auth/sign-in/google",{token : tokenResponse.access_token});
                localStorage.setItem('access_token', data.access_token);
             } catch (error) {
                console.error('Error in server logic:', error);
             }            
            
          const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
          );
      
          console.log(userInfo);
          navigate('/Home');
        },
        onError: errorResponse => console.log(errorResponse),
    });
      return(
        <img className="logo_socialLogin" src={require("../images/google_logo_img.png")} alt="google" 
                onClick={google} style={{cursor:"pointer"}}/>
      );


}