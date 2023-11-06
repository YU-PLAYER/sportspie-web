import * as React from 'react';
//import {useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import '../css/TeamSelectList.css';
function TeamSelectList() {
    /*const [member, setMember]=useState("");
    const [members, setMembers]=useState([]);
    //getdata함수로 DBdata받기
    const getMember=(event)=>{
        event.preventDefault();
        if(member==="") return;
        setMemter(currentArray => [member,...currentArray]);
        setMember("");
    }*/
  return (
    <React.Fragment>
      <Container maxWidth="sm">   
      <Box sx={{ height: '20px' }} />
      <Box sx={{ position:"relative", margin:'30px 0 18px 0', height: '40vh', borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)", overflow:"hidden"}}>
        <div style={{display:"flex", flexDirection:"column", position:"relative", width:'100%', height:'100%', fontSize:"10px", color:"#2e363e"}}>
            <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",  color: "rgba(0, 0, 0, 0.5)", boxSizing:"border-box",
               padding:"0 40px 0 18px", position:"absolute", top:"0px", width:'100%', height:"30px", backgroundColor:"rgba(0, 0, 0, 0.02)", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.05)"}}>
                <p>NAME</p>
                <p>POSITION</p>
            </div>
            <section style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"40vh", overflowY:"auto", margin:"30px 0 40px 0"}}>
                <div style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", padding:"0 30px 0 18px", 
                    width:"100%", height:"45px", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.1)"}}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"45px"}}>
                        <img alt="" src="https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
                        style={{width:"28px", height:"28px", marginRight:"10px"}}/>
                        <p>Player1</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", borderRadius:8, backgroundColor:"rgba(255, 163, 188, 0.4)", color:"rgba(173, 0, 17, 1)"}}><p style={{fontWeight:"bold"}}>공격수</p></div>
                </div>
                <div style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", padding:"0 30px 0 18px", 
                    width:"100%", height:"45px", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.1)"}}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"45px"}}>
                        <img alt="" src="https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
                        style={{width:"28px", height:"28px", marginRight:"10px"}}/>
                        <p>Player2</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", borderRadius:8, backgroundColor:"rgba(138, 255, 177, 0.4)", color:"rgba(0, 66, 22, 1)"}}><p style={{fontWeight:"bold"}}>수비수</p></div>
                </div>
                <div style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", padding:"0 30px 0 18px", 
                    width:"100%", height:"45px", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.1)"}}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"45px"}}>
                        <img alt="" src="https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
                        style={{width:"28px", height:"28px", marginRight:"10px"}}/>
                        <p>Player3</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", borderRadius:8, backgroundColor:"rgba(255, 232, 158, 0.5)", color:"rgba(138, 80, 0, 1)"}}><p style={{fontWeight:"bold"}}>골기퍼</p></div>
                </div>
                <div style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", padding:"0 30px 0 18px", 
                    width:"100%", height:"45px", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.1)"}}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"45px"}}>
                        <img alt="" src="https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
                        style={{width:"28px", height:"28px", marginRight:"10px"}}/>
                        <p>Player2</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", borderRadius:8, backgroundColor:"rgba(138, 255, 177, 0.4)", color:"rgba(0, 66, 22, 1)"}}><p style={{fontWeight:"bold"}}>수비수</p></div>
                </div>
                <div style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", padding:"0 30px 0 18px", 
                    width:"100%", height:"45px", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.1)"}}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"45px"}}>
                        <img alt="" src="https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
                        style={{width:"28px", height:"28px", marginRight:"10px"}}/>
                        <p>Player5</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", borderRadius:8, backgroundColor:"rgba(255, 163, 188, 0.4)", color:"rgba(173, 0, 17, 1)"}}><p style={{fontWeight:"bold"}}>공격수</p></div>
                </div>
                <div style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", padding:"0 30px 0 18px", 
                    width:"100%", height:"45px", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.1)"}}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"45px"}}>
                        <img alt="" src="https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
                        style={{width:"28px", height:"28px", marginRight:"10px"}}/>
                        <p>Player6</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", borderRadius:8, backgroundColor:"rgba(255, 163, 188, 0.4)", color:"rgba(173, 0, 17, 1)"}}><p style={{fontWeight:"bold"}}>공격수</p></div>
                </div>
            </section>
            {/* {members.map((member)=>(
                <div>
                </div>
            ))} */} 
            <button style={{
                position:"absolute", bottom:"0px", width:'100%', height:'40px',backgroundColor:"rgba(0, 0, 0, 0.08)", 
                borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.05)", fontSize:"15px", fontWeight:"bold"}}>신청하기</button>
        </div>
      </Box>
      <Box sx={{ height: '20px'}}>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><p style={{fontSize:"18px"}}>vs</p></div>
      </Box>
      <Box sx={{ position:"relative", margin:'18px 0', height: '40vh', borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)", overflow:"hidden"}}>
        <div style={{display:"flex", flexDirection:"column", position:"relative", width:'100%', height:'100%', fontSize:"10px", color:"#2e363e"}}>
            <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",  color: "rgba(0, 0, 0, 0.5)", boxSizing:"border-box",
               padding:"0 40px 0 18px", position:"absolute", top:"0px", width:'100%', height:"30px", backgroundColor:"rgba(0, 0, 0, 0.02)", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.05)"}}>
                <p>NAME</p>
                <p>POSITION</p>
            </div>
            <section style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"40vh", overflowY:"auto", margin:"30px 0 40px 0"}}>
                <div style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", padding:"0 30px 0 18px", 
                    width:"100%", height:"45px", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.1)"}}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"45px"}}>
                        <img alt="" src="https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
                        style={{width:"28px", height:"28px", marginRight:"10px"}}/>
                        <p>Player1</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", borderRadius:8, backgroundColor:"rgba(255, 163, 188, 0.4)", color:"rgba(173, 0, 17, 1)"}}><p style={{fontWeight:"bold"}}>공격수</p></div>
                </div>
                <div style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", padding:"0 30px 0 18px", 
                    width:"100%", height:"45px", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.1)"}}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"45px"}}>
                        <img alt="" src="https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
                        style={{width:"28px", height:"28px", marginRight:"10px"}}/>
                        <p>Player2</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", borderRadius:8, backgroundColor:"rgba(138, 255, 177, 0.4)", color:"rgba(0, 66, 22, 1)"}}><p style={{fontWeight:"bold"}}>수비수</p></div>
                </div>
            </section>
            {/* {members.map((member)=>(
                <div>
                </div>
            ))} */} 
            <button style={{
                position:"absolute", bottom:"0px", width:'100%', height:'40px',backgroundColor:"rgba(0, 0, 0, 0.08)", 
                borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.05)", fontSize:"15px", fontWeight:"bold"}}>신청하기</button>
        </div>
      </Box>
      <Box sx={{ height: '45px', marginBottom:"30px", borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)", overflow:"hidden"}}>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <button style={{
                width:'100%', height:'45px',backgroundColor:"rgba(0, 0, 0, 0.05)",
                borderBottom:"1px solid", borderColor:"rgba(0, 0, 0, 0.05)", fontSize:"15px", fontWeight:"600"}}>확정하기</button>
        </div>
      </Box>
      <Box sx={{ height: '20px'}} />
      </Container>
    </React.Fragment>
  );
}
export default TeamSelectList;