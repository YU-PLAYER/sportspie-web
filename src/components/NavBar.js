import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import "../css/NavBar.css";

const NavMenu = ({ to, icon, index, activeNav, setActiveNav }) => (
  <Link to={to} className="nav-link" onClick={() => setActiveNav(index)}>
    <div>
      <FontAwesomeIcon
        icon={icon}
        className={activeNav === index ? "active" : "nav-item"}
      />
    </div>
  </Link>
)

const NavBar = () => {
  const [activeNav, setActiveNav] = useState(3);
  
  return (
    <nav className="wrapper">
      <NavMenu to="/Map" icon={faMapLocation} index={1} activeNav={activeNav} setActiveNav={setActiveNav} />
      <NavMenu to="/Write" icon={faPen} index={2} activeNav={activeNav} setActiveNav={setActiveNav} />
      <NavMenu to="/Home" icon={faHouse} index={3} activeNav={activeNav} setActiveNav={setActiveNav} />
      <NavMenu to="/MatchList" icon={faTable} index={4} activeNav={activeNav} setActiveNav={setActiveNav} />
      <NavMenu to="/MyProfile" icon={faUser} index={5} activeNav={activeNav} setActiveNav={setActiveNav} />
    </nav>
  );
};

export default NavBar;
