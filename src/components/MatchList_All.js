import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';

function MatchList_All(){
  const [All, SetAll]=useState([{}]);
  useEffect(()=>{
    const userid = JSON.parse(localStorage.getItem('access_token'));
    axios.get('http://110.165.17.35:8080/api/user/me',
      { headers: { Authorization: `Bearer ${userid}`}, },)
      .then((response)=>{
          axios.get(`http://110.165.17.35:8080/api/gameUser/list?userId=${response.data["id"]}`,
          { headers: { Authorization: `Bearer ${userid}`}, },)
          .then((result)=>{
              console.log('요청 성공');
              console.log(result);
          })
          .catch((error)=>{console.log('요청 실패');
          console.log(error);})
        })
        .catch((error)=>{
            console.log(error);
        })
  }, []);
 return(
    <div>
          <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px",  color:"#282828",  fontSize:"12px", overflow:"hidden"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px", backgroundColor:"rgba(0, 0, 0, 0.6)",}}>
              <p style={{color:"white"}}>확정</p>
            </div>
            <div style={{width:"60%", margin:"0 10px"}}>
              <p style={{marginBottom:"10px", fontSize:"15px",}}>방 제목</p>
              <p>11/10 9:00</p>
            </div>
            <div style={{width:"30%", display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:"10px"}}>
              <p style={{marginBottom:"18px"}}>8명</p>
              <p></p>
            </div>
          </Box>
          <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px", color:"#282828",  fontSize:"12px", overflow:"hidden"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px", backgroundColor:"rgba(0, 0, 0, 0.3)",}}>
              <p style={{color:"white"}}>예정</p>
            </div>
            <div style={{width:"60%", margin:"0 10px"}}>
              <p style={{marginBottom:"10px", fontSize:"15px",}}>방 제목</p>
              <p>11/13 14:00</p>
            </div>
            <div style={{width:"30%", display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:"10px"}}>
              <p style={{marginBottom:"18px"}}>현재 인원</p>
              <p>8/10</p>
            </div>
          </Box>
          <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px",  color:"#282828",  fontSize:"12px", overflow:"hidden"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px", backgroundColor:"rgba(245, 159, 0, 0.6)",}}>
              <p style={{color:"white"}}>종료</p>
            </div>
            <div style={{width:"60%", margin:"0 10px"}}>
              <p style={{marginBottom:"10px", fontSize:"15px"}}>방 제목</p>
              <p>11/04 13:00</p>
            </div>
            <div style={{width:"30%", display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:"10px"}}>
              <p style={{marginBottom:"18px"}}>8명</p>
              <p>승패 미확정</p>
            </div>
          </Box>
          <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px",  color:"#282828",  fontSize:"12px", overflow:"hidden"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px", backgroundColor:"rgba(245, 159, 0, 0.6)",}}>
              <p style={{color:"white"}}>종료</p>
            </div>
            <div style={{width:"60%", margin:"0 10px"}}>
              <p style={{marginBottom:"10px", fontSize:"15px"}}>방 제목</p>
              <p>11/04 13:00</p>
            </div>
            <div style={{width:"30%", display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:"10px"}}>
              <p style={{marginBottom:"18px"}}>8명</p>
              <p>승패 미확정</p>
            </div>
          </Box>
          <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px",  color:"#282828",  fontSize:"12px", overflow:"hidden"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px", backgroundColor:"rgba(245, 159, 0, 0.6)",}}>
              <p style={{color:"white"}}>종료</p>
            </div>
            <div style={{width:"60%", margin:"0 10px"}}>
              <p style={{marginBottom:"10px", fontSize:"15px"}}>방 제목</p>
              <p>11/04 13:00</p>
            </div>
            <div style={{width:"30%", display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:"10px"}}>
              <p style={{marginBottom:"18px"}}>8명</p>
              <p>승패 미확정</p>
            </div>
          </Box>
          <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px",  color:"#282828",  fontSize:"12px", overflow:"hidden"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px", backgroundColor:"rgba(10, 71, 255, 0.6)",}}>
              <p style={{color:"white"}}>종료</p>
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
          marginTop:"10px",  color:"#282828",  fontSize:"12px", overflow:"hidden"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", boxSizing:"border-box", padding:"10px 3px 10px 10px", backgroundColor:"rgba(255, 10, 10, 0.6)",}}>
              <p style={{color:"white"}}>종료</p>
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
          </div>
 );

}
export default MatchList_All;