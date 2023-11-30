import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const ModifyProfile = () => {
  const navigate = useNavigate(); // 페이지 이동 훅

  const [originalValues, setOriginalValues] = useState({}); // 원래의 값을 저장할 상태
  const [currentValues, setCurrentValues] = useState({});   // 현재의 값을 저장할 상태

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

  const [publicProfile, setPublicProfile] = useState(false); // 프로필 공개 및 비공개 State
  const [publicInformation, setPublicInformation] = useState(false); // 사용자 정보 공개 및 비공개 State
  const [publicIntroduce, setPublicIntroduce] = useState(false); // 상태메세지 공개 및 비공개 State
  const [publicRecord, setPublicRecord] = useState(false); // 전적 공개 및 비공개 State

  useEffect(() => {
    const fetchUserData = async () => { // 사용자 뷰 화면 업데이트 메소드
      try {
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        const response = await axios.get('http://110.165.17.35:8080/api/user/me', {
          headers: {
            Authorization: `Bearer ${access_token}`}
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

        const data = {imageUrl, nickname, age, gender, region, height, weight, email,
          introduce, attacker, midfielder, defender, goalkeeper,
          publicProfile, publicInformation, publicIntroduce, publicRecord};

        setOriginalValues(data);
        setCurrentValues(data);

      } catch (error) { // 서버 통신 오류 발생시 경고창 출력
          console.error("서버에서 값을 가져오지 못했습니다.", error);
          Swal.fire({
            icon: 'error',
            title: '통신 오류',
            text: '서버에서 데이터를 불러오는데 실패하였습니다. 다시 시도해 주십시오'
          });
          navigate('/MyProfile');
      }
    };
    fetchUserData();
  }, []);

  const ProfileUpdate = async () => { // 저장버튼 메소드
    try {
      const data = {image_url: imageUrl, nickname, age, gender, region, height, weight, email,
        introduce, attacker, midfielder, defender, goalkeeper, is_public_profile: publicProfile,
        is_public_information: publicInformation, is_public_introduce: publicIntroduce, is_public_record: publicRecord};
      const access_token = JSON.parse(localStorage.getItem('access_token'));
      const response = await axios.put('http://110.165.17.35:8080/api/user/me', data, {
        headers: { 
          Authorization: `Bearer ${access_token}`
        }});
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: '저장 성공!',
        text: '프로필이 정상적으로 업데이트 되었습니다.'
      });
      navigate("/MyProfile");
    } catch (error) { // 서버 통신 에러 발생시 경고창 출력
      Swal.fire({
        icon: 'error',
        title: '저장 실패',
        html: "업데이트에 실패하였습니다. <br/> 다시 시도하여 주십시오"
      });
    }
  };

  const CancelButtonSave = () => { // 취소버튼 메소드
    if (JSON.stringify(originalValues) !== JSON.stringify(currentValues)) { // 원래의 값과 현재의 값이 다른지 비교
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

  const ProfileImageChange = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async function () {
        const base64String = reader.result.split(",")[1];
  
        try {
          const access_token = JSON.parse(localStorage.getItem('access_token'));
          const response = await axios.post('http://110.165.17.35:8080/api/user/image', { file: base64String }, {
            headers: {
              Authorization: `Bearer ${access_token}`
            }
          });
          const newProfileImage = response.data;
          setImageUrl(newProfileImage);
          setCurrentValues(prev => ({...prev, imageUrl: newProfileImage}));
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      };
    });
    fileInput.click();
  };
  

const UserInfoChange = (e) => {
  const { name, value } = e.target;
  switch (name) {
    case 'setNickname':
      setNickname(value);
      setCurrentValues(prev => ({...prev, nickname: value}));
      break;
    case 'setGender':
      setGender(value);
      setCurrentValues(prev => ({...prev, gender: value}));
      break;
    case 'setAge':
      setAge(Number(value));
      setCurrentValues(prev => ({...prev, age: Number(value)}));
      break;
    case 'setRegion':
      setRegion(value);
      setCurrentValues(prev => ({...prev, region: value}));
      break;
    case 'setHeight':
      setHeight(Number(value));
      setCurrentValues(prev => ({...prev, height: Number(value)}));
      break;
    case 'setWeight':
      setWeight(Number(value));
      setCurrentValues(prev => ({...prev, weight: Number(value)}));
      break;
    case 'setEmail':
      setEmail(value);
      setCurrentValues(prev => ({...prev, email: value}));
      break;
    default:
      console.error(`Invalid state name: ${name}`);
  }
};

const MessageChange = (e) => { // 상태 메세지 변경 메소드
  const newStatusMessage = e.target.value;
  setIntroduce(newStatusMessage);
  setCurrentValues(prev => ({...prev, introduce: newStatusMessage}));
};

const PositionCheck = (position, setPosition) => {
  setPosition(prev => {
    const newPosition = !prev;
    if (setPosition === setAttacker) {
      setCurrentValues(prevState => ({...prevState, attacker: newPosition}));
    } else if (setPosition === setMidfielder) {
      setCurrentValues(prevState => ({...prevState, midfielder: newPosition}));
    } else if (setPosition === setDefender) {
      setCurrentValues(prevState => ({...prevState, defender: newPosition}));
    } else if (setPosition === setGoalkeeper) {
      setCurrentValues(prevState => ({...prevState, goalkeeper: newPosition}));
    } else {
      console.error(`Invalid setPosition: ${setPosition}`);
    }
    return newPosition;
  });
};
  return ( // 뷰를 구성하는 컴포넌트 레이아웃 부분
    <Container>
      <ProfileBox>
        <UserImage src={imageUrl} onClick={ProfileImageChange} />
        <UserInfoBox>
          <InputLabel>
            닉네임 : 
            <Input type="text" name="setNickname" value={nickname} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            성별 : 
            <Input type="text" name="setGender" value={gender} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            나이 : 
            <Input type="text" name="setAge" value={age} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            지역 : 
            <Input type="text" name="setRegion" value={region} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            신장 : 
            <Input type="text" name="setHeight" value={height} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            체중 : 
            <Input type="text" name="setWeight" value={weight} onChange={UserInfoChange} />
          </InputLabel>
          <InputLabel>
            이메일 : 
            <Input type="text" name="setEmail" value={email} onChange={UserInfoChange} />
          </InputLabel>
        </UserInfoBox>
      </ProfileBox>
      <MessageBox>
        <TextAlign>
          <StatusMessageInput type="text" value={introduce} onChange={MessageChange} />
        </TextAlign>
      </MessageBox>
      <PreferBox>
        <PreferTitle>선호하는 포지션</PreferTitle>
        <PreferPositions>
          <PositionLabel color="#FF4D4D" checked={attacker} onClick={() => PositionCheck(attacker, setAttacker)}>
            <PositionButton
              name="position"
              checked={attacker}
              onChange={() => { }}
            />
            공격수
          </PositionLabel>
          <PositionLabel color="#0FBB8E" checked={midfielder} onClick={() => PositionCheck(midfielder, setMidfielder)}>
            <PositionButton
              name="position"
              checked={midfielder}
              onChange={() => { }}
            />
            미드필더
          </PositionLabel>
          <PositionLabel color="#0275D8" checked={defender} onClick={() => PositionCheck(defender, setDefender)}>
            <PositionButton
              name="position"
              checked={defender}
              onChange={() => { }}
            />
            수비수
          </PositionLabel>
          <PositionLabel color="#DF9A13" checked={goalkeeper} onClick={() => PositionCheck(goalkeeper, setGoalkeeper)}>
            <PositionButton
              name="position"
              checked={goalkeeper}
              onChange={() => { }}
            />
            골키퍼
          </PositionLabel>
        </PreferPositions>
      </PreferBox>
      <OnoffBox>
        <SwitchTitle>프로필 이미지 공개 여부</SwitchTitle>
        <ToggleSW checked={publicProfile} onClick={() => setPublicProfile(!publicProfile)}>
          <ToggleText>{publicProfile ? "공개　　　" : "비공개"}</ToggleText>
          <Slider checked={publicProfile} />
        </ToggleSW>
      </OnoffBox>
      <OnoffBox>
        <SwitchTitle>사용자 정보 공개 여부</SwitchTitle>
        <ToggleSW checked={publicInformation} onClick={() => setPublicInformation(!publicInformation)}>
          <ToggleText>{publicInformation ? "공개　　　" : "비공개"}</ToggleText>
          <Slider checked={publicInformation} />
        </ToggleSW>
      </OnoffBox>
      <OnoffBox>
        <SwitchTitle>상태메세지 공개 여부</SwitchTitle>
        <ToggleSW checked={publicIntroduce} onClick={() => setPublicIntroduce(!publicIntroduce)}>
          <ToggleText>{publicIntroduce ? "공개　　　" : "비공개"}</ToggleText>
          <Slider checked={publicIntroduce} />
        </ToggleSW>
      </OnoffBox>
      <OnoffBox>
        <SwitchTitle>전적 공개 여부</SwitchTitle>
        <ToggleSW checked={publicRecord} onClick={() => setPublicRecord(!publicRecord)}>
          <ToggleText>{publicRecord ? "공개　　　" : "비공개"}</ToggleText>
          <Slider checked={publicRecord} />
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
