import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import '../css/Login.css';
import axios from 'axios';
export default function LoginContainer() {

    const clientId = '1Lo9Dc4AHo54vgDPegQ2';
    const clientSecret = 'LAu_vuy6ej';
    const redirectURI = encodeURIComponent('http://localhost:3000');
    const state = 'RANDOM_STATE';

    const NaverLogin = () => {
        const apiUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&state=${state}`;
        window.location.href = apiUrl;
    }

    const getAccessNaverToken = async (authCode) => {
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
        const token = token_response.data.access_token;
        console.log(token)

        const response = await axios.post('http://115.85.182.229:8080/api/auth/sign-in/naver', {
            token: token
        });

        localStorage.setItem('access_token', response.data.access_token);
    };

    React.useEffect(() => {
        const url = new URL(window.location.href);
        const authCode = url.searchParams.get('code');

        if (authCode) {
            getAccessNaverToken(authCode);
        }
    }, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
      <Box sx={{ height: '50px' }} />
        <Box sx={{ height: '600px', borderRadius: 5, boxShadow: 3 , display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <img className="logo_loginpage" src={require("../images/Sportify_Logo.png")}
          style={{width:"75px", height:"75px", margin:"20px 0"}}/>
            <div style={{display:"flex", flexDirection:"row", marginBottom:"10px"}}>
            <a style={{color:"#FF9300", fontSize: 16, fontWeight:"bolder"}}>SportyPie</a><a style={{fontSize: 16}}>를 이용하시려면</a><br/>
            </div>
            <a style={{fontSize: 16}}>로그인해 주세요.</a> 
            <Box sx={{ height: '130px' } } />
            <Container maxWidth="sm" sx={{textAlign:"center"}}>
            <a style={{color:"#7f7f7f", fontSize: 11}}>소셜 계정으로 로그인</a>
            <Box sx={{ height: '30px' }} />
            <Box sx={{ height: '30px'}}>
            <Grid container spacing={2} sx={{
              alignItems: 'center', display: 'flex', justifyContent: 'center'
            }}>
            
            <img className="logo_socialLogin" src={require("../images/naver_logo_img.png")} onClick={NaverLogin}/>
            <img className="blank" src={require("../images/invisible.png")}/>
            <img className="logo_socialLogin" src={require("../images/kakao_logo_img.png")} onClick={null}/>
            <img className="blank" src={require("../images/invisible.png")}/>
            <img className="logo_socialLogin" src={require("../images/google_logo_img.png")} onClick={null}/>
            </Grid>   
            </Box>
            </Container>
            <Container maxWidth="sm" sx={{textAlign:"center"}}>
              <Box sx={{ height: '20px' }} />
              <Button sx={{ height: '45px', width: '300px', borderRadius: 1, boxShadow: 1 }} onClick={null}>
                <Box sx={{ height: '13px' }} />
                <a style={{color:"#585858", fontSize: 13, fontWeight: 600}}>다른 방법으로 로그인</a>
              </Button>
            </Container>
        </Box>
        <Box sx={{ height: '20px' }}/>
      </Container>
    </React.Fragment>
  );
}