import React, { useState, useEffect } from "react";
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
import AddIcon from '@mui/icons-material/Add'
import Swal from 'sweetalert2';
import 'dayjs/locale/ko';

/* "authorId": 0,
"title": "string",
"maxCapacity": 0,
"startedAt": "2023-11-16T11:32:23.973Z",
"stadiumId": 0,
"content": "string" */

export default function Write() {

  var DefaultTitle = ["풋살 즐겜하실 멤버 구합니다!", "가볍게 풋살하실 멤버 모집합니다~", "심심한데 축구 한 판 어때요?"];
  var random_index = Math.floor(Math.random() * DefaultTitle.length);
  var random_Title = DefaultTitle[random_index];

  var authorId = localStorage.getItem('NickName');
  const [title, setTitle] = useState(random_Title);
  const [maxCapacity, setMaxCapacity] = useState("");
  const [stadiumId, setStadiumId] = useState("");
  const [stadium, setStadium] = useState("");
  const [content, setContent] = useState("");

  const [isTitleOK, setIsTitleOK] = useState(true);
  const [isContentOK, setisContentOK] = useState(true);
  const [isMaxCapacityOK, setisMaxCapacityOK] = useState(true);
  const [isStartedTimeOK, setisStartedTimeOK] = useState(true);

  var startedAt = "";
  var startedDate = String(dayjs().format('YYYY-MM-DD'));
  var statedTime = String(dayjs().format('HH:mm:ss'));

  const game = {
    authorId: authorId,
    title: title,
    maxCapacity: maxCapacity,
    startedAt: startedAt,
    stadiumId: stadiumId,
    content: content,
  };

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

    const handleValue = (e) => {
      console.log(e.target.value);
      setMaxCapacity(e.target.value);
    }

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

  const post_btn = () => {
    setIsTitleOK(true);
    setisContentOK(true);
    setisStartedTimeOK(true);
    setisMaxCapacityOK(true);
    console.log("startedDate = " + startedDate);
    console.log("startedTime = " + statedTime);
    startedAt = startedDate + "T" + statedTime;
    console.log(startedAt);
    if (title.length < 2) {
      Swal.fire({
        icon: 'warning',
        text: '방제목을 2글자 이상 입력해 주세요.'
      });
      setIsTitleOK(false);
    } else if (maxCapacity == "undefined") {
      Swal.fire({
        icon: 'warning',
        text: '참여가능 최대 인원을 입력해 주세요.'
      });
    } else if (content.length < 50) {
      Swal.fire({
        icon: 'warning',
        text: '경기글 상세 내역을 50글자 이상 입력해 주세요.'
      });
      setisContentOK(false);
    } else {
      console.log("AuthorID: " + authorId);
      console.log("title: " + title);
      console.log("maxCapacity: " + maxCapacity);
      console.log("startedAt: " + startedAt);
      console.log("stadiumId: " + stadiumId);
      console.log("content: " + content);

      try {
        const response = axios.post('http://110.165.17.35:8080/api/game', { game: game });
        console.log(response);
      } catch (err) {
        console.log("작성 요청 실패");
      }
    }
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
            <NumberInput min={4} max={40} step={2} />
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
                defaultValue={dayjs()}
                minDate={dayjs()}
                onChange={(newValue) => {
                  console.log(newValue.format('YYYY-MM-DD'));
                  startedDate = newValue.format('YYYY-MM-DD');
                }}
              />
            </DemoContainer>
            <DemoContainer components={['TimePicker']}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
              <TimePicker label="시간 선택" sx={{ bgcolor: 'white' }}
                onChange={(newValue) => {
                  console.log(dayjs(newValue).format("HH:mm:ss"));
                  statedTime = dayjs(newValue).format("HH:mm:ss");
                  console.log("Started Time : " + statedTime);
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

              {isContentOK ?
                <Textarea fullWidth label="fullWidth" id="fullWidth"
                  minRows={20} maxRows={20} placeholder="경기글 상세내역"
                  value={content} onChange={handleContent} />
                :
                <Textarea error fullWidth label="fullWidth" id="fullWidth"
                  minRows={20} maxRows={20} placeholder="경기글 상세내역"
                  value={content} onChange={handleContent}
                  helperText="경기글 상세내역을 50글자 이상 입력해 주세요." />
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
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={null}>
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