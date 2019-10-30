import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/layout/header/Header";
import Main from "./components/layout/main/Main";
import Footer from "./components/layout/footer/Footer";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import RecoverPassword from "./components/auth/login/RecoverPassword";
import RecoverNewPassword from "./components/auth/login/RecoverNewPassword";
import SuccessRegMsg from "./utils/SuccessRegMsg";
//here comes confirmation for registartion
import ConfirmRegister from "./utils/ConfirmRegister";
import Contact from "./utils/Contact";
import UserCard from "./components/auth/userCard/UserCard";
import UserCardEdit from "./components/auth/userCard/UserCardEdit";

import jwt_decode from "jwt-decode";
import { logoutUser } from "./actions/userActions";
//Posts
import Post from "./components/layout/posts/Post";
//Users
import Users from "./components/layout/users/Users";
//Inbox Posts
import Inbox from "./components/layout/inbox/Inbox";
//Chat
import Chat from "./components/layout/chat/Chat";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/userActions";
import configureStore from "./store/configureStore";
import styled from "styled-components";
//Albums
import Album from "./components/layout/albums/Album";
import AlbumCreate from "./components/layout/albums/AlbumCreate";
import AlbumEdit from "./components/layout/albums/AlbumEdit";

//
const store = configureStore();
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
    //styles
    const Body = styled.section`
      background-color: rgb(230, 245, 250, 0.1);
    `;
    return (
      <Provider store={store}>
        <Router>
          <Body>
            <div className="App">
              <Header />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route exact path="/login" component={Login} />
                  <Route
                    exact
                    path="/recover_pass"
                    component={RecoverPassword}
                  />
                  <Route
                    exact
                    path="/recover_newPass/:token/:_id"
                    component={RecoverNewPassword}
                  />
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

                  <Route exact path="/post" component={Post} />
                  <Route exact path="/users" component={Users} />
                  <Route exact path="/inbox" component={Inbox} />
                  <Route exact path="/chat" component={Chat} />
                  <Route exact path="/albums" component={Album} />
                  <Route exact path="/albums_create" component={AlbumCreate} />
                  <Route exact path="/album_edit/:id" component={AlbumEdit} />
                </Switch>
              </div>
              <Footer />
            </div>
          </Body>
        </Router>
      </Provider>
    );
  }
}

export default App;
