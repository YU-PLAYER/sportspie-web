import * as React from 'react';
import '../style.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

export default function LoginContainer() {
  return (
    <React.Fragment>
      <ArrowBackIcon></ArrowBackIcon>
      <Box sx={{ height: '20px' }} />
      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '550px', borderRadius: 5, boxShadow: 3 }}>
        <Box sx={{ height: '20px' }} />
        <img className="logo_loginpage" src={require("../images/Sportify_Logo.png")}/>
          <Box sx={{ height: '20px' }} />
          <a style={{color:"#FF9300", fontSize: 16}}>SportyPie</a><a style={{fontSize: 16}}>를 이용하시려면</a><br/>
          <a style={{fontSize: 16}}>로그인해 주세요.</a> 
          <Box sx={{ height: '220px' }} />
          
          <Container maxWidth="sm">
          <a style={{color:"#7f7f7f", fontSize: 10}}>소셜 계정으로 로그인</a>
          <Box sx={{ height: '30px' }} />
          <Box sx={{ height: '30px'}}>
          <Grid container spacing={2} sx={{
            alignItems: 'center', display: 'flex', justifyContent: 'center'
          }}>
          
          <img className="logo_socialLogin" src={require("../images/naver_logo_img.png")} onClick={null}/>
          <img className="blank" src={require("../images/invisible.png")}/>
          <img className="logo_socialLogin" src={require("../images/kakao_logo_img.png")} onClick={null}/>
          <img className="blank" src={require("../images/invisible.png")}/>
          <img className="logo_socialLogin" src={require("../images/google_logo_img.png")} onClick={null}/>
          </Grid>   
          </Box>
          </Container>
          <Container maxWidth="sm">
            <Box sx={{ height: '20px' }} />
            <Button sx={{ height: '45px', width: '300px', borderRadius: 1, boxShadow: 1 }} onClick={null}>
              <Box sx={{ height: '13px' }} />

              <a style={{color:"#585858", fontSize: 12, fontWeight: 600}}>다른 방법으로 로그인</a>
            </Button>
          </Container>
          <Box sx={{ height: '20px' }} />
        </Box>
        <Box sx={{ height: '20px' }} />
      </Container>

      <Container>
        <Box sx={{ height: '20px' }} />
      </Container>
    </React.Fragment>
  );
}
