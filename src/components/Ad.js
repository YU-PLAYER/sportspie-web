import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Pagination} from 'swiper/modules';
import '../css/ad.css'
import img2 from '../images/Ad2.png';
import img3 from '../images/Ad3.png';
import img4 from '../images/Ad4.png';
import img5 from '../images/Ad5.png';
function Ad(){
    const [img, setImg] = useState([{}]);
    useEffect(()=>{
        axios({
            method: 'get',    
            url:`http://110.165.17.35:8080/api/banner`,
        })
        .then((result)=>{
            console.log('요청 성공');
            console.log(result);
            setImg(result.data);
        })
        .catch((error)=>{console.log('요청 실패')
        console.log(error)
        })
      }, []);

    return(
        <Box sx={{display:"flex", justifyContent:"center", marginTop:"20px", height:"40vh"
           }}>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={2}
                centeredSlides={true}
                breakpoints={
                       {
                        768: { //브라우저가 768보다 클 때
                          spaceBetween: 40,
                        },
                        1024: {  //브라우저가 1024보다 클 때
                          spaceBetween: 60,
                        },}
                }
                autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {img.map((item, index)=>
                <SwiperSlide><a href={item.link}><img src={item.imageUrl} key={index}/></a></SwiperSlide>)}
            </Swiper>
        </Box>
    );
}
export default Ad;