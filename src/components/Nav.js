import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
function Navbtn({link, src, icon}){
    return(
        <li>
            <Link to={link}>
            <FontAwesomeIcon icon={icon} size="lg"/>            
            </Link>
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
                <Navbtn link="/Map" src="index.html" icon={faMapLocation}/>
                <Navbtn path="/Write" src="index.html" icon={faPen}/>
                <Navbtn link="/" src="index.html" icon={faHouse}/>
                <Navbtn link="/MatchList" src="index.html" icon={faTable}/>
                <Navbtn link="/TeamSelect" src="index.html" icon={faUser}/>
            </ul>
            
        </nav>
    );
}
export default Nav;