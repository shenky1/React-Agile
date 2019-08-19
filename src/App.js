import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import Error from "./components/Error";
import Boards from "./components/Boards";
import Teams from "./components/Teams";

import Topbar from "./shared/Topbar";
import Sidebar from "./shared/Sidebar";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">

          <Topbar />
          
          <div className="container-fluid">
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/boards" component={Boards}/>
              <Route path="/teams" component={Teams}/>
              <Route path="/profile" component={Profile} />
              <Route path="/about" component={About} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
