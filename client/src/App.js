import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/layout/Header";
import Main from "./components/layout/main/Main";
import Facebook_auth_btn from "./components/layout/Facebook_auth_btn";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
