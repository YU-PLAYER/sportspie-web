import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import '../css/ad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Ad from './Ad';
import Daylist from './Daylist';

export default function Home() {
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
        <div style={{  width:'100%', height:'auto'}}>
         <Ad />
        </div>
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center",marginTop:"25px",}}>
          <Daylist />
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