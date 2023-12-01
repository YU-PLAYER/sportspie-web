import * as React from 'react';
import Box from '@mui/material/Box';
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
                <SwiperSlide><img src={img2} alt='ad2'/></SwiperSlide>
                <SwiperSlide><img src={img3} alt='ad3'/></SwiperSlide>
                <SwiperSlide><img src={img4} alt='ad4'/></SwiperSlide>
                <SwiperSlide><img src={img5} alt='ad5'/></SwiperSlide>
            </Swiper>
        </Box>
    );
}
export default Ad;