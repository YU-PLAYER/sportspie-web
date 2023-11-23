import axios from 'axios';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from 'swiper/modules';
import '../css/ad.css';
function Daylist(){
    const now = dayjs();
    const day = {0 : '일', 1:'월', 2:"화", 3:"수", 4:"목", 5:"금", 6:"토"};
    const [click, SetClick]=useState(now.get("D"));
    
    function handleClick(){
        console.log(click);
        var date = click.toString();
        axios({
            method: 'get',    
            url:`http://223.130.147.184:8080/api/game/${date}`,
            page:0,
            size:1,
            sort:['empty']
        })
        .then((result)=>{
            console.log('요청 성공')
            console.log(result.title);
        })
        .catch((error)=>{console.log('요청 실패')
        console.log(error)
        })

    }
     function DayList({date, day}){
      return (
      <div onClick={()=>{SetClick(date); handleClick();}} style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                  width:"40px", height:"40px", borderRadius:"10px", margin:"2px 0", cursor:"pointer",
                  boxShadow : (click===date) ? "0px 0px 5px 0px rgba(0, 0, 0, 0.15)" : "0px 0px 5px 0px rgba(0, 0, 0, 0)", 
                  color : (day==='일')? "rgb(255, 69, 69)" : ((day==='토') ? "rgb(69, 75, 255)" : "black")
                  }}>
                      <span style={{fontSize:"13px", paddingBottom:"2px"}}>{date}</span>
                      <span style={{fontSize:"10px"}}>{day}</span>
                  </div>
      );}

    
    return (
        <div className="daylist"style={{display:"flex", justifyContent:"center", alignment:"center", fontSize:"12px", width:"100%"}}>
             <Swiper 
                slidesPerView={8}
                slidesPerGroup={1}
                spaceBetween={0}
                navigation={true}
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
    );
}
export default Daylist;