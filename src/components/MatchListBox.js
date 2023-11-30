import * as React from 'react';
import Box from '@mui/material/Box';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';

function MatchListBox({item}){
    let status = ''; let rightdown = ''; let rightup=`${item.numJoin}명`; let color='';
    if(item.gameStatus==='BEFORE') {status = '예정'; rightup=`모집중`; rightdown=`${item.numJoin}/${item.maxJoin}`; color="rgba(0, 0, 0, 0.3)";}
    else if(item.gameStatus==='AFTER') {status='종료'; rightdown=`[${item.gameResult}]`;  
      if(item.gameResult==='WIN') color="rgba(10, 71, 255, 0.6)";
      else if(item.gameResult==='LOSE') color="rgba(255, 10, 10, 0.6)";
      else if(item.gameResult==='DRAW') color="rgba(15, 187, 142, 0.6)";
    }
    else if(item.gameStatus==='PROGRESS') {
     let searchdate = new Date(`${item.date} ${item.time}`);
     let now = new Date();
      if((searchdate > now)) {
        status='확정'; color="rgba(0, 0, 0, 0.6)"; 
      } else {
        status='종료'; rightdown='승패 미확정'; color="rgba(245, 159, 0, 0.6)";} 
    }
    if(item.date !== undefined){
    return(
        <Box sx={{ display:"flex", alignItems:"center", height: '60px', width:"100%", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", 
          marginTop:"10px", color:"#282828",  fontSize:"12px", overflow:"hidden"}}>
            <div style={{width:"15%",display:"flex", alignItems:"flex-start", height:"100%", 
            boxSizing:"border-box", padding:"10px 3px 10px 10px", backgroundColor:`${color}`}}>
              <p style={{color:"white"}}>{status}</p>
            </div>
            <div style={{width:"60%", margin:"0 10px"}}>
              <p style={{marginBottom:"10px", fontSize:"14px",}}>{item.title}</p>
              <p>{`${item.date.slice(5,7)}/${item.date.slice(8,)} ${item.time.slice(3,)}`}</p>
            </div>
            <div style={{width:"30%", display:"flex", flexDirection:"column", alignItems:"flex-end", marginRight:"10px"}}>
              <p style={{marginBottom:"18px"}}>{rightup}</p>
              <p>{rightdown}</p>
            </div>
          </Box>
    );}
}
export default MatchListBox;