import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { differenceInHours } from "date-fns";
import SUNNY from '../images/sunny.jpg';
import CLOUDY from '../images/cloudy.jpg';
import RAINY from '../images/rainy.jpg';
import SNOW from '../images/whitesnow.png';

const TeamSelectList = lazy(() => {
  return Promise.all([
      import('./TeamSelectList'),
      new Promise(resolve => setTimeout(resolve, 500))
  ])
  .then(([moduleExports]) => moduleExports);
});

const DetailPage = () => {  
  const navigate = useNavigate(); // 페이지 이동 훅

  const [post, setPost] = useState({}); // 경기글 상세정보 State
  const [user, setUser] = useState({}); // 현재 로그인한 사용자 정보 State

  const location = useLocation(); // 현재 위치 정보 훅
  const gameId = location.state.gameid; // gameID를 가져오기
  
  const [render, setRender] = useState(false);


  useEffect(() => { // 사용자 정보를 불러오는 useEffect
    // 최초 렌더링 및 리렌더링 시에 0.5초 후에 렌더링 활성화
    const timer = setTimeout(() => {
      setRender(true);
    }, 500);

    const fetchUser = async () => {
      try {
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        const response = await axios.get('http://110.165.17.35:8080/api/user/me', {
          headers:  { 
            Authorization: `Bearer ${access_token}`
          }});
        setUser(response.data); // 사용자 정보를 상태에 저장
      } catch (error) {
        console.error("서버에서 사용자 정보를 불러오지 못했습니다.", error);
        Swal.fire({
          icon: 'error',
          title: '사용자 정보 조회 오류',
          html: '서버에서 사용자 정보를 불러오는데 실패하였습니다. <br/> 다시 시도해 주십시오.'
        });
        navigate('/Home'); // 오류 발생 시 홈 페이지로 이동
      }
    };
    fetchUser();
    
    // cleanup 함수를 이용하여 컴포넌트가 언마운트되면 타이머를 정리
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { 
    fetchPost();
    }, [gameId]);

    const fetchPost = async () => { // 경기글의 상세 정보를 불러오기
      try {
        const access_token = JSON.parse(localStorage.getItem('access_token'));

        if (!access_token) {
          // 로그인이 되어 있지 않은 경우 경고창 출력 후 로그인 페이지로 이동
          Swal.fire({
            icon: 'error',
            title: '로그인이 필요한 기능입니다.',
          });
          navigate('/Login');
        }
        
        const response = await axios.get(`http://110.165.17.35:8080/api/game/detail/${gameId}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        setPost(response.data); // 게시물의 상세 정보를 상태에 저장
      } catch (error) { 
        console.error("서버에서 데이터를 불러오지 못했습니다.", error);
          Swal.fire({
            icon: 'error',
            title: '통신 오류',
            html: '서버에서 데이터를 불러오는데 실패하였습니다. <br/> 다시 시도해 주십시오.'
          });
          navigate('/Home'); // 오류 발생 시 홈 페이지로 이동
      }
    };

    const handleConfirm = async () => { // 인원 확정 버튼 메소드
      if (post.userId !== user.id) {
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
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        const response = await axios.patch(`http://110.165.17.35:8080/api/game/detail/${gameId}/progress`, {}, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '인원 확정 성공',
          text: '인원이 성공적으로 확정되었습니다.'
        });
        fetchPost();  // 인원 확정 후 게시물의 상세 정보 새로고침
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: '인원 확정 실패',
          text: '인원을 확정하는 중 오류가 발생했습니다.'
        });
      }
    };

    const handleResultConfirm = async (result) => { // 결과 확정 버튼 메소드
      try {
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        const response = await axios.patch('http://110.165.17.35:8080/api/game/after', {
          gameId: gameId,
          gameResult: result
        }, {headers: {Authorization: `Bearer ${access_token}`}});
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: '결과 확정 성공',
          text: '경기 결과가 성공적으로 확정되었습니다.'
        });
        fetchPost(); // 결과 확정 후 게시물의 상세 정보 새로고침
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: '결과 확정 실패',
          text: '결과를 확정하는 중 오류가 발생했습니다.'
        });
      }
    };
    
    const handleResultButtonClick = () => { // 경기 결과 선택창 메소드
      if (post.userId !== user.id) {
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
        confirmButtonColor: '#488BDB',
        denyButtonText: `무승부`,
        denyButtonColor: '#0FBB8E',
        cancelButtonText: `패배`,
        cancelButtonColor: '#EA344B'
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

    const handleDelete = () => { // 경기글 삭제 버튼 메소드
      Swal.fire({
        title: '해당 경기글을 정말 삭제하시겠습니까?',
        text: "삭제된 게시글은 다시 복구할 수 없습니다.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#488BDB',
        cancelButtonColor: '#EA344B',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const access_token = JSON.parse(localStorage.getItem('access_token'));
            const response = await axios.delete(`http://110.165.17.35:8080/api/game/delete/${gameId}`, {
              headers: {
                Authorization: `Bearer ${access_token}`
              }
            });
            Swal.fire({
                icon: 'success',
                title: '삭제 성공',
                text: '경기글이 성공적으로 삭제되었습니다.'
            });
            navigate('/Home'); // 게시물 삭제 후 홈 페이지로 이동
          } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '삭제 실패',
                html: '경기글을 삭제하는 중 오류가 발생했습니다. <br/> 다시 시도하여 주십시오'
            });
          }
        }
      })
    };

    function formatDate(dateString) { // 경기 시작시간 형식 지정 메소드
      const options = { month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleString('ko-KR', options);
    }

    function renderWeatherIcon(weatherType) {
      switch (weatherType) {
          case 'SUNNY':
              return (
                <>
                  <img src={SUNNY} alt="맑음" style={{ width: "30px", height: "30px" }} />
                  <span style={{ marginLeft: "5px" }}>맑음</span>
                </>
              );
          case 'CLOUDY':
              return (
                <>
                  <img src={CLOUDY} alt="흐림" style={{ width: "30px", height: "30px" }} />
                  <span style={{ marginLeft: "5px" }}>흐림</span>
                </>
              );
          case 'RAIN':
              return (
                <>
                  <img src={RAINY} alt="비" style={{ width: "30px", height: "30px" }} />
                  <span style={{ marginLeft: "5px" }}>비</span>
                </>
              );
          case 'SNOW':
              return (
                <>
                  <img src={SNOW} alt="눈" style={{ width: "30px", height: "30px" }} />
                  <span style={{ marginLeft: "5px" }}>눈</span>
                </>
              );
          default:
              return null;
      }
  }  
    
    return ( // 뷰를 구성하는 컴포넌트 레이아웃 부분
    <React.Fragment>
      <Container maxWidth="sm">  
      <Containers>
        <ImageContainer>       
            <FieldImage src={post.stadium?.imageUrl}/>
        </ImageContainer>
        <ContentContainer>
          <TitleText>{post.title}</TitleText><br/>
          <PlaceText>경기장 : {post.stadium?.name}</PlaceText>
          <ParticipantNumberText>최대 경기 인원 : {post.maxCapacity} 명</ParticipantNumberText>
          <DateText>경기 시작 시간 : {formatDate(post.startedAt)}</DateText>
          <WeatherText>경기 당일 날씨 : {renderWeatherIcon(post.stadium?.weatherType)}</WeatherText>
          <MainText>
            {post.content}
          </MainText>
        </ContentContainer>
        <TeamSelectionUI>
          <Suspense fallback={<div></div>}>
            {render && <TeamSelectList id={gameId} post={post}/>}
          </Suspense>
          </TeamSelectionUI>
        <ButtonContainer>
          {post.userId === user.id && <DeadlineButton disabled={!(post.status === 'BEFORE' && post.currentCapacity % 2 === 0)} onClick={handleConfirm}>인원 확정</DeadlineButton>}
          {post.userId === user.id && <ConfirmationButton disabled={!(post.status === 'PROGRESS' && differenceInSeconds(new Date(post.startedAt), new Date()) >= 10)} onClick={handleResultButtonClick}>결과 확정</ConfirmationButton>}
        </ButtonContainer>
        <DeleteButtonContainer>
          {post.userId === user.id && <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>}
        </DeleteButtonContainer>
      </Containers>
      </Container>
      </React.Fragment>
    );
  };
  // 여기서부터 컴포넌트 스타일 지정
  
  const Containers = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
    display : flex;
    flex-direction : column;
    align-items: center;
  `;
  
  const ImageContainer = styled.div`
    width: 100%;
    height: 40vh;
    display: flex;
    justify-content: center;
  `;

  const FieldImage = styled.img`
    width: 90%;
    height:100%;
    margin-top: 5%;
    border-radius: 10px;
  `;
  
  const ContentContainer = styled.div`
    width: 95%;
    height: auto;
    background-image: linear-gradient(to top left, #f5f5f5, #f5f5f5);
    border-radius: 15px;
    font-size: 1em;
    font-weight: 1000;
    margin-top: 10%;
    text-align: left;
    padding: 1em;
    box-sizing: border-box;
  `;

  const TitleText = styled.div`
    text-align: center;
    font-size: 1.2em;
    background-color: white;
    border-radius: 10px;
    padding-top: 1vh;
    padding-bottom: 1vh;
    height: 5vh;
    line-height: 5vh;
  `;
  
  const PlaceText = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 0.5vh;
    margin-bottom: 1vh;
    height: 4vh;
    line-height: 4vh;
    font-size: 1em;
  `;

  const ParticipantNumberText = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 0.5vh;
    margin-bottom: 1vh;
    height: 4vh;
    line-height: 4vh;
    font-size: 1em;
  `;

  const DateText = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 0.5vh;
    margin-bottom: 1vh;
    height: 4vh;
    line-height: 4vh;
    font-size: 1em;
  `;

  const WeatherText = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 0.5vh;
    margin-bottom: 1vh;
    height: 6vh;
    line-height: 4vh;
    font-size: 1em;
    display:flex;
    align-Items:center;
  `;

  const MainText = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 1vh;
    font-size: 1em;
    font-weight: 500;
    height: 40vh;
  `;
  
  const TeamSelectionUI = styled.div`
    width: 90%;
    height: auto;
    border-radius: 10px;
  `;
  
  const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10%;
    width:95%;
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
    color: white;
    background-color: ${props => props.disabled ? '#f5f5f5' : '#488BDB'}
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
    color: white;
    background-color: ${props => props.disabled ? '#f5f5f5' : '#EA344B'};
  `;  

  const DeleteButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 7.5%;
    width:95%;
  `;

  const DeleteButton = styled.button`
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    border-radius: 10px;
    border-color: white;
    width: 30%;
    height: 6vh;
  `;

export default DetailPage;