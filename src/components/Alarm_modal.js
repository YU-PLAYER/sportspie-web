import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Badge from '@mui/material/Badge';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ReactLoading from "react-loading";
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

/*
[
  {
    "content": "string",
    "date": "2023-11-26",
    "time": {
      "hour": 0,
      "minute": 0,
      "second": 0,
      "nano": 0
    },
    "stadiumName": "string",
    "type": "GAME_CONFIRMED"
  }
]
*/

const Notifications = [ // API 연습용 데이터
  {
    "content": "참여 신청하신 2023-11-30 17:00 팔공K스타디움 경기 하루 전입니다.",
    "date": "2023-11-29",
    "time": {
      "hour": 17,
      "minute": 0,
      "second": 0,
      "nano": 0
    },
    "stadiumName": "팔공K스타디움",
    "type": "DATE_IMMINENT"
  },
  {
    "content": "참여 신청하신 2023-11-30 17:00 팔공K스타디움 경기가 확정되었습니다.",
    "date": "2023-11-27",
    "time": {
      "hour": 19,
      "minute": 30,
      "second": 0,
      "nano": 0
    },
    "stadiumName": "팔공K스타디움",
    "type": "GAME_CONFIRMED"
  },
  {
    "content": "2023-11-25 17:00 첼시풋살 경기에 대한 비방 및 욕설 신고가 접수되었습니다.",
    "date": "2023-11-25",
    "time": {
      "hour": 17,
      "minute": 1,
      "second": 0,
      "nano": 0
    },
    "stadiumName": "첼시풋살",
    "type": "REPORTED"
  }
]

function Notification({ notification }) {
  switch (notification.type) {
    case 'GAME_CONFIRMED':
      return (
        <div>
          {
            <Alert severity="success" onClose={() => { }}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.content}
            </Alert>
          }
        </div>
      )
    case 'RESULTS_CONFIRMED':
      return (
        <div>
          {
            <Alert severity="success" onClose={() => { }}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.content}
            </Alert>
          }
        </div>
      )
    case 'DATE_IMMINENT':
      return (
        <div>
          {
            <Alert severity="info" onClose={() => { }}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.content}
            </Alert>
          }
        </div>
      )
    case 'REPORTED':
      return (
        <div>
          {
            <Alert severity="warning" onClose={() => { }}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.content}
            </Alert>
          }
        </div>
      )
  }
}


const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AlarmModal() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [notification_count, setNotifiation_count] = useState(0);

  useEffect(() => {
    // localstorage에 토큰이 들어왔을 때
    //1. api/user/me를 통해 id값을 얻는다.(?)
    //2. id값을 이용해 notifiation을 수신받는다.
    //3. 수신받은 json 객체의 원소 개수를 count한다.
    //4. setNotification_count를 사용하여 notification_count 값을 변경한다.
  }, /* [localStorage.getItem('')] */)

  return (
    <div>
      <IconButton onClick={handleOpen} sx={{ color: "black" }}>
        <Badge badgeContent={notification_count} color="error">
          <NotificationsActiveIcon
            size="large"
            aria-label="show notifications"
            color="black"
            align-items="center"
          >
          </NotificationsActiveIcon>
        </Badge>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton onClick={handleClose}>
            <ArrowBackIcon />
          </IconButton>
          <div style={{ width: '100%', height: '70vh', overflow: "auto" }}>
            <Box
              sx={{
                display: 'grid',
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
            >
              <Box sx={{ height: '20px' }} />
              <CssBaseline />

              <Container maxWidth="sm">
                <Box sx={{ height: '10px' }} />
                <Stack sx={{ width: '100%' }} spacing={2}>
                  {Notifications.map(notification => <Notification notification={notification} />)}
                </Stack>

                <Box sx={{ height: '20px' }} />

                <Container sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Fab variant="extended" size="medium" color="white"
                  >
                    <ReactLoading type="spin" color="#A593E0" />
                  </Fab>
                  <Box sx={{ height: '70px' }} />
                </Container>
              </Container>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}