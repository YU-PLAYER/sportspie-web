import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Badge from '@mui/material/Badge';
import Login from './Login';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenLogin() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Badge badgeContent={2} color="error">
        <NotificationsActiveIcon
          size="large"
          aria-label="show notifications"
          color="inherit"
          align-items="center"
          variant="outlined"
          onClick={handleClickOpen}
        />
      </Badge>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>

      <Login></Login>


      </Dialog>
    </React.Fragment>
  );
}