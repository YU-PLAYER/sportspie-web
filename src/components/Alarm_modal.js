import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Badge from '@mui/material/Badge';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Swal from 'sweetalert2';
import axios from 'axios';

/*
[
   {
    "id": 0,
    "content": "string",
    "date": "2023-11-30",
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

/* const Notifications = [ // API 연습용 데이터
  {
    "id": 12,
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
    "id": 8,
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
    "id": 7,
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
 */

const handleDelete = (event) => {
  console.log("알림 삭제");
  console.log(event.target.id);
  try {
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    const response = axios.delete(`http://110.165.17.35:8080/api/notification/${event.target.id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  } catch (err) {

  }
};

function Notification({ notification }) {
  switch (notification.type) {
    case 'GAME_CONFIRMED':
      return (
        <div>
          {
            <Alert severity="success" onClose={handleDelete}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.time} {notification.stadiumName}의 {notification.content}
            </Alert>
          }
        </div>
      )
    case 'RESULTS_CONFIRMED':
      return (
        <div>
          {
            <Alert severity="success" onClose={handleDelete}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.time.hour} {notification.time.minute} {notification.stadiumName}의 {notification.content}
            </Alert>
          }
        </div>
      )
    case 'DATE_IMMINENT':
      return (
        <div>
          {
            <Alert severity="info" onClose={handleDelete}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.time.hour} {notification.time.minute} {notification.stadiumName}의 {notification.content}
            </Alert>
          }
        </div>
      )
    case 'REPORTED':
      return (
        <div>
          {
            <Alert severity="warning" onClose={handleDelete}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.time.hour} {notification.time.minute} {notification.stadiumName}의 {notification.content}
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

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [notificationAPI, setNotificationAPI] = useState([]);
  const [notification_count, setNotifiation_count] = useState(0);
  
  useEffect(() => { 
    
  }, [notificationAPI]);

  const handleOpen = () => {
    const fetchUser = async () => {
      const access_token = (localStorage.getItem('access_token'));
      if (access_token == null) {
        Swal.fire({
          icon: 'error',
          title: '로그인 필요',
          text: '로그인이 필요한 기능입니다.'
        });
        navigate('/Login'); // 로그인하지 않았을 시 로그인 페이지로 이동
      } else {
        try {
          const response = await axios.get('http://110.165.17.35:8080/api/notification', {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}` },
          },)
          console.log(response);
          setNotificationAPI(response.data);
          setNotifiation_count(response.data.length);
          console.log("알림 개수 : " + response.data.length);
          console.log("알림 목록 : " + notificationAPI);
          setOpen(true);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchUser();
  }

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
                  {/* {Notifications.map(notification => <Notification notification={notification} />)} */}
                  {notificationAPI.map(notification => <Notification notification={notification} id={notification.id} />)}
                </Stack>

                <Box sx={{ height: '20px' }} />

                <Container sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {/* <ReactLoading type="spin" color="#A593E0" /> */}
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