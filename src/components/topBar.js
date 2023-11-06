import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Badge from '@mui/material/Badge';
import '../css/top-bar.css';
import LogoImg from '../images/logo.png';

function TopBar(){
    return(
        <div className="status-bar">
            <div className="status-bar__column">
                <img src={LogoImg}
                style={{width:"70px", height:"30px"}}/>
            </div>
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
