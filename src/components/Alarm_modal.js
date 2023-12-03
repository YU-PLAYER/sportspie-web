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

function Notification({ notification, refreshNotifications }) {
  const deleteNotification = async () => {
    try {
      const access_token = JSON.parse(localStorage.getItem('access_token'));
      const response = await axios.delete(`http://110.165.17.35:8080/api/notification/${notification.id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      refreshNotifications(); // 알람 삭제 후 알람 목록 갱신
    } catch (err) {
    }
  };

  switch (notification.type) {
    case 'GAME_CONFIRMED':
      return (
        <div>
          {
            <Alert severity="success" value={notification.id} onClose={deleteNotification}>
              <AlertTitle>경기 확정</AlertTitle>
              {notification.date} {notification.time} {notification.stadiumName}의 {notification.content}
            </Alert>
          }
        </div>
      );
    case 'RESULTS_CONFIRMED':
      return (
        <div>
          {
            <Alert severity="info" value={notification.id} onClose={deleteNotification}>
              <AlertTitle>경기 결과 확정</AlertTitle>
              {notification.date} {notification.time} {notification.stadiumName}의 {notification.content}
            </Alert>
          }
        </div>
      );
    case 'DATE_IMMINENT':
      return (
        <div>
          {
            <Alert severity="info" value={notification.id} onClose={deleteNotification}>
              <AlertTitle>경기 하루 전 알림</AlertTitle>
              {notification.date} {notification.time} {notification.stadiumName}의 {notification.content}
            </Alert>
          }
        </div>
      );
    case 'REPORTED':
      return (
        <div>
          {
            <Alert severity="warning" value={notification.id} onClose={deleteNotification}>
              <AlertTitle>신고 접수 완료</AlertTitle>
              {notification.date} {notification.time} {notification.stadiumName}의 {notification.content}
            </Alert>
          }
        </div>
      );
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

  const fetchNotifications = async () => {
    try {
      const access_token = JSON.parse(localStorage.getItem('access_token'));
      const response = await axios.get('http://110.165.17.35:8080/api/notification', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      setNotificationAPI(response.data);
      setNotifiation_count(response.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [notificationAPI]);


  const handleOpen = () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token == null) {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '로그인이 필요한 기능입니다.'
      });
      navigate('/Login'); // 로그인하지 않았을 시 로그인 페이지로 이동
    } else {
      fetchNotifications();
      setOpen(true);
    }
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
                  {notificationAPI.map(notification =>
                    <Notification notification={notification} id={notification.id} refreshNotifications={fetchNotifications} />)}
                </Stack>

                <Box sx={{ height: '20px' }} />
                <Container sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
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