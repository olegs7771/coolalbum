import React, { Component } from "react";
import Facebook_auth_btn from "./components/layout/Facebook_auth_btn";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Facebook_auth_btn />
      </div>
    );
  }
}

export default App;
