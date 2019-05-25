import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/layout/Header";
import Main from "./components/layout/main/Main";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import SuccessRegMsg from "./utils/SuccessRegMsg";
//here comes confirmation for registartion
import ConfirmRegister from "./utils/ConfirmRegister";
import Contact from "./utils/Contact";
import UserCard from "./components/auth/userCard/UserCard";
import UserCardEdit from "./components/auth/userCard/UserCardEdit";
import ProfileCreate from "./components/profile/ProfileCreate";
import ProfileEdit from "./components/profile/ProfileEdit";

import jwt_decode from "jwt-decode";
import { logoutUser } from "./actions/userActions";
//Avatar

import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/userActions";

//check for token
if (localStorage.jwtToken) {
  //Set auth token to header
  setAuthToken(localStorage.jwtToken);

  // //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // // //set currentUser to auth.user in redux state and  Authenticate
  store.dispatch(setCurrentUser(decoded));
}

// //Check for expired token

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
                <Route exact path="/userCard/:id" component={UserCard} />
                <Route exact path="/userCard_edit" component={UserCardEdit} />
                <Route
                  exact
                  path="/profile_create/:id"
                  component={ProfileCreate}
                />
                <Route exact path="/profile_edit/:id" component={ProfileEdit} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
