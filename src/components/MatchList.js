import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import All from './MatchList_All';
import Planned from './MatchList_Planned';
import End from './MatchList_End';
import '../css/MatchListBtn.css';

function MatchList() {
  const selectContent = {All : <All />, Planned : <Planned />, End : <End />,};
  const [content, setContent] = useState("All");
  const [isHover1, setIsHover1] = useState(false);
  const [isHover2, setIsHover2] = useState(false);
  const [isHover3, setIsHover3] = useState(false);
  const onClick = (event) => {
    setContent(event.target.name);
  };
  function Btn({classname, name, width="90px", title}){
    return(
      <button 
      onClick={onClick}
      id={(content===name)? "click" : ""}
      className={classname}
      name={name}
      style={{height:"100%", width, backgroundColor:"white",
            border:"none", borderTopColor:"rgba(0,0,0,0.2)", borderTopStyle:"solid", borderTopWidth:"1px", fontSize:"14px", fontWeight:"bold",cursor:"pointer"}}>
              {title}
      </button>
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
            padding:"20px 0",
            width:"88%", 
            color:"#282828",}}>내 경기 목록</h2>
        <section style={{boxSizing:"border-box",
            margin:"0 15px",}}>
          <div style={{display:"flex", alignItems:"center", width:"100%", height:"35px", 
          border:"none",borderTopStyle:"solid",borderTopWidth:"0.5px", borderTopColor:"rgba(0,0,0,0.12)"}}>
            <div onMouseEnter={()=>setIsHover1(true)} onMouseLeave={()=>setIsHover1(false)} style={{height:"100%"}}>
              <Btn classname={isHover1 ? "hover": "normal"} name="All" width="60px" title="전체"></Btn></div>
            <div onMouseEnter={()=>setIsHover2(true)} onMouseLeave={()=>setIsHover2(false)} style={{height:"100%"}}>
              <Btn classname={isHover2 ? "hover": "normal"} name="Planned" title="예정된 경기"></Btn>
            </div>
            <div onMouseEnter={()=>setIsHover3(true)} onMouseLeave={()=>setIsHover3(false)} style={{height:"100%"}}>
              <Btn classname={isHover3 ? "hover": "normal"} name="End" title="종료된 경기"></Btn>
            </div>
          </div>
          {content && <div style={{marginTop:"30px"}}>{selectContent[content]}</div>}
          
        </section>
      </Box>
      <Box sx={{ height: '20px' }} />

      </Container>
    </React.Fragment>
  );
}

export default MatchList;
