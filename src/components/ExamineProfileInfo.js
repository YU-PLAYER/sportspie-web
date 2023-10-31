import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom';

const ExamineProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "손흥민",
    gender: "남자",
    age: "31세",
    location: "춘천시 후평동",
    height: "183cm",
    weight: "78kg",
    email: "abcdef.gmail.com"
  });
  const [statusMessage, setStatusMessage] = useState("안녕하세요:D");
  const [Forward, setForward] = useState(true);
  const [Midfielder, setMidfielder] = useState(true);
  const [Defender, setDefender] = useState(true);
  const [Goalkeeper, setGoalkeeper] = useState(true);
  const [record, setRecord] = useState({
    total: 10,
    win: 8,
    draw: 0,
    loes: 2
  });
  const [GameResult1, setGameResult1] = useState('Win');
  const [GameResult2, setGameResult2] = useState('Lose');
  const [GameResult3, setGameResult3] = useState('Win');
  const [GameResult4, setGameResult4] = useState('Win');
  const [GameResult5, setGameResult5] = useState('Win');
  const [GameResult6, setGameResult6] = useState('Win');
  const [GameResult7, setGameResult7] = useState('Win');
  const [GameResult8, setGameResult8] = useState('Win');
  const [GameResult9, setGameResult9] = useState('Lose');
  const [GameResult10, setGameResult10] = useState('Win');
  const [Enlarge, setEnlarge] = useState(false);

  const toEnlarge = () => {
    setEnlarge(true);
  };

  const toShrink = () => {
    setEnlarge(false);
  };

  const backToPage = () => {
    navigate.pop();
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user');
      const { profileImage, userInfo, statusMessage, Forward, Midfielder, Defender, Goalkeeper, record } = response.data;
      setProfileImage(profileImage);
      setUserInfo(userInfo);
      setStatusMessage(statusMessage);
      setForward(Forward);
      setMidfielder(Midfielder);
      setDefender(Defender);
      setGoalkeeper(Goalkeeper);
      setRecord(record);
    } catch (error) {
      console.error("업데이트에 실패하였습니다. : ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container>
      <ProfileBox>
        <UserImage src={profileImage} onClick={toEnlarge}/>
        {Enlarge && (
          <ProfileView onClick={toShrink}>
            <ImageView src={profileImage}/>
          </ProfileView>
      )}
        <UserInfoBox>
          이름 : {userInfo.name} <br/>
          성별 : {userInfo.gender} <br/>
          나이 : {userInfo.age} <br/>
          지역 : {userInfo.location} <br/>
          신장 : {userInfo.height} <br/>
          체중 : {userInfo.weight} <br/>
          이메일 : {userInfo.email}
        </UserInfoBox>
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
      </RecordBox>
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

const Record = styled.div`
  font-size: 1em;
  font-weight: bold;
`;

const RecordBoard = styled.div`
  display: grid;
  grid-template-row: repeat(2, 1fr);
  grid-template-columns: repeat(5, 1fr);
  width: 95%;
  height: 10vh;
  margin-top: 2vh;
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
  background-color: ${({ result }) => (result === 'Win' ? '#488BDB' : '#EA344B')};
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
`;

export default ExamineProfile; 
