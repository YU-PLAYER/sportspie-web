import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { differenceInHours } from "date-fns";
import TeamSelectList from './TeamSelectList';

const DetailPage = () => {  
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const { gameId } = useParams(); // 경로 파라미터 받아오기
  const navigate = useNavigate(); // 페이지 이동 훅
  
  useEffect(() => {
    // 사용자 정보를 가져오는 함수
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://110.165.17.35:8080/api/user/me'); 
        setUser(response.data);
      } catch (error) {
        console.error("서버에서 사용자 정보를 불러오지 못했습니다.", error);
        Swal.fire({
          icon: 'error',
          title: '사용자 정보 조회 오류',
          text: '서버에서 사용자 정보를 불러오는데 실패하였습니다. 다시 시도해 주십시오'
        });
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://110.165.17.35:8080/api/game/detail/${gameId}`);
        setPost(response.data);
      } catch (error) { // 서버 통신 오류 발생시 경고창 출력
        console.error("서버에서 데이터를 불러오지 못했습니다.", error);
          Swal.fire({
            icon: 'error',
            title: '통신 오류',
            text: '서버에서 데이터를 불러오는데 실패하였습니다. 다시 시도해 주십시오'
          });
          navigate('./Home');
      }
    };
    fetchPost();
    }, [gameId]);

    const handleConfirm = async () => {
      if (post.author.id !== user.id) {
        Swal.fire({
          icon: 'error',
          title: '인원 확정 실패',
          text: '경기글 작성자만 인원을 확정할 수 있습니다.'
        });
        return;
      }
      if (post.currentCapacity % 2 !== 0) {
        Swal.fire({
          icon: 'error',
          title: '인원 확정 실패',
          text: '팀의 인원수가 같고 합이 짝수여야 인원을 확정할 수 있습니다.'
        });
        return;
      }  
      try {
        const response = await axios.patch('http://110.165.17.35:8080/api/game/progress', {
          userId: user.id,
          gameId: gameId
        });
        Swal.fire({
          icon: 'success',
          title: '인원 확정 성공',
          text: '인원이 성공적으로 확정되었습니다.'
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '인원 확정 실패',
          text: '인원을 확정하는 중 오류가 발생했습니다.'
        });
      }
    };

    const handleResultConfirm = async (result) => {
      try {
        const response = await axios.patch('http://110.165.17.35:8080/api/game/after', {
          userId: user.id,
          gameId: gameId,
          gameResult: result
        });
        Swal.fire({
          icon: 'success',
          title: '결과 확정 성공',
          text: '경기 결과가 성공적으로 확정되었습니다.'
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '결과 확정 실패',
          text: '결과를 확정하는 중 오류가 발생했습니다.'
        });
      }
    };
    
    const handleResultButtonClick = () => {
      if (post.author.id !== user.id) {
        Swal.fire({
          icon: 'error',
          title: '결과 확정 실패',
          text: '경기글 작성자만 결과를 확정할 수 있습니다.'
        });
        return;
      }
    
      Swal.fire({
        title: '결과를 선택해주세요',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `승리`,
        denyButtonText: `무승부`,
        cancelButtonText: `패배`,
      }).then((result) => {
        if (result.isConfirmed) {
          handleResultConfirm('WIN');
        } else if (result.isDenied) {
          handleResultConfirm('DRAW');
        } else if (result.isDismissed) {
          handleResultConfirm('LOSE');
        }
      })
    };

    const handleDelete = async () => {
      try {
          const response = await axios.post('http://110.165.17.35:8080/api/game/delete', {
              userId: user.id,
              gameId: gameId
          });
          Swal.fire({
              icon: 'success',
              title: '게시글 삭제 성공',
              text: '게시글이 성공적으로 삭제되었습니다.'
          });
          navigate('./Home'); // 게시글이 성공적으로 삭제되면 홈으로 이동
      } catch (error) {
          Swal.fire({
              icon: 'error',
              title: '게시글 삭제 실패',
              text: '게시글을 삭제하는 중 오류가 발생했습니다.'
          });
      }
  };
    return (
      <Container>
        <ImageContainer>       
            <FieldImage src={post.stadium?.imageUrl}/>
        </ImageContainer>
        <ContentContainer>
          <TitleText>{post.title}</TitleText><br/>
          <PlaceText>경기장 : {post.stadium?.name}</PlaceText>
          <ParticipantNumberText>최대 경기 인원 : {post.maxCapacity}</ParticipantNumberText>
          <DateText>경기 시작 시간 : {post.startedAt}</DateText>
          <WeatherText>경기 당일 날씨 : {post.stadium?.weatherType}</WeatherText>
          <BlackLine/>
          <MainText>
            {post.content}
          </MainText>
        </ContentContainer>
        <TeamSelectionUI>{<TeamSelectList/>}</TeamSelectionUI>
        <ButtonContainer>
          {post.author.id === user.id && <DeadlineButton disabled={post.currentCapacity % 2 !== 0} onClick={handleConfirm}>인원 확정</DeadlineButton>}
          {post.author.id === user.id && <ConfirmationButton disabled={!(post.status === 'PROGRESS' && differenceInHours(new Date(post.startedAt), new Date()) >= 2)} onClick={handleResultButtonClick}>결과 확정</ConfirmationButton>}
        </ButtonContainer>
        {post.author.id === user.id && <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>}
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

  const WeatherText = styled.div`
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
    background-color: ${props => props.disabled ? 'gray' : 'blue'}
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
    background-color: ${props => props.disabled ? 'gray' : 'red'};
  `;  

  const DeleteButton = styled.button`
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    border-radius: 10px;
    border-color: white;
    width: 30%;
    height: 6vh;
    margin-bottom: 7.5%;
  `;

export default DetailPage;