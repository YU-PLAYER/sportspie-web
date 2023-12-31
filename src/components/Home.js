import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../css/ad.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { StyledEngineProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Ad from './Ad';
import SUNNY from '../images/sunny.jpg';
import CLOUDY from '../images/cloudy.jpg';
import RAINY from '../images/rainy.jpg';
import SNOW from '../images/whitesnow.png';
import { getAccessNaverToken } from './getAccessNaverToken';
import { getAccessKakaoToken } from './getAccessKakaoToken';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const now = dayjs();
  const day = {0 : '일', 1:'월', 2:"화", 3:"수", 4:"목", 5:"금", 6:"토"};
  const [click, SetClick]=useState(now.get("D"));
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');
  const [ASC, setASC] = useState(true); //정렬 default는 ASC
  const [DESC, setDESC] = useState(false);
  const [games, setGames] = useState([{}]);
  const [totalpage, settotalpage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isHoverdate, setIsHoverdate] = useState(0);
  const [isHover, setIsHover] = useState("");
  //소셜로그인
  useEffect(() => {
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get('code');
    const State = url.searchParams.get('state');
    console.log('Auth code:', authCode);
    if (!authCode) {
      return;
    }
    switch (State) {
      case 'NAVER':
        getAccessNaverToken(authCode);
        break;
      case 'KAKAO' :
        getAccessKakaoToken(authCode);
        break;
      default:
        console.error('Unknown State :', State);
    }
  }, []);

  //날짜 & 정렬 선택시 data 요청
  useEffect(()=>{
    var date = `${now.get("y")}-${now.get("D")>click ? now.get("M")+2 : now.get("M")+1}-${click<10? `0${click.toString()}`:click.toString()}`;
    console.log("선택한 날짜 : " + date);
    var sort = (DESC === true)? "DESC" : "ASC" ;
    console.log("정렬 기준 : " + sort);
    axios({
        method: 'get',    
        url:`http://110.165.17.35:8080/api/game/${date}?sortBy=${sort}&page=${pages-1}`,
    })
    .then((result)=>{
        console.log('요청 성공');
        settotalpage(result.data.totalPages);
        console.log(result.data.content);
        result.data.content.length === 0 ? setGames([-1]) : setGames(result.data.content);
    })
    .catch((error)=>{console.log('요청 실패')
    console.log(error)
    })
  }, [click, ASC, DESC, pages]);

  //제목 검색하면 data 요청
  useEffect(()=>{
    console.log("검색할 내용 : "+storedValue);
    if(storedValue !== ''){
      var date = `${now.get("y")}-${now.get("D")>click ? now.get("M")+2 : now.get("M")+1}-${click<10? `0${click.toString()}`:click.toString()}`;
      console.log("선택한 날짜 : " + date);
      var sort = (DESC === true)? "DESC" : "ASC" ;
      console.log("정렬 기준 : " + sort);
      axios({
          method: 'get',    
          url:`http://110.165.17.35:8080/api/game/${date}?sortBy=${sort}&title=${storedValue}&page=${pages-1}`,
      })      
    .then((result)=>{
        console.log('요청 성공');
        settotalpage(result.data.totalPages);
        console.log(result.data.content);
        result.data.content.length === 0 ? setGames([-1]) : setGames(result.data.content);
        setStoredValue('');
    })
    .catch((error)=>{console.log('요청 실패')
    console.log(error)
    })}
  },[storedValue, pages]);

  const handlepage=(event)=>{
    const currentpage = Number(event.target.outerText);
    console.log("page : " +currentpage);
    setPages(currentpage);
  }

  //제목으로 검색
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    setStoredValue(inputValue);
    setPages(1);
    setInputValue('');
  }

  const Navigate = useNavigate();
  const handleclick = (id)=>{
    Navigate('/DetailPage', {state: {gameid: `${id}`,},});
  }

  //날짜 list component
  function DayList({date, day}){
    return (
    <div onClick={()=>{SetClick(date); setPages(1);}} onMouseEnter={()=>setIsHoverdate(date)} onMouseLeave={()=>setIsHoverdate(0)} style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                width:"40px", height:"40px", borderRadius:"10px", margin:"2px 0", cursor:"pointer", fontWeight: (click===date) ? "bold":"normal", 
                boxShadow : (click===date) ? "0px 0px 5px 0px rgba(0, 0, 0, 0.15)" : (isHoverdate===date)?"0px 0px 5px 0px rgba(0, 0, 0, 0.09)":"0px 0px 5px 0px rgba(0, 0, 0, 0)", 
                color : (day==='일')? "rgb(255, 69, 69)" : ((day==='토') ? "rgb(69, 75, 255)" : "black"),
                }}>
                    <span style={{fontSize:(click===date) ? "14px": "13px", paddingBottom:"2px"}}>{date}</span>
                    <span style={{fontSize:(click===date) ? "11px": "10px"}}>{day}</span>
                </div>
    );}
    
  //경기목록 component
  function PlayList({item}){
    const time = item.time ? item.time.slice(0,5) : '';
    var length = item.title ? item.title.length : 0;
    var weather = item.weather === "SUNNY" ? SUNNY : item.weather === "CLOUDY" ? CLOUDY : item.weather === "RAIN" ? RAINY : item.weather === "SNOW" ? SNOW : '';
    if(item === -1 ) return <div 
    style={{marginTop:"30px", height:"40px", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", color:"rgba(0,0,0,0.4)"}}>
      모집글이 존재하지 않습니다.</div>
    else return(
      <div className= "play-list" onClick={()=>{handleclick(item.gameId);}} onMouseEnter={()=>setIsHover(item.gameId)} onMouseLeave={()=>setIsHover("")} style={{cursor:"pointer"}}>
        <div className={isHover===item.gameId ? "play-list_room play-list_room-hover" :  "play-list_room"} >
          <div style={{width:"50px", display:'flex', flexDirection:"column", height:"100%", justifyContent:'center', alignItems:"center"}}>
            <span style={{fontSize:'13px'}}>{time}</span>
          </div>
          <div style={{display:"flex"}}>
          <div className="play-list-room_title" style={{marginRight:"2px"}}>
            <span style={{fontWeight:'bold', marginTop:'3px'}}>{length>16 ? `${item.title.slice(0,14)}...` : `${item.title}`}</span>
            <span style={{fontSize:'11px', marginTop:'5px',}}>{item.stadiumName}</span>
          </div>
          <span><img src={weather} alt='weather' style={{width:'35px', height:'35px'}}/></span>
          </div>
          <div style={{width:"33px", display:'flex', justifyContent:'center'}}>
            <span style={{fontSize:'12px'}}>{item.currentPeople}/{item.totalPeople}</span>
          </div>
        </div>
      </div>
    );
   } 

  return (
    <React.Fragment>
      <Container maxWidth="sm">   
      <Box sx={{ height: '20px' }} />
      <Box sx={{ height: '100vh'}}>
        <div style={{  width:'100%', height:'auto'}}>
         <Ad />
        </div>
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center",marginTop:"25px",}}>
          
        <div className="daylist"style={{display:"flex", justifyContent:"center", alignment:"center", fontSize:"12px", width:"100%"}}>
             <Swiper 
                slidesPerView={8}
                slidesPerGroup={1}
                spaceBetween={0}
                navigation= {true}
                modules={[Navigation]}
                slidesOffsetBefore={55}
                className="mySwiper"
            >
                <SwiperSlide><DayList date={now.get("D")} day={day[now.get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(1,"d").get("D")} day={day[now.add(1,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(2,"d").get("D")} day={day[now.add(2,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(3,"d").get("D")} day={day[now.add(3,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(4,"d").get("D")} day={day[now.add(4,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(5,"d").get("D")} day={day[now.add(5,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(6,"d").get("D")} day={day[now.add(6,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(7,"d").get("D")} day={day[now.add(7,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(8,"d").get("D")} day={day[now.add(8,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(9,"d").get("D")} day={day[now.add(9,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(10,"d").get("D")} day={day[now.add(10,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(11,"d").get("D")} day={day[now.add(11,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(12,"d").get("D")} day={day[now.add(12,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(13,"d").get("D")} day={day[now.add(13,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList date={now.add(14,"d").get("D")} day={day[now.add(14,"d").get("d")]}/></SwiperSlide>
            </Swiper>
        </div>

        <div className="play-search">
                <div className="play-search_new">
                    <button onClick={()=>{setASC(true); setDESC(false);}} onMouseEnter={()=>setIsHover("ASC")} onMouseLeave={()=>setIsHover("")} 
                    style={{cursor:"pointer", color: isHover==="ASC"&&ASC===false?'rgba(0,0,0,0.6)' : 'black', fontWeight:ASC===true?"bold":"normal", fontSize:ASC===true?"11.5px":"11px"}}>
                        <div className="play-search_dot"></div>
                        <span>최신순</span>
                    </button>
                </div>
                <div className="play-search_distance">
                    <button onClick={()=>{setASC(false); setDESC(true);}} onMouseEnter={()=>setIsHover("DESC")} onMouseLeave={()=>setIsHover("")} 
                    style={{cursor:"pointer", color:isHover==="DESC"&&DESC===false?'rgba(0,0,0,0.6)' :'black', fontWeight:DESC===true?"bold":"normal",fontSize:DESC===true?"11.5px":"11px" }}>
                        <div className="play-search_dot"></div>
                        <span>과거순</span>
                    </button>
                </div>
                <div className="play-search_search">
                <form method="get" id="play-search-form">
                    <input value={inputValue} onChange={handleInputChange} name="username" type="text" placeholder="검색" maxLength="20" />
                    <button onClick={handleButtonClick} style={{cursor:"pointer"}}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </form>
                </div>
          </div>
            {games.map((item, index)=><PlayList item={item} key={index} />
            )}
        </Box>
        <StyledEngineProvider injectFirst>
        <Stack spacing={2} style={{marginTop:"30px"}}>
                <Pagination page={pages} onChange={handlepage} defaultPage={1} count={totalpage} shape="rounded" />
        </Stack>
        </StyledEngineProvider>
        <Box sx={{ height: '60px' }}/>
      </Box>
      <Box sx={{ height: '20px' }}/>
      </Container>
    </React.Fragment>
  );
}
