import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from "./components/login/Login";
import Register from './components/register/Register';
import Profile from "./components/Profile";
import About from "./components/About";
import Error from "./components/Error";
import Boards from "./components/boards/Boards";
import Board from "./components/board/Board";
import Teams from "./components/Teams";

import Topbar from "./shared/Topbar";
import Sidebar from "./shared/Sidebar";

import './App.scss';


const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest} render={(props) => {
        
        return isLoggedIn() ? <Component {...props} /> :
        <Redirect to="/login" />
    }}/>
)

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem('isAuthenticated'),
            user: this.getUserFromStorage()
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.setUserState = this.setUserState.bind(this);
    }

    setUserState() {
        this.setState({
            isAuthenticated: this.isLoggedIn(),
            user: this.isLoggedIn() ? this.getUserFromStorage() : null    
        })
    }

    login(user) {
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('user', JSON.stringify(user));
        this.setUserState();
    }

    logout() {
        localStorage.clear();
        this.setUserState();
    }

    isLoggedIn() {
        return localStorage.getItem('isAuthenticated');
    }

    getUserFromStorage() {
        return JSON.parse(localStorage.getItem('user'));
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path="/" exact isLoggedIn={this.isLoggedIn} component= {() => <HomeApp user={this.state.user} updateUser={this.setUserState} logout={this.logout}/>}/>
                    <Route path="/login" component={() => this.isLoggedIn() ? <Redirect to="/"/> : <Login login={this.login} />}/>
                    <Route path="/register" component={() => this.isLoggedIn() ? <Redirect to="/"/> : <Register/>} />
                    <Route component={() => this.isLoggedIn() ? <HomeApp user={this.state.user} updateUser={this.setUserState} logout={this.logout}/> : <Redirect to="/login"/>} />
                </Switch>
            </BrowserRouter>
        );
    }
}


const HomeApp = (props) => {
  return (
    <div className="d-flex flex-column content-wrapper">
        <Topbar user={props.user} logout={props.logout}/>

        <div id="page-content-wrapper" className="d-flex flex-grow-1 position-relative">
            <Sidebar user={props.user}/>
            <div className="route-container flex-grow-1 d-flex">
                <Switch>
                    <Route path="/" component={Boards} exact/>
                    <Route path="/board" component={Board}/>
                    <Route path="/teams/:id" component={(props) => <Teams {...props} /> }/>
                    <Route path="/profile" component={() => <Profile updateUser={props.updateUser} />} />
                    <Route path="/about" component={About} />
                    <Route component={Error} />
                </Switch>
            </div>
        </div>
    </div>
  )}

export default App;
