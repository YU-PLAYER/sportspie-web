import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import default_img from '../images/default_img.jpg';

const ExamineProfile = (props) => {
  const navigate = useNavigate(); // 페이지 이동 훅

  const [profileImage, setProfileImage] = useState(""); // 프로필 이미지 State

  const [userInfo, setUserInfo] = useState({ // 사용자 정보 State
    nickname: "손흥민",
    gender: "남자",
    age: "31세",
    location: "춘천시 후평동",
    height: "183cm",
    weight: "78kg",
    email: "abcdef.gmail.com"
  });

  const [statusMessage, setStatusMessage] = useState("안녕하세요:D"); // 상태 메세지 State

  const [Forward, setForward] = useState(true); // 선호 포지션(공격수) State
  const [Midfielder, setMidfielder] = useState(true); // 선호 포지션(미드필더) State
  const [Defender, setDefender] = useState(true); // 선호 포지션(수비수) State
  const [Goalkeeper, setGoalkeeper] = useState(true); // 선호 포지션(골키퍼) State

  const [record, setRecord] = useState({ // 전적 및 승률 State
    total: 9,
    win: 3,
    draw: 3,
    loes: 3
  });

  const [GameResult1, setGameResult1] = useState('Win'); // 최근 경기 승패 결과 State
  const [GameResult2, setGameResult2] = useState('Lose'); // 최근 경기 승패 결과 State
  const [GameResult3, setGameResult3] = useState('Draw'); // 최근 경기 승패 결과 State
  const [GameResult4, setGameResult4] = useState('Win'); // 최근 경기 승패 결과 State
  const [GameResult5, setGameResult5] = useState('Lose'); // 최근 경기 승패 결과 State
  const [GameResult6, setGameResult6] = useState('Draw'); // 최근 경기 승패 결과 State
  const [GameResult7, setGameResult7] = useState('Win'); // 최근 경기 승패 결과 State
  const [GameResult8, setGameResult8] = useState('Lose'); // 최근 경기 승패 결과 State
  const [GameResult9, setGameResult9] = useState('Draw'); // 최근 경기 승패 결과 State
  const [GameResult10, setGameResult10] = useState(''); // 최근 경기 승패 결과 State

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

  const fetchUserData = async () => { // 사용자 정보 조회 메소드
    try {
      const response = await axios.get(`http://223.130.147.184:8080/api/${props.userId}`);
      const { isProfileImageVisible, isUserInfoVisible, isStatusMessageVisible, isRecordVisible,
        profileImage, userInfo, statusMessage, Forward, Midfielder, Defender, Goalkeeper, record,
        GameResult1, GameResult2, GameResult3, GameResult4, GameResult5,
        GameResult6, GameResult7, GameResult8, GameResult9, GameResult10 } = response.data;

      setProfileImage(isProfileImageVisible ? profileImage : default_img);
      setUserInfo(isUserInfoVisible ? userInfo : {});
      setStatusMessage(isStatusMessageVisible ? statusMessage : "비공개");
      setForward(Forward);
      setMidfielder(Midfielder);
      setDefender(Defender);
      setGoalkeeper(Goalkeeper);
      setRecord(isRecordVisible ? record : {});
      setGameResult1(GameResult1);
      setGameResult2(GameResult2);
      setGameResult3(GameResult3);
      setGameResult4(GameResult4);
      setGameResult5(GameResult5);
      setGameResult6(GameResult6);
      setGameResult7(GameResult7);
      setGameResult8(GameResult8);
      setGameResult9(GameResult9);
      setGameResult10(GameResult10);
    } catch (error) { // 서버 통신 오류 발생시 경고창 출력
      Swal.fire({
        icon: 'error',
        title: '조회 실패',
        text: "서버와의 통신에 실패하였습니다. 다시 시도하여 주십시오"
      });
      //      navigate(-1);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return ( // 뷰를 구성하는 컴포넌트 레이아웃 부분
    <Container>
      <ProfileBox>
        <UserImage src={profileImage} onClick={toEnlarge} />
        {Enlarge && (
          <ProfileView onClick={toShrink}>
            <ImageView src={profileImage} />
          </ProfileView>
        )}
        {userInfo ? (
          <UserInfoBox>
            닉네임 : {userInfo.nickname} <br />
            성별 : {userInfo.gender} <br />
            나이 : {userInfo.age} <br />
            지역 : {userInfo.location} <br />
            신장 : {userInfo.height} <br />
            체중 : {userInfo.weight} <br />
            이메일 : {userInfo.email}
          </UserInfoBox>) : (<PrivateUserInfoBox>비공개</PrivateUserInfoBox>)}
      </ProfileBox>
      <MessageBox>
        <TextAlign>
          {statusMessage}
        </TextAlign>
      </MessageBox>
      <PreferBox>
        <PreferTitle>선호하는 포지션</PreferTitle>
        <PreferPositions>
          <ForwardPosition forward={Forward}>공격수</ForwardPosition>
          <MidfielderPosition midfielder={Midfielder}>미드필더</MidfielderPosition>
          <DefenderPosition defender={Defender}>수비수</DefenderPosition>
          <GoalkeeperPosition goalkeeper={Goalkeeper}>골키퍼</GoalkeeperPosition>
        </PreferPositions>
      </PreferBox>
      {record ? (
        <RecordBox>
          <Record>
            전체 전적 : {record.total}전 {record.win}승 {record.draw}무 {record.loes}패 /
            승률 : {((record.win / record.total) * 100).toFixed(1)}%
          </Record>
          <RecordBoard>
            <Game result={GameResult1}>{GameResult1}</Game>
            <Game result={GameResult2}>{GameResult2}</Game>
            <Game result={GameResult3}>{GameResult3}</Game>
            <Game result={GameResult4}>{GameResult4}</Game>
            <Game result={GameResult5}>{GameResult5}</Game>
            <Game result={GameResult6}>{GameResult6}</Game>
            <Game result={GameResult7}>{GameResult7}</Game>
            <Game result={GameResult8}>{GameResult8}</Game>
            <Game result={GameResult9}>{GameResult9}</Game>
            <Game result={GameResult10}>{GameResult10}</Game>
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
  display: ${({ forward }) => (forward ? 'block' : 'none')};;
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
  margin-left 5%;
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