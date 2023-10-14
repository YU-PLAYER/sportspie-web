import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbolBall } from "@fortawesome/free-regular-svg-icons";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Badge from '@mui/material/Badge';
import './top-bar.css';

function TopBar(){
    return(
        <div className="status-bar">
            <div className="status-bar__column">
                <FontAwesomeIcon icon={faFutbolBall} size="lg"/>
                <span style={{
                    marginLeft:"3px",
                }}>SportiPie</span>
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