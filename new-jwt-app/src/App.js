import React, { Component }  from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import './App.css';

import AuthService from "./services/auth.service";

import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Home from "./components/home/home.component";
import Profile from "./components/profile/profile.component";
import BoardUser from "./components/board-user/board-user.component";
import BoardMod from "./components/board-mod/board-mod.component";
import BoardSuper from "./components/board-super/board-super.component";


class App extends React.Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);

      this.state = {
        showModBoard: false,
        showSuperBoard: false,
        currentUser: undefined
      };
    }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if(user) {
      this.setState({
        currentUser: user,
        showModBoard: user.roles.includes("ROLE_MODERATOR"),
        showSuperBoard: user.roles.includes("ROLE_SUPER")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModBoard, showSuperBoard } = this.state;

    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Steeeeeve
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showSuperBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardMod} />
            <Route path="/admin" component={BoardSuper} />
          </Switch>
        </div>
      </div>
    </Router>
    )
  }

}
export default App;
