import '../css/top-bar.css';
import LogoImg from '../images/logo.png';
import AlarmModal from './Alarm_modal';
import {NavLink} from "react-router-dom";

function TopBar(){
    return(
        <div className="status-bar">
            <div className="status-bar__column">
                <NavLink to={"./"}>
                <img src={LogoImg}
                    style={{ width: "70px", height: "30px" }}/>
                </NavLink>
            </div>
            <div className="status-bar__column"></div>
            <div className="status-bar__column">

            <AlarmModal />

            </div>
        </div>
    );
}

export default TopBar;
