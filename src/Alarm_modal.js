import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Badge from '@mui/material/Badge';
import Dayalarm from './Day_alarm';

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} sx={{color:"black"}}>
      <Badge badgeContent={2} color="error">
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
          <IconButton>
          <ArrowBackIcon onClick={handleClose}/>
          </IconButton>
          <Dayalarm/>
        </Box>
      </Modal>
    </div>
  );
}