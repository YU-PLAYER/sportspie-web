import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import '../css/ad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
   function DayList({boxShadow="0px 0px 5px 0px rgba(0, 0, 0, 0)",color="black", date, day}){
    return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                width:"40px", height:"40px", borderRadius:"10px", boxShadow, color}}>
                    <span style={{fontSize:"13px", paddingBottom:"2px"}}>{date}</span>
                    <span style={{fontSize:"10px"}}>{day}</span>
                </div>
    );
   }
   function PlayList({time, place, title, member}){
    return(
        <div class="play-list">
        <div class="play-list_room">
          <div class="play-list-room_time">
            <span>{time}</span>
            <span>{place}</span>
          </div>
          <div class="play-list-room_name">
            <span>{title}</span>
          </div>
          <div class="play-list-room_person">
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
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"20px"
           }}>
            <div style={{
                width:"100%", height:"240px", borderRadius:"15px", backgroundColor:"#e4f2ff"
            }}>
            </div>
            <div class="ad-dot">
                <div class="ad-dot_dot"></div>
                <div class="ad-dot_dot"></div>
                <div class="ad-dot_dot"></div>
                <div class="ad-dot_dot"></div>
                <div class="ad-dot_dot"></div>
            </div>
        </Box>
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center",marginTop:"25px"}}>
            <div style={{display:"flex", justifyContent:"space-around", width:"100%", fontSize:"12px"}}>
               <button className="btn" style={{marginRight:"-5px"}}><FontAwesomeIcon icon={faChevronLeft} style={{color: "#000000",}} /></button>
                <DayList boxShadow="0px 0px 5px 0px rgba(0, 0, 0, 0.15)" color="rgb(255, 69, 69)" date="3" day="일"/>
                <DayList date="4" day="월"/>
                <DayList date="5" day="화"/>
                <DayList date="6" day="수"/>
                <DayList date="7" day="목"/>
                <DayList date="8" day="금"/>
                <DayList color="rgb(69, 75, 255)" date="9" day="토"/>
                <button className="btn" style={{marginLeft:"-5px"}}><FontAwesomeIcon icon={faChevronRight} style={{color: "#000000",}} /></button>
            </div>
            <div class="play-search">
                <div class="play-search_new">
                    <button>
                        <div class="play-search_dot"></div>
                        <span>최신순</span>
                    </button>
                </div>
                <div class="play-search_distance">
                    <button>
                        <div class="play-search_dot"></div>
                        <span>거리순</span>
                    </button>
                </div>
                <div class="play-search_search">
                <form method="get" id="play-search-form">
                    <input required name="username" type="text" placeholder="검색" />
                    <button><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
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
        </Box>
       
      </Box>
      <Box sx={{ height: '20px' }} />
      </Container>
    </React.Fragment>
  );
}