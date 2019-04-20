import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/layout/Header";
import Main from "./components/layout/main/Main";
import Register from "./components/auth/regisrer/Register";
import Login from "./components/auth/login/Login";
import SuccessRegMsg from "./utils/SuccessRegMsg";
//here comes confirmation for registartion
import ConfirmRegister from "./utils/ConfirmRegister";
import Contact from "./utils/Contact";
import Profile from "./components/profile/Profile";
import jwt_decode from "jwt-decode";
import { logoutUser } from "./actions/userActions";

import "./App.css";

//Check for expired token

if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken);

  const currentTime = Date.now() / 1000;

  if (decoded.exp - currentTime < 300) {
    window.alert("token will expire in 5 min");
  }

  if (currentTime > decoded.exp) {
    ///Logout user
    store.dispatch(logoutUser());
    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/success_msg" component={SuccessRegMsg} />
                <Route
                  exact
                  path="/confirm_registration/:token/:_id"
                  component={ConfirmRegister}
                />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/profile/:id" component={Profile} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
