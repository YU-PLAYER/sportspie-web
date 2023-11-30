import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const ExamineProfile = () => {
  // 비공개 기본 이미지
  const default_img = "https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"

  const navigate = useNavigate(); // 페이지 이동 훅

  const location = useLocation(); // 현재 위치 정보 훅
  let userId = location.state.userId; // userID를 가져오기

  const [imageUrl, setImageUrl] = useState(""); // 프로필 이미지 State

  const [nickname, setNickname] = useState(""); // 사용자 이름 State
  const [gender, setGender] = useState(""); // 사용자 성별 State
  const [age, setAge] = useState(0); // 사용자 나이 State
  const [region, setRegion] = useState(""); // 사용자 지역 State
  const [height, setHeight] = useState(0); // 사용자 신장 State
  const [weight, setWeight] = useState(0); // 사용자 체중 State
  const [email, setEmail] = useState(""); // 사용자 이메일 State

  const [introduce, setIntroduce] = useState(""); // 상태 메세지 State

  const [attacker, setAttacker] = useState(false);  // 선호 포지션(공격수) State
  const [midfielder, setMidfielder] = useState(false); // 선호 포지션(미드필더) State
  const [defender, setDefender] = useState(false); // 선호 포지션(수비수) State
  const [goalkeeper, setGoalkeeper] = useState(false); // 선호 포지션(골키퍼) State

  const [win, setWin] = useState(0); // 승리 State
  const [draw, setDraw] = useState(0); // 무승부 State
  const [lose, setLose] = useState(0); // 패배 State

  const [publicProfile, setPublicProfile] = useState(true); // 사용자 프로필 공개 여부 
  const [publicInformation, setPublicInformation] = useState(true); // 사용자 정보 공개 여부
  const [publicIntroduce, setPublicIntroduce] = useState(true); // 사용자 상태 메세지 공개 여부
  const [publicRecord, setPublicRecord] = useState(true); // 사용자 전적 공개 여부

  const [recent10, setRecent10] = useState([]); // 최근 10경기 승패 결과 State

  const [Enlarge, setEnlarge] = useState(false); // 프로필 이미지 확대 및 축소 State

  const toEnlarge = () => { // 이미지 확대
    setEnlarge(true);
  };

  const toShrink = () => { // 이미지 축소
    setEnlarge(false);
  };

  const backToPage = () => { // 뒤로가기 버튼
    navigate(-1);
  };

  const gameResultMap = { // 숫자와 결과를 매핑하는 객체
    0: "Win",
    1: "Draw",
    2: "Lose"
  };

  const fetchUserData = async () => { // 사용자 정보 조회 메소드
    try {
      const access_token = JSON.parse(localStorage.getItem('access_token'));
      const response = await axios.get(`http://110.165.17.35:8080/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      const {imageUrl, nickname, age, gender, region, height, weight, email,
        introduce, attacker, midfielder, defender, goalkeeper,
        publicProfile, publicInformation, publicIntroduce, publicRecord} = response.data;

      setImageUrl(imageUrl);
      setNickname(nickname);
      setAge(age);
      setGender(gender);
      setRegion(region);
      setHeight(height);
      setWeight(weight);
      setEmail(email);
      setIntroduce(introduce);
      setAttacker(attacker);
      setMidfielder(midfielder);
      setDefender(defender);
      setGoalkeeper(goalkeeper);
      setPublicProfile(publicProfile);
      setPublicInformation(publicInformation);
      setPublicIntroduce(publicIntroduce);
      setPublicRecord(publicRecord);

      const recordResponse = await axios.get(`http://110.165.17.35:8080/api/gameUser/history/${userId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      const { win, draw, lose, recent10 } = recordResponse.data;

      setWin(win);
      setDraw(draw);
      setLose(lose);
      setRecent10(recent10);
    } catch (error) { // 서버 통신 오류 발생시 경고창 출력
        Swal.fire({
          icon: 'error',
          title: '사용자 정보 조회 실패',
          text: "서버에서 데이터를 불러오는데 실패하였습니다. 다시 시도하여 주십시오"
    });
        navigate(-1);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return ( // 뷰를 구성하는 컴포넌트 레이아웃 부분
    <Container maxWidth="sm">
      <ProfileBox>
        <UserImage src={publicProfile ? imageUrl : default_img} onClick={toEnlarge} />
        {Enlarge && (
          <ProfileView onClick={toShrink}>
            <ImageView src={publicProfile ? imageUrl : default_img} />
          </ProfileView>
      )}
        {publicInformation ? (
          <UserInfoBox>
            닉네임 : {nickname} <br/>
            성별 : {gender} <br/>
            나이 : {age} 세<br/>
            지역 : {region} <br/>
            신장 : {height} cm<br/>
            체중 : {weight} kg<br/>
            이메일 : {email}
          </UserInfoBox> ) : (<PrivateUserInfoBox>비공개</PrivateUserInfoBox>)}
      </ProfileBox>
      <MessageBox>
        <TextAlign>
          {publicIntroduce ? introduce : "비공개"}
        </TextAlign>
      </MessageBox>
      <PreferBox>
        <PreferTitle>선호하는 포지션</PreferTitle>
        <PreferPositions>
          <ForwardPosition attacker={attacker}>공격수</ForwardPosition>
          <MidfielderPosition midfielder={midfielder}>미드필더</MidfielderPosition>
          <DefenderPosition defender={defender}>수비수</DefenderPosition>
          <GoalkeeperPosition goalkeeper={goalkeeper}>골키퍼</GoalkeeperPosition>
        </PreferPositions>
      </PreferBox>
      {publicRecord ? (
        <RecordBox>
          <Record>
            전체 전적 : {win + draw + lose}전 {win}승 {draw}무 {lose}패 /
            승률 : {((win / (win + draw + lose)) * 100).toFixed(1)}%
          </Record>
          <RecordBoard>
            {recent10.map((result, index) => (
              <Game key={index} result={gameResultMap[result]}>{gameResultMap[result]}</Game>
            ))}
            {Array(10 - recent10.length).fill().map((_, index) => (
              <Game key={index + recent10.length}></Game>
            ))}
          </RecordBoard>
        </RecordBox>) : (<PrivateRecordBox>전적 비공개</PrivateRecordBox>)}
      <BackToPageButton onClick={backToPage}>돌아가기</BackToPageButton>
    </Container>
  );
};

// 여기서부터 컴포넌트 스타일 지정

const Container = styled.div`
  width:100%;
  height:auto;
  text-align: left;
`;
const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
  height:100%;
`;
const UserImage = styled.img`
  cursor: pointer;
  border-radius: 50%;
  width: 40%;
  height: 20vh;
  margin-top: 5%;
  margin-left: 5%;
`;

const UserInfoBox = styled.div`
  width: 40%;
  background-color: #f5f5f5;
  border-radius: 10%;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 2em;
  padding-bottom: 2em;
  margin-top: 5%;
  margin-right: 5%;
  font-size: 0.75em;
`;

const PrivateUserInfoBox = styled.div`
  width: 40%;
  background-color: #f5f5f5;
  border-radius: 10%;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 2em;
  padding-bottom: 2em;
  margin-top: 5%;
  margin-right: 5%;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  line-height: 5em;
}
`;

const MessageBox = styled.div`
  width: 90%;
  margin-left: 5%;
  background-color: #f5f5f5;
  font-size: 0.8em;
  font-weight: 500;
  text-align: center;
  margin-top: 5%;
  border-radius: 5px;
`;

const TextAlign = styled.div`
  line-height: 3em;
`;

const PreferTitle = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-left: 5%;
`;

const PreferBox = styled.div`
  margin-top: 5%;
`;

const PreferPositions = styled.div`
  margin-top: 2vh;
  display: flex;
  align-items: center;
`;

const ForwardPosition = styled.div`
  width: 18%;
  height: 2em;
  font-size: 1em;
  font-weight: bold;
  color: white;
  background-color: #FF4D4D;
  text-align: center;
  line-height: 2em;
  margin-left: 5%;
  border-radius: 15px;
  display: ${({ attacker }) => (attacker ? 'block' : 'none')};;
`;

const MidfielderPosition = styled.div`
  width: 18%;
  height: 2em;
  font-size: 1em;
  font-weight: bold;
  color: white;
  background-color: #0FBB8E;
  text-align: center;
  line-height: 2em;
  margin-left: 5%;
  border-radius: 15px;
  display: ${({ midfielder }) => (midfielder ? 'block' : 'none')};
`;

const DefenderPosition = styled.div`
  width: 18%;
  height: 2em;
  font-size: 1em;
  font-weight: bold;
  color: white;
  background-color: #0275D8;
  text-align: center;
  line-height: 2em;
  margin-left: 5%;
  border-radius: 15px;
  display: ${({ defender }) => (defender ? 'block' : 'none')};
`;

const GoalkeeperPosition = styled.div`
  width: 18%;
  height: 2em;
  font-size: 1em;
  font-weight: bold;
  color: white;
  background-color: #DF9A13;
  text-align: center;
  line-height: 2em;
  margin-left: 5%;
  border-radius: 15px;
  display: ${({ goalkeeper }) => (goalkeeper ? 'block' : 'none')};
`;

const RecordBox = styled.div`
  margin-top: 5%;
  margin-left 5%;
`;

const PrivateRecordBox = styled.div`
  margin-top: 5%;
  margin-left: 5%;
  border-radius: 5px;
  width: 90%;
  height: 20vh;
  background-color: #f5f5f5;
  font-size: 1em;
  font-weight: 1000;
  text-align: center;
  line-height: 10em;
`;

const Record = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-left: 5%;
`;

const RecordBoard = styled.div`
  display: grid;
  grid-template-row: repeat(2, 1fr);
  grid-template-columns: repeat(5, 1fr);
  width: 90%;
  height: 10vh;
  margin-top: 2vh;
  margin-left: 5%;
  border: 1px solid;
  border-color: white;
  border-radius: 5px;
`;

const Game = styled.div`
  border: 1px solid;
  text-align: center;
  line-height: 2em;
  color: white;
  border-radius: 5px;
  background-color: ${({ result }) =>
  (result === 'Win' ? '#488BDB' :
    (result === 'Lose' ? '#EA344B' :
      (result === 'Draw' ? '#0FBB8E' : '#f5f5f5')))};
`;

const ProfileView = styled.div`
  position: fixed;
  top:0;
	left:0;
	width :100%;
	height :100%;
	background-color : rgba(0,0,0,0.5);
	display:flex;
	align-items:center;	
`;

const ImageView = styled.img`
	width:100%;
	height:auto;	
`;

const BackToPageButton = styled.button`
  background-color: #F5F5F5;
  border: 1px solid white;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 30%;
  height: 5vh;
  margin-left: 35%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

export default ExamineProfile; 