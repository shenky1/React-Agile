import React from "react";
import logo from "../assets/images/boards-logo.jpg";
import NavLink from "react-router-dom/NavLink";

const Sidebar = () => {
    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">
                <div className="float-left">
                    <img src={logo} width="40" height="40" alt=""></img>
                </div>
                <div className="topbar-title">
                    <span className="topbar-title-text">Trello</span>
                </div>
            </div>

            <div className="list-group list-group-flush">
                <div>
                    <NavLink 
                        activeClassName="selected" 
                        to="/" 
                        className="list-group-item list-group-item-action bg-light">
                        Home
                    </NavLink>
                </div>

                <div>
                    <NavLink 
                        activeClassName="selected" 
                        to="/boards" 
                        className="list-group-item list-group-item-action bg-light">
                        Boards
                    </NavLink>
                </div>

                <div>
                    <NavLink 
                        activeClassName="selected" 
                        to="/teams" 
                        className="list-group-item list-group-item-action bg-light">
                        Teams
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;