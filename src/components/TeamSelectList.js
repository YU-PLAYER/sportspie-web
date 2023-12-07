import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
function TeamSelectList({id, post}) {
    const [home, setHome] = useState(true);
    const [away, setAway] = useState(true);
    const [iswriter, setIswriter] = useState(false); //작성자는 버튼 hidden
    const [homelist, setHomelist] = useState([{}]);
    const [awaylist, setAwaylist] = useState([{}]);
    const [homeclick, setHomeclick] = useState(true); //rerendering 용도
    const [awayclick, setAwayclick] = useState(true); //rerendering 용도
    const [isHover, setIsHover] = useState(false);
    useEffect(()=>{
        const userid = JSON.parse(localStorage.getItem('access_token'));
        axios.get('http://110.165.17.35:8080/api/user/me',
        { headers: { Authorization: `Bearer ${userid}`}, },)
        .then((response)=>{
            if(post.userId === response.data.id) setIswriter(true);
            axios.get(`http://110.165.17.35:8080/api/gameUser/join/${id}`,
            { headers: { Authorization: `Bearer ${userid}`}, },)
            .then((result)=>{
                console.log('요청 성공');
                console.log(result.data);
                var home = 0; var away = 0;
                for(let i = 0; i < result.data.length; i++){
                    if(result.data[i].gameTeam==="HOME") {setHomelist(home==0 ? [result.data[i]] : (now)=>[...now, result.data[i]]); home++;}
                    else if(result.data[i].gameTeam==="AWAY") {setAwaylist(away==0 ? [result.data[i]] : (now)=>[...now, result.data[i]]); away++;}
                    //사용자가 이미 신청한 이력이 있는지 확인
                    if((result.data[i].userId === response.data.id) && (result.data[i].gameTeam==="HOME")) {
                        setHome(false);
                    }
                    else if((result.data[i].userId === response.data.id) && (result.data[i].gameTeam==="AWAY")) {
                        setAway(false);
                    }
                }
                 })
            .catch((error)=>{console.log('요청 실패')
            console.log(error)
            })
        })
        .catch((error)=>{
            console.log(error);
        })
      }, [homeclick, awayclick]);

    const handleClick=(e)=>{
        const userid = JSON.parse(localStorage.getItem('access_token'));
        var team = e.target.value;
        var url = `http://110.165.17.35:8080/api/gameUser`;
        if((team==="HOME" && home===false)||(team==="AWAY" && away===false)) url = `http://110.165.17.35:8080/api/gameUser/delete`
        axios.get('http://110.165.17.35:8080/api/user/me',
        { headers: { Authorization: `Bearer ${userid}`}, },)
        .then((response)=>{
            console.log(response);
            console.log(response.data["id"]);
            if(url===`http://110.165.17.35:8080/api/gameUser/delete`){
                Swal.fire({ //취소 재확인
                    icon: 'warning',
                    title: '참여 취소',
                    text: '경기 참여를 취소하시겠습니까?',
                    showDenyButton: true,
                    confirmButtonText: '예',
                    denyButtonText: '아니오',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        axios({
                            method: 'Post',
                            url: url,
                            data:{
                                "userId": response.data["id"],
                                "gameId": id,
                                "gameTeam": team,
                              },
                            headers: { Authorization: `Bearer ${userid}`},
                        })
                        .then((result)=>{
                            console.log('요청 성공');
                            console.log(result);
                            if(team==="HOME") {setHomelist([{}]); setHomeclick(!homeclick);}
                            else if(team==="AWAY") {setAwaylist([{}]); setAwayclick(!awayclick);}
                        })
                        .catch((error)=>{
                            console.log('요청 실패');
                            console.log(error);
                            if (error.response.data["message"]==="해당 경기의 작성자는 참가 취소할 수 없습니다."){
                                if(team==="HOME") setHome(false);
                                else if(team==="AWAY") setAway(false);
                                setIswriter(true);
                                Swal.fire({
                                    icon: 'error',
                                    title: '작성자 취소 불가',
                                    html: '해당 경기의 작성자는 <br/> 참가 취소할 수 없습니다.'
                                });
                            };
                        })
                    } else if (result.isDenied){
                        if(team==="HOME") setHome(false);
                        else if(team==="AWAY") setAway(false);
                    }
                  })
            } else {
                axios({
                    method: 'Post',
                    url: url,
                    data:{
                        "userId": response.data["id"],
                        "gameId": id,
                        "gameTeam": team,
                      },
                    headers: { Authorization: `Bearer ${userid}`},
                })
                .then((result)=>{
                    console.log('요청 성공');
                    console.log(result);
                    if(team==="HOME") {setHomelist([{}]); setHomeclick(!homeclick);}
                    else if(team==="AWAY") {setAwaylist([{}]); setAwayclick(!awayclick);}
                })
                .catch((error)=>{
                    console.log('요청 실패');
                    console.log(error);
                    if(error.response.data["message"]===`경기 전체 인원의 최대 인원에 도달하여 참가할 수 없습니다.` || error.response.data["message"]==="경기 시작시간이 지났거나, 경기 전체 인원의 최대 인원에 도달하여 참가할 수 없습니다."){
                        if(team==="HOME") setHome(0);
                        else if(team==="AWAY") setAway(0);
                        Swal.fire({
                            icon: 'error',
                            title: '경기 마감',
                            html: '경기 전체 인원의 최대 인원에 도달하여 <br/> 참가할 수 없습니다.'
                        });
                    };
                })
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }; 

    function Playerlist({item}){
        if(item.userId === undefined) return;
        else return (
                <div onClick={()=>click(item.userId)} style={{
                    cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", padding:"0 20px", 
                    width:"100%", height:"45px", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.1)"}}>
                    <div style={{display:"flex", flexDirection:"row", alignItems:"center", height:"45px"}}>
                        <img alt="" src={item.imgUrl}
                        style={{width:"28px", height:"28px",borderRadius:"30%" , marginRight:"12px"}}/>
                        <p style={{fontSize:'11px'}}>{item.name}</p>
                    </div>
                    <div style={{display:"flex", flexDirection:"row",}}>
                    <div style={{display: item.goalkeeper===true?"flex":"none",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", 
                    borderRadius:8, backgroundColor: "rgba(255, 232, 158, 0.5)", 
                    color: "rgba(138, 80, 0, 1)"} }><p style={{fontWeight:"bold"}}>골기퍼</p></div>
                    <div style={{display:item.defender===true?"flex":"none",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", 
                    borderRadius:8, backgroundColor: "rgba(138, 255, 177, 0.4)", marginLeft:"1.5px",
                    color: "rgba(0, 66, 22, 1)"} }><p style={{fontWeight:"bold"}}>수비수</p></div>
                    <div style={{display:item.attacker===true?"flex":"none",justifyContent:"center", alignItems:"center", width:"40px", height:"18px", 
                    borderRadius:8, backgroundColor: "rgba(255, 163, 188, 0.4)", marginLeft:"1.5px",
                    color: "rgba(173, 0, 17, 1)"} }><p style={{fontWeight:"bold"}}>공격수</p></div>
                    <div style={{display:item.midfielder===true?"flex":"none",justifyContent:"center", alignItems:"center", width:"50px", height:"18px", 
                    borderRadius:8, backgroundColor: "rgba(153, 192, 255, 0.5)", marginLeft:"1.5px",
                    color: "rgba(44, 54, 71, 1)"} }><p style={{fontWeight:"bold"}}>미드필더</p></div>
                    <div style={{display: (item.defender===false)&&(item.attacker===false)&&(item.midfielder===false)&&(item.goalkeeper===false)?"flex":"none",
                    justifyContent:"center", alignItems:"center", width:"40px", height:"18px", 
                    borderRadius:8, backgroundColor: "rgba(0,0,0,0.1)",
                    color: "rgba(0,0,0,0.8)"} }><p style={{fontWeight:"bold"}}>미설정</p></div>
                    </div>
                </div>
        );
    }

    const Navigate = useNavigate();
    const click = (id)=>{
      Navigate('/ExamineProfile', {state: {userId: `${id}`,},});
    }

  return (
    <div> 
      <Box sx={{ height: '20px' }} />
      <Box sx={{ position:"relative", margin:'30px 0 18px 0', height: '40vh', borderRadius: 2, boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)", overflow:"hidden"}}>
        <div style={{display:"flex", flexDirection:"column", position:"relative", width:'100%', height:'100%', fontSize:"10px", color:"#2e363e"}}>
            <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",  color: "rgba(0, 0, 0, 0.5)", boxSizing:"border-box",
               padding:"0 20px", position:"absolute", top:"0px", width:'100%', height:"30px", backgroundColor:"rgba(0, 0, 0, 0.02)", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.05)"}}>
                <p>NAME</p>
                <p>PREFERRED POSITION</p>
            </div>
            <section style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"40vh", overflowY:"auto", margin:"30px 0 40px 0"}}>
                {homelist.map((item, index)=>
                <Playerlist item={item} key={index} />
                )}
            </section>
            <button onMouseEnter={()=>setIsHover(0)} onMouseLeave={()=>setIsHover(false)} value="HOME" disabled={((home===0)) ? true : ((away===false) ? true : false)} onClick={(e)=>{setHome(!home); handleClick(e);}} style={{
                visibility: (iswriter===true) ?  "hidden" : "visible", position:"absolute", bottom:"0px", width:'100%', height:'40px',backgroundColor:isHover===0 ? "rgba(0, 0, 0, 0.06)" : "rgba(0, 0, 0, 0.08)", 
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
               padding:"0 20px", position:"absolute", top:"0px", width:'100%', height:"30px", backgroundColor:"rgba(0, 0, 0, 0.02)", borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.05)"}}>
                <p>NAME</p>
                <p>PREFERRED POSITION</p>
            </div>
            <section style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"40vh", overflowY:"auto", margin:"30px 0 40px 0"}}>
                {awaylist.map((item, index)=>
                    <Playerlist item={item} key={index} />
                    )}
            </section>
            <button onMouseEnter={()=>setIsHover(1)} onMouseLeave={()=>setIsHover(false)} value="AWAY" disabled={((away===0)) ? true : ((home===false) ? true : false)} onClick={(e)=>{setAway(!away); handleClick(e);}} style={{
                visibility: (iswriter===true) ?  "hidden" : "visible", position:"absolute", bottom:"0px", width:'100%', height:'40px',backgroundColor : isHover===1 ? "rgba(0, 0, 0, 0.06)" : "rgba(0, 0, 0, 0.08)", 
                borderBottom:'1px solid', borderColor:"rgba(0, 0, 0, 0.05)", fontSize:"15px", fontWeight:"bold", cursor:"pointer"}}>{away===0 ? `마감` : (away===true?`신청하기` : `취소하기`)}</button>
        </div>
      </Box>
      <Box sx={{ height: '20px'}} />
    </div>
  );
}
export default TeamSelectList;