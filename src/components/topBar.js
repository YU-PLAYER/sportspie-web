import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Badge from '@mui/material/Badge';
import './top-bar.css';
import LogoImg from '../images/Logo.jpg';

function TopBar(){
    return(
        <div className="status-bar">
            <img className="logo" src={LogoImg}></img>
            <div className="status-bar__column"></div>
            <div className="status-bar__column">
            <Badge badgeContent={2} color="error">
                    <NotificationsActiveIcon
                        size="large"
                        aria-label="show notifications"
                        color="inherit"
                        align-items="center"
                    >

                    </NotificationsActiveIcon>
                </Badge>
            </div>
        </div>
    );
}

export default TopBar;