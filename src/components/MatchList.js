import * as React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import All from './MatchList_All';
import Planned from './MatchList_Planned';
import End from './MatchList_End';
import Swal from 'sweetalert2';
import '../css/MatchListBtn.css';

function MatchList() {
  const selectContent = {All : <All />, Planned : <Planned />, End : <End />,};
  const [content, setContent] = useState("All");
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
  const [isHover3, setIsHover3] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { //로그인 유무 확인
      const access_token = JSON.parse(localStorage.getItem('access_token'));
      axios.get('http://110.165.17.35:8080/api/user/me', {
          headers:  { 
            Authorization: `Bearer ${access_token}`
          }}).catch((error)=>{
        console.error("서버에서 사용자 정보를 불러오지 못했습니다.", error);
        Swal.fire({
          icon: 'error',
          title: '로그인 필요',
          html: '로그인이 필요한 기능입니다.'
        });
        navigate('/Login'); // 오류 발생 시 홈 페이지로 이동
      })
  }, []);

  const onClick = (event) => {
    setContent(event.target.name);
  };
  function Btn({classname, name, width="100px", title}){
    return(
      <div style={{height:"100%", width:"100%"}}>
        {(content===name) && <div style={{width:"100%", height:"2px", backgroundColor:"rgba(0,0,0,0.4"}}></div>}
        <button 
        onClick={onClick}
        id={(content===name)? "click" : ""}
        className={classname}
        name={name}
        style={{height:"100%", width, backgroundColor:"white",
              border:"none", fontSize:"14px", fontWeight:"bold",cursor:"pointer"}}>
                {title}
        </button>
      </div>
    );
  }
  return (
    <React.Fragment>
      <Container maxWidth="sm"> 
      <Box sx={{ height: '20px' }} />
      <Box sx={{ height: '100vh'}}>
        <h2 style={{
            fontSize:"20px",
            fontWeight:"bold",
            boxSizing:"border-box",
            margin:"0px 0  20px 12px",
            padding:"10px 0",
            width:"88%", 
            color:"#282828",}}>내 경기 목록</h2>
        <section style={{boxSizing:"border-box", margin:"0 15px",}}>
          <div 
          style={{position:"relative", display:"flex", alignItems:"flex-start", width:"100%", height:"45px", 
          border:"none",borderTopStyle:"solid",borderTopWidth:"0.5px", borderTopColor:"rgba(0,0,0,0.12)", backgroundColor:"white"}}>
            <div onMouseEnter={()=>setIsHover1(true)} onMouseLeave={()=>setIsHover1(false)} style={{height:"75%"}}>
              <Btn classname={isHover1 ? "hover": "normal"} name="All" width="60px" title="전체"></Btn></div>
            <div onMouseEnter={()=>setIsHover2(true)} onMouseLeave={()=>setIsHover2(false)} style={{height:"75%"}}>
              <Btn classname={isHover2 ? "hover": "normal"} name="Planned" title="예정된 경기"></Btn>
            </div>
            <div onMouseEnter={()=>setIsHover3(true)} onMouseLeave={()=>setIsHover3(false)} style={{height:"75%"}}>
              <Btn classname={isHover3 ? "hover": "normal"} name="End" title="종료된 경기"></Btn>
            </div>
          </div>
          {content && <div style={{marginTop:"30px"}}>{selectContent[content]}</div>}
        <div style={{height:"80px"}}></div>
        </section>
      </Box>
      <Box sx={{ height: '20px' }} />

      </Container>
    </React.Fragment>
  );
}

export default MatchList;
