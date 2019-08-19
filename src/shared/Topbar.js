import React from "react";
import defaultImage from "../assets/images/default-user.jpg";

const Topbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            
            <li className="nav-item dropdown">
              
              <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                
                <div className="float-right">
                    <img className="rounded-circle" src={defaultImage} alt="" width="50" height="49"/>
                </div>
                
                <div className="float-right mt-1 mr-3 name">
                    Name <br></br> Last Name
                </div>
              
              </div>
              
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/profile">Profile</a>
                <a className="dropdown-item" href="/about">About</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/logout">Logout</a>
              </div>
            
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default Topbar;