import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function MatchList() {
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
          border:"none",borderTopStyle:"solid",borderTopWidth:"0.5px", borderTopColor:"rgba(0,0,0,0.12)", marginBottom:"20px"}}>
            <button style=
            {{height:"100%", width:"60px", backgroundColor:"white", 
            border:"none",borderTopStyle:"solid", borderTopColor:"rgba(0,0,0,0.4)", fontSize:"14px", fontWeight:"bold", color:"#282828"}}>전체</button>
            <button style=
            {{height:"100%", width:"90px", backgroundColor:"white", 
            border:"none",borderTopStyle:"solid", borderTopColor:"rgba(0,0,0,0.0)", fontSize:"14px", fontWeight:"bold", color:"rgba(0,0,0,0.2)"}}>예정된 경기</button>
            <button style=
            {{height:"100%", width:"90px", backgroundColor:"white", 
            border:"none",borderTopStyle:"solid", borderTopColor:"rgba(0,0,0,0.0)", fontSize:"14px", fontWeight:"bold", color:"rgba(0,0,0,0.2)"}}>종료된 경기</button>
          </div>
          <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px", backgroundColor:"rgba(0, 0, 0, 0.7)", color:"white",  fontSize:"12px"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px"}}>
              <p>확정</p>
            </div>
            <div style={{width:"60%", margin:"0 10px"}}>
              <p style={{marginBottom:"10px", fontSize:"15px"}}>방 제목</p>
              <p>11/10 9:00</p>
            </div>
            <div style={{width:"30%", display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:"10px"}}>
              <p style={{marginBottom:"18px"}}>8명</p>
              <p></p>
            </div>
          </Box>
          <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px", backgroundColor:"rgba(0, 0, 0, 0.4)", color:"white",  fontSize:"12px"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px"}}>
              <p>예정</p>
            </div>
            <div style={{width:"60%", margin:"0 10px"}}>
              <p style={{marginBottom:"10px", fontSize:"15px"}}>방 제목</p>
              <p>11/13 14:00</p>
            </div>
            <div style={{width:"30%", display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:"10px"}}>
              <p style={{marginBottom:"18px"}}>현재 인원</p>
              <p>8/10</p>
            </div>
          </Box>
          <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px", backgroundColor:"rgba(10, 71, 255, 0.6)", color:"white",  fontSize:"12px"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px"}}>
              <p>종료</p>
            </div>
            <div style={{width:"60%", margin:"0 10px"}}>
              <p style={{marginBottom:"10px", fontSize:"15px"}}>방 제목</p>
              <p>11/01 13:00</p>
            </div>
            <div style={{width:"30%", display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:"10px"}}>
              <p style={{marginBottom:"18px"}}>8명</p>
              <p>3:2 [WIN]</p>
            </div>
          </Box>
          <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px", backgroundColor:"rgba(255, 10, 10, 0.6)", color:"white",  fontSize:"12px"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px"}}>
              <p>종료</p>
            </div>
            <div style={{width:"60%", margin:"0 10px"}}>
              <p style={{marginBottom:"10px", fontSize:"15px"}}>방 제목</p>
              <p>11/01 18:00</p>
            </div>
            <div style={{width:"30%", display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:"10px"}}>
              <p style={{marginBottom:"18px"}}>10명</p>
              <p>2:5 [LOSE]</p>
            </div>
          </Box>
        </section>
      </Box>
      <Box sx={{ height: '20px' }} />

      </Container>
    </React.Fragment>
  );
}