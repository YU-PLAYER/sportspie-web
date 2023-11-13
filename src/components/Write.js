import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Textarea from '@mui/joy/Textarea';
import DateCalendarReferenceDate from './dateCalendar.js';
import SelectOtherProps from './selectGround.js';
import IconLabelButtons from './button.js';
import NumberForm from './NumberForm.js';

export default function Write() {
  return (
    <React.Fragment>

      <Box sx={{ height: '20px' }} />
      
      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '220px', borderRadius: 5, boxShadow: 3, textAlign:"center"}}>
          <Box sx={{ height: '20px' }} />
          경기글 작성
          <Box sx={{ height: '20px' }} />
          <Container maxWidth="sm">
            <Textarea name="Outlined" maxRows={1} placeholder="방 제목" variant="outlined" />
            <Box sx={{ height: '30px' }} />
            최대 참여 인원
            <Box sx={{ height: '15px' }} />
            <NumberForm />
          </Container>
        </Box>
        <Box sx={{ height: '20px' }} />
      </Container>

      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '500px', borderRadius: 5, boxShadow: 3 , textAlign:"center"}}>
          <Box sx={{ height: '20px' }} />
          날짜 및 시간
          <Box sx={{ height: '20px' }} />
          <DateCalendarReferenceDate>
          </DateCalendarReferenceDate>
          <Box sx={{ height: '20px' }} />

          <Box sx={{ height: '20px' }} />
        </Box>
        <Box sx={{ height: '20px' }} />
      </Container>

      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '250px', borderRadius: 5, boxShadow: 3 , textAlign:"center"}}>
        <Box sx={{ height: '20px' }} />
        장소 선택
        <Box sx={{ height: '20px' }} />
        <SelectOtherProps></SelectOtherProps>
        </Box>
        <Box sx={{ height: '20px' }} />
      </Container>

      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        <Box sx={{ height: '580px', borderRadius: 5, boxShadow: 3 , textAlign:"center"}}>
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
              minRows={20} maxRows={20} placeholder="경기글 상세내역" />
          </Box>
          </Container>
        </Box>
        <Box sx={{ height: '30px' }} />
      </Container>

      <Container maxWidth="xs">
      <Box sx={{ height: '70px', borderRadius: 5, boxShadow: 3 }}>
      <Box sx={{ height: '17.5px' }} />
            <IconLabelButtons></IconLabelButtons>
      </Box>
      </Container>
      
      <Box sx={{ height: '20px' }} />

    </React.Fragment>
  );
}