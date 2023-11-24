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
import { getAccessNaverToken } from './getAccessNaverToken';
import { getAccessKakaoToken } from './getAccessKakaoToken';

export default function Home() {
  const now = dayjs();
  const day = {0 : '일', 1:'월', 2:"화", 3:"수", 4:"목", 5:"금", 6:"토"};
  const [click, SetClick]=useState(now.get("D"));
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');
  const [fastest, setFastest] = useState(false);
  const [distance, setDistance] = useState(false);
  
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

  useEffect(()=>{
    console.log(click.toString());
    axios({
        method: 'get',    
        url:`http://110.165.17.35:8080/api/game/${click.toString()}`,
        data : {
          page: 0,
        }
    })
    .then((result)=>{
        console.log('요청 성공')
        console.log(result.title);
    })
    .catch((error)=>{console.log('요청 실패')
    console.log(error)
    })

  }, [click]);

  //날짜 list
  function DayList({date, day}){
    return (
    <div onClick={()=>{SetClick(date);}} style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                width:"40px", height:"40px", borderRadius:"10px", margin:"2px 0", cursor:"pointer",
                boxShadow : (click===date) ? "0px 0px 5px 0px rgba(0, 0, 0, 0.15)" : "0px 0px 5px 0px rgba(0, 0, 0, 0)", 
                color : (day==='일')? "rgb(255, 69, 69)" : ((day==='토') ? "rgb(69, 75, 255)" : "black")
                }}>
                    <span style={{fontSize:"13px", paddingBottom:"2px"}}>{date}</span>
                    <span style={{fontSize:"10px"}}>{day}</span>
                </div>
    );}

  //제목으로 검색
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    setStoredValue(inputValue);
    setInputValue('');
    console.log(fastest, distance);
  }

  //경기목록 component
  function PlayList({time, place, title, member}){
    return(
        <div className="play-list">
        <div className="play-list_room">
          <div className="play-list-room_time">
            <span>{time}</span>
            <span>{place}</span>
          </div>
          <div className="play-list-room_name">
            <span>{title}</span>
          </div>
          <div className="play-list-room_person">
            <span>{member}</span>
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
                <SwiperSlide><DayList  date={now.add(2,"d").get("D")} day={day[now.add(2,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList  date={now.add(3,"d").get("D")} day={day[now.add(3,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList  date={now.add(4,"d").get("D")} day={day[now.add(4,"d").get("d")]}/></SwiperSlide>
                <SwiperSlide><DayList  date={now.add(5,"d").get("D")} day={day[now.add(5,"d").get("d")]}/></SwiperSlide>
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
                    <button onClick={()=>{setFastest(true); setDistance(false);}} style={{cursor:"pointer"}}>
                        <div className="play-search_dot"></div>
                        <span>최신순</span>
                    </button>
                </div>
                <div className="play-search_distance">
                    <button onClick={()=>{setFastest(false); setDistance(true);}} style={{cursor:"pointer"}}>
                        <div className="play-search_dot"></div>
                        <span>거리순</span>
                    </button>
                </div>
                <div className="play-search_search">
                <form method="get" id="play-search-form">
                    <input value={inputValue} onChange={handleInputChange} name="username" type="text" placeholder="검색" />
                    <button onClick={handleButtonClick} style={{cursor:"pointer"}}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </form>
                </div>
            </div>
            <PlayList time="20:20" place="장소" title="방 제목" member="9/12" />
            <PlayList time="20:20" place="장소" title="방 제목" member="9/12" />
            <PlayList time="20:20" place="장소" title="방 제목" member="9/12" />
            <PlayList time="20:20" place="장소" title="방 제목" member="9/12" />
            <PlayList time="20:20" place="장소" title="방 제목" member="9/12" />
            <PlayList time="20:20" place="장소" title="방 제목" member="9/12" />
            <PlayList time="20:20" place="장소" title="방 제목" member="9/12" />
            <PlayList time="20:20" place="장소" title="방 제목" member="9/12" />
            <PlayList time="20:20" place="장소" title="방 제목" member="9/12" />
            <PlayList time="20:20" place="장소" title="방 제목" member="9/12" />
        </Box>
        <StyledEngineProvider injectFirst>
        <Stack spacing={2} style={{marginTop:"30px"}}>
                <Pagination count={2} shape="rounded" />
        </Stack>
        </StyledEngineProvider>
        <Box sx={{ height: '60px' }}/>
      </Box>
      <Box sx={{ height: '20px' }}/>
      </Container>
    </React.Fragment>
  );
}
