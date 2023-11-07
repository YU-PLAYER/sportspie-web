import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TeamSelectList from './TeamSelectList';
import img1 from "../images/FootballField.jpg"
import img2 from "../images/FootballFieldimg.jpg"
import img3 from "../images/FootballFieldimage.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const DetailPage = () => {
    const [post, setPost] = useState({
      imageURL: 'stadium.jpg',
      title: 'Soccer Match',
      maxParticipants: '10',
      dateTime: '2023-12-01 18:00',
      stadium: 'Seoul Stadium',
      details: 'Friendly soccer match',
    });
  
    return (
      <Container>
        <ImageContainer>
          <Swiper
            spaceBetween={0}
            slidesPerView={'auto'}
            autoplay={true}
            delay={1000}
            disableOnInteraction={true}
            loop={true}
            loopAdditionalSlides={1}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}>
            <SwiperSlide>
              <FieldImage src={img1}/>
            </SwiperSlide>
            <SwiperSlide>
              <FieldImage src={img2}/>
            </SwiperSlide>
            <SwiperSlide>
              <FieldImage src={img3}/>
            </SwiperSlide>
          </Swiper>
        </ImageContainer>
        <ContentContainer>
          <TitleText>크리스마스에 축구하실분</TitleText><br/>
          <PlaceText>경기장 : 영남대학교 축구장</PlaceText>
          <ParticipantNumberText>최대 경기 인원 : 11 vs 11</ParticipantNumberText>
          <DateText>경기 시작 시간 : 12월 25일 12:25</DateText>
          <BlackLine/>
          <MainText>
            성탄절날 12시 25분부터 11vs11으로 축구 같이 뛰실분들 구합니다. <br/>
            아마추어, 프로 다 상관없습니다. 안전하게 같이 재밌게 하실분들 구해요!!
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </MainText>
        </ContentContainer>
        <TeamSelectionUI>{<TeamSelectList/>}</TeamSelectionUI>
        <ButtonContainer>
          <DeadlineButton>마감하기</DeadlineButton>
          <ConfirmationButton>확정하기</ConfirmationButton>
        </ButtonContainer>
      </Container>
    );
  };
  
  const Container = styled.div`
    width:100%;
    height:auto;
    background-color: white;
  `;
  
  const ImageContainer = styled.div`
    width:100%;
    height:40vh;
    display: flex;
    justify-content: center;
  `;

  const FieldImage = styled.img`
    width:90%;
    height:100%;
    margin-top: 5%;
    border-radius: 10px;
  `;
  
  const ContentContainer = styled.div`
    width:82.5%;
    height: auto;
    margin-left: 5%;
    background-image: linear-gradient(to top left, #f5f5f5, #f5f5f5);
    border-radius: 15px;
    font-size: 1em;
    font-weight: 1000;
    margin-top: 10%;
    text-align: left;
    padding: 1em;
  `;

  const BlackLine = styled.div`
    background-color: black;
    height: 0.125vh;
    margin-bottom: 1vh;
  `;

  const TitleText = styled.div`
    text-align: center;
    font-size: 1.2em;
    background-color: white;
    border-radius: 10px;
    padding-top: 1vh;
    padding-bottom: 1vh;
  `;

  
  const PlaceText = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 0.5vh;
    margin-bottom: 1vh;
  `;

  const ParticipantNumberText = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 0.5vh;
    margin-bottom: 1vh;
  `;

  const DateText = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 0.5vh;
    margin-bottom: 1vh;
  `;

  const MainText = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 1vh;
    font-size: 0.8em;
    font-weight: 500;
    height: auto;
  `;
  
  const TeamSelectionUI = styled.div`
    width: 90%;
    height: auto;
    margin-left: 5%;
    border-radius: 10px;
    background-color: #f5f5f5;
    margin-top: 5%;
  `;
  
  const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 7.5%;
    margin-bottom: 7.5%;
  `;  

  const DeadlineButton = styled.button`
    margin-left: 5%;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    border-radius: 10px;
    border-color: white;
    width: 30%;
    height: 6vh;
  `; 

  const ConfirmationButton = styled.button`
    margin-right: 5%;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    border-radius: 10px;
    border-color: white;
    width: 30%;
    height: 6vh;
  `;  

export default DetailPage;