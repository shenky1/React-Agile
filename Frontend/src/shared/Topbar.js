import React from "react";
import defaultImage from "../assets/images/default-user.jpg";
import { Link } from 'react-router-dom'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import logo from "../assets/images/boards-logo.jpg";
import '../App.scss';

class Topbar extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav justify-content-between w-100 mt-2 mt-lg-0">
            <li className="nav-item d-flex align-items-center">
                <div className="d-inline">
                    <img src={logo} width="40" height="40" alt=""></img>
                </div>
                <div className="topbar-title d-inline">
                    <span className="topbar-title-text">Trello</span>
                </div>
            </li>

            <li className="nav-item dropdown">
              
              <div className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                
               
              <div className="float-right">        
                
              <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle tag="div">
                <img 
                  className="rounded-circle"
                  src={defaultImage}
                  alt="" 
                  width="50" 
                  height="49"
                />
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu'>
                    <DropdownItem tag={Link} to="/profile">Profile</DropdownItem>
                    <DropdownItem tag={Link} to="/about">About</DropdownItem>
                    <DropdownItem><span onClick={this.props.logout}>Logout</span></DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              </div>
                
                <div className="float-right mt-1 mr-3 name">
                    {this.props.user.firstName} <br></br> {this.props.user.lastName}
                </div>
              
              </div>
            
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}



export default Topbar;