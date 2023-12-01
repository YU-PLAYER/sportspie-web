import '../css/top-bar.css';
import LogoImg from '../images/logo.png';
import AlarmModal from './Alarm_modal';
import {NavLink} from "react-router-dom";

function TopBar(){
    return(
        <div className="status-bar">
            <div className="status-bar__column">
                <NavLink to={"./Home"}>
                <img src={LogoImg}
                    style={{ width: "72px", height: "32px" }}/>
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
