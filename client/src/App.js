import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/layout/Header";
import Facebook_auth_btn from "./components/layout/Facebook_auth_btn";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Facebook_auth_btn />
        </div>
      </Provider>
    );
  }
}

export default App;
