import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { faPen, faHouse} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SvgIcon from "@mui/material/SvgIcon";

// import { Link } from "react-router-dom";

function Navbtn({src, icon}){
    return(
        <li>
            <FontAwesomeIcon icon={icon} size="lg"/>
        </li>
    );
}

function Nav(){
    return(
        <nav style={{          
            position:"fixed", bottom:"0", width:"100%",
            backgroundColor:"rgba(243, 243, 243, 0.836)", 
            padding:"16px 20px", boxSizing:'border-box',
            borderTop:"1px solid rgba(121, 121, 121, 0.3)",
        }}>
            <ul style={{
                listStyle:"none", paddingLeft:"0px",
                display:"flex", justifyContent:"space-between",
            }}>
                <Navbtn src="index.html" icon={faMapLocation}/>
                <Navbtn src="index.html" icon={faPen}/>
                <Navbtn src="index.html" icon={faHouse}/>
                <SvgIcon component={EventAvailableIcon} inheritViewBox />
                <Navbtn src="index.html" icon={faUser}/>
            </ul>
        </nav>
    );
}
export default Nav;