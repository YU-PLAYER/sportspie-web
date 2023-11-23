import React, { useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Textarea from '@mui/joy/Textarea';
import TextField from '@mui/material/TextField';
import SelectOtherProps from './selectGround.js';
import NumberForm from './NumberForm.js';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Swal from 'sweetalert2';
import 'dayjs/locale/ko';
import qs from 'qs';

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

  const [authorId, setAuthorId] = useState("");
  const [title, setTitle] = useState(random_Title);
  const [maxCapacity, setMaxCapacity] = useState("");
  const [stadiumId, setStadiumId] = useState("");
  const [content, setContent] = useState("");

  const [isTitleOK,setIsTitleOK] = useState(true);
  const [isContentOK,setisContentOK] = useState(true);
  const [isStartedTimeOK,setisStartedTimeOK] = useState(true);

  // authorId = localStorage.getItem('test');

  const MaxPeople = (props) => {
    return(
      <NumberForm value={maxCapacity} onChange = {handleMaxCapacity} />
    );
  }

  const game = qs.stringify({
    "authorId": authorId,
    "title": title,
    "maxCapacity": maxCapacity,
    "startedAt": startedAt,
    "stadiumId": stadiumId,
    "content": content
  });

  var startedAt = "";
  var startedDate = String(dayjs().format('YYYY-MM-DD'));
  var statedTime = String(dayjs().format('HH:mm:ss'));

  const handleTitle = e => {
    if(e.key == "Enter") e.preventDefault();
    console.log(`Typed => ${e.target.value}`)
    console.log(e.target.value.length);
    if (e.target.value.length > 20) alert("방제목은 20글자까지만 가능합니다.");
    else setTitle(e.target.value);
  };

  const handleMaxCapacity = (e) => {
    console.log(maxCapacity);
    setMaxCapacity(e.target.value);
  }

  const handleContent = e => {
    console.log(`Typed => ${e.target.value}`);
    setContent(e.target.value);
  };

  const button_test = () => {
    setIsTitleOK(true);
    setisContentOK(true);
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
            <MaxPeople/>
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
          <SelectOtherProps></SelectOtherProps>
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
            <Button variant="contained" endIcon={<SendIcon />} onClick={button_test}>
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