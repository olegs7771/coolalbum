import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/layout/Header";
import Main from "./components/layout/main/Main";
import Register from "./components/auth/regisrer/Register";
import Login from "./components/auth/login/Login";
import SuccessRegMsg from "./utils/SuccessRegMsg";
import Contact from "./utils/Contact";

import "./App.css";

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
                <Route exact path="/contact" component={Contact} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
