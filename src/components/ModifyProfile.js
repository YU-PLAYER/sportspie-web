import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const ModifyProfile = () => {
  const navigate = useNavigate(); // 페이지 이동 훅

  const [originalValues, setOriginalValues] = useState({}); // 원래의 값을 저장할 상태
  const [currentValues, setCurrentValues] = useState({});   // 현재의 값을 저장할 상태

  useEffect(() => {
    const fetchUserData = async () => { // 사용자 뷰 화면 업데이트 메소드
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.get('http://115.85.182.229:8080/api/', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }); 
        const {profileImage, userInfo, statusMessage, Forward, Midfielder, Defender, Goalkeeper,
          isProfileImageVisible, isUserInfoVisible, isStatusMessageVisible, isRecordVisible} = response.data;     
          
          setProfileImage(profileImage);
          setUserInfo(userInfo);
          setStatusMessage(statusMessage);
          setForward(Forward);
          setMidfielder(Midfielder);
          setDefender(Defender);
          setGoalkeeper(Goalkeeper);
          setIsProfileImageVisible(isProfileImageVisible);
          setIsUserInfoVisible(isUserInfoVisible);
          setIsStatusMessageVisible(isStatusMessageVisible);
          setIsRecordVisible(isRecordVisible);

        const data = {profileImage, userInfo, statusMessage, Forward, Midfielder, Defender, Goalkeeper,
          isProfileImageVisible, isUserInfoVisible, isStatusMessageVisible, isRecordVisible};

          setOriginalValues(data);
          setCurrentValues(data);

      } catch (error) { // 서버 통신 오류 발생시 경고창 출력
          console.error("서버에서 값을 가져오지 못했습니다.", error);
          Swal.fire({
            icon: 'error',
            title: '통신 오류',
            text: '서버에서 데이터를 가져오는데 실패하였습니다. 다시 시도해 주십시오'
          });
  //        navigate('./MyProfile');
      }
    };
    fetchUserData();
  }, []);

  const [profileImage, setProfileImage] = useState(""); // 프로필 이미지 State

  const [userInfo, setUserInfo] = useState({ // 사용자 정보 State
    name: "손흥민",
    gender: "남자",
    age: "31세",
    location: "춘천시 후평동",
    height: "183cm",
    weight: "78kg",
    email: "abcdef.gmail.com"
  });

  const [statusMessage, setStatusMessage] = useState("안녕하세요:D"); // 상태 메세지 State

  const [Forward, setForward] = useState(false); // 선호 포지션(공격수) State
  const [Midfielder, setMidfielder] = useState(true); // 선호 포지션(미드필더) State
  const [Defender, setDefender] = useState(false); // 선호 포지션(수비수) State
  const [Goalkeeper, setGoalkeeper] = useState(true); // 선호 포지션(골키퍼) State

  const [isProfileImageVisible, setIsProfileImageVisible] = useState(true); // 프로필 공개 및 비공개 State
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(true); // 사용자 정보 공개 및 비공개 State
  const [isStatusMessageVisible, setIsStatusMessageVisible] = useState(true); // 상태메세지 공개 및 비공개 State
  const [isRecordVisible, setIsRecordVisible] = useState(true); // 전적 공개 및 비공개 State

  const ProfileUpdate = async () => { // 저장버튼 메소드
    try {
      const data = {profileImage, userInfo, statusMessage, Forward, Midfielder, Defender, Goalkeeper,
        isProfileImageVisible, isUserInfoVisible, isStatusMessageVisible, isRecordVisible};
      const access_token = localStorage.getItem('access_token');
      const response = await axios.put('http://115.85.182.229:8080/api/', data, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      console.log(response.data); 
      Swal.fire({
        icon: 'success',
        title: '저장 성공!',
        text: '프로필이 정상적으로 업데이트 되었습니다.'
      }); 
      navigate("./MyProfile");
    } catch (error) { // 서버 통신 에러 발생시 경고창 출력
      Swal.fire({
        icon: 'error',
        title: '저장 실패',
        text: "업데이트에 실패하였습니다. 다시 시도하여 주십시오"
      }); 
    }
  };

  const CancelButtonSave = () => { // 취소버튼 메소드
    if(JSON.stringify(originalValues) !== JSON.stringify(currentValues)) { // 원래의 값과 현재의 값이 다른지 비교
      Swal.fire({
        icon: 'warning',
        title: '변동된 값이 있습니다',
        text: '변동사항을 저장하시겠습니까?',
        showDenyButton: true,
        confirmButtonText: '예',
        denyButtonText: '아니오',
      }).then((result) => {
        if (result.isConfirmed) {
          ProfileUpdate();
        } else if (result.isDenied) {
          navigate('/MyProfile'); 
        }
      })
    } else {
      navigate('/MyProfile'); 
    }
  };

  const ProfileImageChange = () => { // 프로필 이미지 변경 메소드
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfileImage = reader.result;
        setProfileImage(newProfileImage);
        setCurrentValues(prev => ({...prev, profileImage: newProfileImage}));
      };
      reader.readAsDataURL(file);
    });
    fileInput.click();
};

const UserInfoChange = (e) => { // 사용자 정보 변경 메소드
    const { name, value } = e.target;
    setUserInfo((prevState) => {
      const newUserInfo = {...prevState, [name]: value};
      setCurrentValues(prev => ({...prev, userInfo: newUserInfo}));
      return newUserInfo;
    });
};

const MessageChange = (e) => { // 상태 메세지 변경 메소드
    const newStatusMessage = e.target.value;
    setStatusMessage(newStatusMessage);
    setCurrentValues(prev => ({...prev, statusMessage: newStatusMessage}));
};

const PositionCheck = (position, setPosition) => { // 선호 포지션 변경 메소드
    setPosition(prev => {
      const newPosition = !prev;
      setCurrentValues(prevState => ({...prevState, [position]: newPosition}));
      return newPosition;
    });
};

  return ( // 뷰를 구성하는 컴포넌트 레이아웃 부분
    <Container>
      <ProfileBox>
        <UserImage src={profileImage} onClick={ProfileImageChange}/>
        <UserInfoBox>
          <InputLabel>
            이름 : 
            <Input type="text" name="name" value={userInfo.name} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            성별 : 
            <Input type="text" name="gender" value={userInfo.gender} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            나이 : 
            <Input type="text" name="age" value={userInfo.age} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            지역 : 
            <Input type="text" name="location" value={userInfo.location} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            신장 : 
            <Input type="text" name="height" value={userInfo.height} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            체중 : 
            <Input type="text" name="weight" value={userInfo.weight} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            이메일 : 
            <Input type="text" name="email" value={userInfo.email} onChange={UserInfoChange} />
          </InputLabel>
        </UserInfoBox>
      </ProfileBox>
      <MessageBox>
        <TextAlign>
          <StatusMessageInput type="text" value={statusMessage} onChange={MessageChange} />
        </TextAlign>
      </MessageBox>
      <PreferBox>
        <PreferTitle>선호하는 포지션</PreferTitle>
        <PreferPositions>
          <PositionLabel color="#FF4D4D" checked={Forward} onClick={() => PositionCheck(Forward, setForward)}>
            <PositionButton
              name="position"
              checked={Forward}
              onChange={() => {}}
            />
            공격수
          </PositionLabel>
          <PositionLabel color="#0FBB8E" checked={Midfielder} onClick={() => PositionCheck(Midfielder, setMidfielder)}>
            <PositionButton
              name="position"
              checked={Midfielder}
              onChange={() => {}}
            />
            미드필더
          </PositionLabel>
          <PositionLabel color="#0275D8" checked={Defender} onClick={() => PositionCheck(Defender, setDefender)}>
            <PositionButton
              name="position"
              checked={Defender}
              onChange={() => {}}
            />
            수비수
          </PositionLabel>
          <PositionLabel color="#DF9A13" checked={Goalkeeper} onClick={() => PositionCheck(Goalkeeper, setGoalkeeper)}>
            <PositionButton
              name="position"
              checked={Goalkeeper}
              onChange={() => {}}
            />
            골키퍼
          </PositionLabel>
        </PreferPositions>
      </PreferBox>
      <OnoffBox>
        <SwitchTitle>프로필 이미지 공개 여부</SwitchTitle>
        <ToggleSW checked={isProfileImageVisible} onClick={() => setIsProfileImageVisible(!isProfileImageVisible)}>
          <ToggleText>{isProfileImageVisible ? "공개　　　" : "비공개"}</ToggleText>
          <Slider checked={isProfileImageVisible} />
        </ToggleSW>
      </OnoffBox>
      <OnoffBox>
        <SwitchTitle>사용자 정보 공개 여부</SwitchTitle>
        <ToggleSW checked={isUserInfoVisible} onClick={() => setIsUserInfoVisible(!isUserInfoVisible)}>
          <ToggleText>{isUserInfoVisible ? "공개　　　" : "비공개"}</ToggleText>
          <Slider checked={isUserInfoVisible} />
        </ToggleSW>
      </OnoffBox>
      <OnoffBox>
        <SwitchTitle>상태메세지 공개 여부</SwitchTitle>
        <ToggleSW checked={isStatusMessageVisible} onClick={() => setIsStatusMessageVisible(!isStatusMessageVisible)}>
          <ToggleText>{isStatusMessageVisible ? "공개　　　" : "비공개"}</ToggleText>
          <Slider checked={isStatusMessageVisible} />
        </ToggleSW>
      </OnoffBox>
      <OnoffBox>
        <SwitchTitle>전적 공개 여부</SwitchTitle>
        <ToggleSW checked={isRecordVisible} onClick={() => setIsRecordVisible(!isRecordVisible)}>
          <ToggleText>{isRecordVisible ? "공개　　　" : "비공개"}</ToggleText>
          <Slider checked={isRecordVisible} />
        </ToggleSW>
      </OnoffBox>
      <CancelButton onClick={CancelButtonSave}>취소하기</CancelButton>
      <SaveButton onClick={ProfileUpdate}>저장하기</SaveButton>
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
  background-color: #f5f5f5;
  border-radius: 10%;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  width: 40%;
  margin-top: 5%;
  margin-right: 5%;
`;

const MessageBox = styled.div`
  width: 90%;
  margin-left: 5%;
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

const PositionButton = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute;
  width: 10%;
  height: 3%;
  cursor: pointer;
`;

const PositionLabel = styled.label`
  width: ${({ checked }) => (checked ? '19%' : '18%')};
  height: ${({ checked }) => (checked ? '2.1em' : '2em')};
  font-size: ${({ checked }) => (checked ? '1.1em' : '1em')};
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 2em;
  margin-left: 5%;
  border-radius: 15px;
  background-color: ${({ checked, color }) => (checked ? color : '#ccc')};
  display: inline-block;
  cursor: pointer;
  transition: font-size 0.3s ease-in-out;
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.75em;
  font-weight:bold;
`;

const Input = styled.input`
  flex: 1;
  width: 0%;
  height: 1vh;
  padding: 1em;
  font-size: 0.75em;
  font-weight:bold;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-left: 0.5em;
  
`;

const StatusMessageInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const OnoffBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-top: 5%;
`;

const SwitchTitle = styled.div`
  margin-left: 5%;
  font-size: 1em;
  font-weight: 1000;
  line-height: 2em;
`;

const ToggleSW = styled.div`
  position: relative;
  margin-right: 5%;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.checked ? "#23A8F2" : "#ccc"};
  border-radius: 30px;
  padding: 0.5em 1em;
  cursor: pointer;
`;

const Slider = styled.span`
  position: absolute;
  left: ${props => props.checked ? "auto" : "1vw"};
  right: ${props => props.checked ? "1vw" : "auto"};
  height: 3.5vh;
  width: 30%;
  background-color: white;
  border-radius: 50%;
  transition: .5s;
  `;

const ToggleText = styled.span`
  font-size: 0.8em;
  color: white;
  margin-left: auto;
`;

const CancelButton = styled.button`
  background-color: #F5F5F5;
  border: 1px solid white;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 30%;
  height: 5vh;
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const SaveButton = styled.button`
  background-color: #F5F5F5;
  border: 1px solid white;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 30%;
  height: 5vh;
  margin-left: 30%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

export default ModifyProfile;
