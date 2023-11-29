import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Textarea from '@mui/joy/Textarea';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import SelectStadium from './selectStadium.js';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import 'dayjs/locale/ko';
import axios from 'axios';

/* "authorId": 0,
"title": "string",
"maxCapacity": 0,
"startedAt": "2023-11-16T11:32:00",
"stadiumId": 0,
"content": "string" */

export default function Write() {
  
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [authorId, setAuthorId] = useState(1);

  useEffect(() => { // 사용자 정보를 불러오는 useEffect
    const fetchUser = async () => {
      try {
        const access_token = JSON.parse(localStorage.getItem('access_token'));
        console.log(access_token);
        const response = await axios.get('http://110.165.17.35:8080/api/user/me', {
          headers:  { Authorization: `Bearer ${access_token}`},
        },);
        setUser(response.data); // 사용자 정보를 상태에 저장
        setAuthorId(response.data.id);
        console.log(response.data);
      } catch (error) {
        console.error("로그인되어 있지 않거나 사용자를 불러오지 못하였습니다.", error);
        Swal.fire({
          icon: 'error',
          title: '사용자 정보 조회 오류',
          text: '서버에서 사용자 정보를 불러오는데 실패하였습니다. 다시 시도해 주십시오.'
        });
        navigate('/Login'); // 오류 발생 시 홈 페이지로 이동
      }
    };
    fetchUser();
  }, []);
  
  var DefaultTitle = [
    "풋살 즐겜하실 멤버 구합니다!", 
    "가볍게 풋살하실 멤버 모집합니다~", 
    "심심한데 축구 한 판 어때요?",
    "다치지 않게 경기해요",
    "같이 공 찰 분 모집합니다."
  ];
  var random_index = Math.floor(Math.random() * DefaultTitle.length);
  var random_Title = DefaultTitle[random_index];

  const [title, setTitle] = useState(random_Title);
  const [maxCapacity, setMaxCapacity] = useState("");
  const [stadiumId, setStadiumId] = useState("");
  const [stadium, setStadium] = useState("");
  const [content, setContent] = useState("");

  const [isTitleOK, setIsTitleOK] = useState(true);
  const [isContentOK, setisContentOK] = useState(true);
  const [isStadiumIdOK, setIsStadiumIdOK] = useState(false);
  const [isMaxCapacityOK, setisMaxCapacityOK] = useState(false);

  const [startedAt,setStartedAt] = useState("");
  var startedDate = String(dayjs().format('YYYY-MM-DD'));
  var statedTime = String(dayjs().format('HH:mm:ss'));

  const handleTitle = e => {
    if (e.key == "Enter") e.preventDefault();
    if (e.target.value.length > 20) alert("방제목은 20글자까지만 가능합니다.");
    else setTitle(e.target.value);
  };

  useEffect(() => {
    setStadium(stadium);
    if (stadium == '비산실내풋살파크') {
      setStadiumId(1);
    } else if (stadium == '대구풋살') {
      setStadiumId(2);
    } else if (stadium == '상인풋살장') {
      setStadiumId(3);
    } else if (stadium == '월배S풋살파크') {
      setStadiumId(4);
    } else if (stadium == 'LFC 엘에프씨 풋살파크 두류점') {
      setStadiumId(5);
    } else if (stadium == '팔공K스타디움') {
      setStadiumId(6);
    } else if (stadium == '유천풋살') {
      setStadiumId(7);
    } else if (stadium == 'DS풋볼아카데미 실내풋살장') {
      setStadiumId(8);
    } else if (stadium == '첼시풋살') {
      setStadiumId(9);
    } else if (stadium == '라온풋살파크 월배점') {
      setStadiumId(10);
    } else {
      console.log("err")
    }
  }, [stadium]);

  const handleDataChange = (newData) => {
    setStadium(newData);
  };

  const handleContent = e => {
    setContent(e.target.value);
  };

  const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {

    useEffect(() => { }, [maxCapacity]);

    return (
      <BaseNumberInput
        slots={{
          root: StyledInputRoot,
          input: StyledInput,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          incrementButton: {
            children: <AddIcon fontSize="small" />,
            className: 'increment',
          },
          decrementButton: {
            children: <RemoveIcon fontSize="small" />,
          },
        }}
        {...props}
        ref={ref}
        value={maxCapacity}
        onChange={(event, val) => setMaxCapacity(val)}
      />
    );
  });

  const post_btn = () => { //작성하기 버튼 클릭시 동작
    
    var alert_text="";
    setIsTitleOK(false);
    setisContentOK(false);
    setisMaxCapacityOK(false);
    setIsStadiumIdOK(false);

    if (title.length < 2) {
      alert_text = alert_text.concat('방제목을 2글자 이상 입력해 주세요.<br>');
      setIsTitleOK(false);
    } else setIsTitleOK(true);
    if (content.length < 10) {
      alert_text = alert_text.concat('경기글 상세 내역을 10글자 이상 입력해 주세요.<br>');
      setisContentOK(false);
    } else setisContentOK(true);
    if(maxCapacity == ""){
      alert_text = alert_text.concat('참여가능 최대 인원을 입력해 주세요.<br>');
      setisMaxCapacityOK(false);
    } else setisMaxCapacityOK(true);
    if(stadiumId == ""){
      alert_text = alert_text.concat('경기장을 선택해 주세요.<br>');
      setIsStadiumIdOK(false);
    } else setIsStadiumIdOK(true);
    if(((isTitleOK && isContentOK) && (isStadiumIdOK && isMaxCapacityOK)) || alert_text=="") {
      console.log("-----게시글 작성 내용-----");
      console.log("AuthorID: " + authorId);
      console.log("title: " + title);
      console.log("maxCapacity: " + maxCapacity);
      console.log("startedAt: " + startedAt);
      console.log("stadiumId: " + stadiumId);
      console.log("content: " + content);
      console.log("-----게시글 작성 요청-----");
      
      try {
        const response = axios.post('http://110.165.17.35:8080/api/game', {
          authorId: authorId,
          title: title,
          maxCapacity: maxCapacity,
          startedAt: startedAt,
          stadiumId: stadiumId,
          content: content
        });

        console.log(response);
        Swal.fire({
          icon: 'success',
          text: '경기글 작성에 성공하였습니다.'
        }).then(navigate('/Home'));
      } catch (err) {
        console.log(err);
        console.log("작성 요청 실패");
      }
    } else {
      Swal.fire({
        icon: 'warning',
        html: alert_text
      }); 
    }
       
  }

  const cancel_btn = () => {
    Swal.fire({ // 한번 더 되묻는 경고창 출력
      icon: 'warning',
      title: '경기글 작성을 취소하시겠습니까?',
      text: '작성한 경기 인원 모집 내용이 전부 사라집니다.',
      showCancelButton: true,
      confirmButtonColor: '#488BDB',
      cancelButtonColor: '#EA344B',
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then(function(result){
      if(result.isConfirmed==true) navigate('/Home');
    })
  }

  return (
    <React.Fragment>

      <Box sx={{ height: '20px' }} />

      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '250px', borderRadius: 5, boxShadow: 3, textAlign: "center" }}>
          <Box sx={{ height: '20px' }} />
          경기글 작성
          <Box sx={{ height: '20px' }} />
          <Container maxWidth="sm">

            {isTitleOK == true ?
              <TextField label="제목"
                sx={{
                  width: 300,
                  maxWidth: '100%',
                }}
                className="title" name="Outlined" maxRows={1} placeholder="방 제목" variant="outlined"
                inputProps={{ maxLength: 20 }} type="text"
                value={title} onChange={handleTitle} />
              :
              <TextField error label="제목"
                sx={{
                  width: 300,
                  maxWidth: '100%',
                }}
                className="title" name="Outlined" maxRows={1} placeholder="방 제목" variant="outlined"
                inputProps={{ maxLength: 20 }} type="text"
                value={title} onChange={handleTitle}
                helperText="제목을 2글자 이상 입력해 주세요." />
            }

            <Box sx={{ height: '30px' }} />
            최대 참여 인원
            <Box sx={{ height: '15px' }} />
            <NumberInput min={2} max={40} step={2} />
          </Container>
        </Box>
        <Box sx={{ height: '20px' }} />
      </Container>

      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '500px', borderRadius: 5, boxShadow: 3, textAlign: "center" }}>
          <Box sx={{ height: '20px' }} />
          날짜 및 시간
          <Box sx={{ height: '20px' }} />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <DemoContainer components={['DateCalendar']}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <DateCalendar
                views={['year', 'month', 'day']}
                minDate={dayjs()}
                onChange={(newValue) => {
                  console.log(dayjs(newValue).format('YYYY-MM-DD'));
                  startedDate = (dayjs(newValue).format('YYYY-MM-DD'));
                }}
              />
            </DemoContainer>
            <DemoContainer components={['TimePicker']}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
              <TimePicker label="시간 선택" sx={{ bgcolor: 'white' }}
                onChange={(newValue) => {
                  console.log(dayjs(newValue).format("HH:mm:ss"));
                  statedTime = dayjs(newValue).format("HH:mm:ss");
                  setStartedAt(startedDate + "T" + statedTime);
                  console.log("Started Time : " + statedTime);
                  console.log(startedAt);
                }} />
            </DemoContainer>
          </LocalizationProvider>
          <Box sx={{ height: '20px' }} />

          <Box sx={{ height: '20px' }} />
        </Box>
        <Box sx={{ height: '20px' }} />
      </Container>

      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '250px', borderRadius: 5, boxShadow: 3, textAlign: "center" }}>
          <Box sx={{ height: '20px' }} />
          장소 선택
          <Box sx={{ height: '20px' }} />
          <SelectStadium onDataChange={handleDataChange} />
        </Box>
        <Box sx={{ height: '20px' }} />
      </Container>

      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '580px', borderRadius: 5, boxShadow: 3, textAlign: "center" }}>
          <Box sx={{ height: '20px' }} />
          글 상세내용
          <Box sx={{ height: '20px' }} />
          <Container maxWidth="sm">
            <Box
              sx={{
                maxWidth: '100%',
              }}
            >

              {isContentOK == true ?
                <Textarea fullWidth label="fullWidth" id="fullWidth"
                  minRows={20} maxRows={20} placeholder="경기글 상세내역"
                  value={content} onChange={handleContent} />
                :
                <Textarea fullWidth label="fullWidth" id="fullWidth"
                  minRows={20} maxRows={20} placeholder="경기글 상세내역을 10글자 이상 입력해 주세요."
                  value={content} onChange={handleContent}
                  color="warning" />
              }

            </Box>
          </Container>
        </Box>
        <Box sx={{ height: '30px' }} />
      </Container>

      <Container maxWidth="xs">
        <Box sx={{ height: '70px', borderRadius: 5, boxShadow: 3 }}>
          <Box sx={{ height: '17.5px' }} />
          <Stack direction="row" spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'right',
            }}>
            <Button variant="contained" endIcon={<SendIcon />} onClick={post_btn}>
              작성하기
            </Button>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={cancel_btn}>
              취소하기
            </Button>
          </Stack>
        </Box>
      </Container>

      <Box sx={{ height: '20px' }} />

    </React.Fragment>
  );
}


const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`,
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);
