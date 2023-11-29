import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import '../css/TeamSelectList.css';
import { ClickAwayListener } from '@mui/material';
function TeamSelectList({id, post}) {
    console.log(id);
    console.log(post);
    const [home, setHome] = useState(true);
    const [away, setAway] = useState(true);
    const [iswriter, setIswriter] = useState(false);
    const [homelist, setHomelist] = useState([{}]);
    const [awaylist, setAwaylist] = useState([{}]);
    useEffect(()=>{
        const userid = JSON.parse(localStorage.getItem('access_token'));
        axios.get('http://110.165.17.35:8080/api/user/me',
        { headers: { Authorization: `Bearer ${userid}`}, },)
        .then((response)=>{
            if(response.data["id"]===post.userId) setIswriter(true); //작성자는 무조건 HOME팀
            axios({
                method: 'get',
                url:`http://110.165.17.35:8080/api/gameUser/join/${id}`,
            })
            .then((result)=>{
                console.log('요청 성공');
                console.log(result.data);
                for(let i = 0; i < result.data.length; i++){
                    if((result.data[i].userId === response.data["id"]) && (result.data[i].gameTeam==="HOME")) {setHome(false);}
                    else if((result.data[i].userId === response.data["id"]) && (result.data[i].gameTeam==="AWAY")) {setAway(false);}
                    if(result.data[i].gameTeam==="HOME") setHomelist(i==0 ? [result.data[i]] : (now)=>[...now, result.data[i]]);
                    else if(result.data[i].gameTeam==="AWAY") setAwaylist(i==0 ? [result.data[i]] : (now)=>[...now, result.data[i]]);
                }
            })
            .catch((error)=>{console.log('요청 실패')
            console.log(error)
            })
        })
        .catch((error)=>{
            console.log(error);
        })
      }, [home,away]);

    const handleClick=(e)=>{
        const userid = JSON.parse(localStorage.getItem('access_token'));
        var team = e.target.value;
        var url = `http://110.165.17.35:8080/api/gameUser`;
        if((team==="HOME" && home===false)||(team==="AWAY" &&away===false)) url = `http://110.165.17.35:8080/api/gameUser/delete`
        axios.get('http://110.165.17.35:8080/api/user/me',
        { headers: { Authorization: `Bearer ${userid}`}, },)
        .then((response)=>{
            console.log(response);
            console.log(response.data["id"]);
            axios({
                method: 'Post',
                url: url,
                data:{
                    "userId": response.data["id"],
                    "gameId": id,
                    "gameTeam": team,
                  }
            })
            .then((result)=>{
                console.log('요청 성공');
                console.log(result);
                if(team==="HOME") setHomelist([{}]);
                else if(team==="AWAY") setAwaylist([{}]);
            })
            .catch((error)=>{console.log('요청 실패')
            console.log(error)
            if(error.response.data["message"]===`경기 전체 인원의 최대 인원에 도달하여 참가할 수 없습니다.`){
                if(team==="HOME") setHome(0);
                else if(team==="AWAY") setAway(0);
            }
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }; 

    function Playerlist({item}){
        let position = item.position === "GK" ? "골기퍼" : item.position === "DF" ? "수비수" : "공격수";
        if(item.userId === undefined) return;
        else return (
                <div style={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", padding:"0 30px 0 18px", 
                    width:"100%", height:"45px", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.1)"}}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"45px"}}>
                        <img alt="" src={item.imgUrl}
                        style={{width:"28px", height:"28px",borderRadius:"30%" , marginRight:"12px"}}/>
                        <p style={{fontSize:'11px'}}>{item.name}</p>
                    </div>
                    <div style={{display:"flex",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", 
                    borderRadius:8, backgroundColor: item.position==="GK" ? "rgba(255, 232, 158, 0.5)" : item.position === "DF" ? "rgba(138, 255, 177, 0.4)" : "rgba(255, 163, 188, 0.4)", 
                    color: item.position==="GK" ? "rgba(138, 80, 0, 1)" : item.position === "DF" ? "rgba(0, 66, 22, 1)" : "rgba(173, 0, 17, 1)"} }><p style={{fontWeight:"bold"}}>{position}</p></div>
                </div>
        );
    }

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
                {homelist.map((item, index)=>
                <Playerlist item={item} key={index} />
                )}
            </section>
            <button value="HOME" disabled={(iswriter===true || home===0) ? true : ((away===false) ? true : false)} onClick={(e)=>{setHome(!home); handleClick(e);}} style={{
                position:"absolute", bottom:"0px", width:'100%', height:'40px',backgroundColor:"rgba(0, 0, 0, 0.08)", 
                borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.05)", fontSize:"15px", fontWeight:"bold", cursor:"pointer"}}>{home===0 ? `마감` : (home===true?`신청하기` : `취소하기`)}</button>
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
                {awaylist.map((item, index)=>
                    <Playerlist item={item} key={index} />
                    )}
            </section>
            <button value="AWAY" disabled={(iswriter===true || away===0) ? true : ((home===false) ? true : false)} onClick={(e)=>{setAway(!away); handleClick(e);}} style={{
                position:"absolute", bottom:"0px", width:'100%', height:'40px',backgroundColor:"rgba(0, 0, 0, 0.08)", 
                borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.05)", fontSize:"15px", fontWeight:"bold", cursor:"pointer"}}>{away===0 ? `마감` : (away===true?`신청하기` : `취소하기`)}</button>
        </div>
      </Box>
      <Box sx={{ height: '20px'}} />
      </Container>
    </React.Fragment>
  );
}
export default TeamSelectList;