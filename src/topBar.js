import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFutbolBall } from "@fortawesome/free-regular-svg-icons";
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
            <div className="status-bar__column"><FontAwesomeIcon icon={faBell} size="lg"/></div>
        </div>
    );
}

export default TopBar;