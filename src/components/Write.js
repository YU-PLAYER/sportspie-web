import React, { useState } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Textarea from '@mui/joy/Textarea';
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
import 'dayjs/locale/ko';

/* "authorId": 0,
"title": "string",
"maxCapacity": 0,
"startedAt": "2023-11-16T11:32:23.973Z",
"stadiumId": 0,
"content": "string" */

export default function Write() {

  const [authorId, setAuthorId] = useState("");
  const [title, setTitle] = useState("");
  const [maxCapacity, setMaxCapacity] = useState(""); 
  const [stadiumId, setStadiumId] = useState("");
  const [content, setContent] = useState("");

  var startedAt = "";
  var startedDate = dayjs().format('YYYY-MM-DD');
  var startedTime = dayjs().format('HH:MM:00'); 

  const handleTitle = e => {
    console.log(`Typed => ${e.target.value}`)
    setTitle(e.target.value);
  };

  const handleMaxCapacity = (e) => {
    console.log(maxCapacity);
    setMaxCapacity(e.target.value);
  }

  const handleContent = e => {
    console.log(`Typed => ${e.target.value}`)
    setContent(e.target.value);
  };

  const button_test = () =>{
    console.log(startedDate + "T" + startedTime);
    startedAt = startedDate + "T" + startedTime;
  }

  return (
    <React.Fragment>

      <Box sx={{ height: '20px' }} />

      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '220px', borderRadius: 5, boxShadow: 3, textAlign: "center" }}>
          <Box sx={{ height: '20px' }} />
          경기글 작성
          <Box sx={{ height: '20px' }} />
          <Container maxWidth="sm">
            <Textarea className="title" name="Outlined" maxRows={1} placeholder="방 제목" variant="outlined"
            inputProps={{maxLength : 20}} type="text"
            value = {title} onChange={handleTitle}/>
            <Box sx={{ height: '30px' }} />
            최대 참여 인원
            <Box sx={{ height: '15px' }} />
            <NumberForm propFunction={handleMaxCapacity}/>
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
                console.log(newValue.format('HH:MM:00'));
                startedTime = newValue.format('HH:MM:00');
              }}/>
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
              <Textarea fullWidth label="fullWidth" id="fullWidth"
                minRows={20} maxRows={20} placeholder="경기글 상세내역"
                value = {content} onChange={handleContent} />
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