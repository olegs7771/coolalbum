import React, { Component } from "react";
import LoginForm from "./LoginForm";
import Facebook_auth_btn from "./Facebook_auth_btn";

class Login extends Component {
  render() {
    return (
      <div className="row my-3">
        <div className="col-md-6">
          <LoginForm />
        </div>
        <div className="col-md-6">
          <Facebook_auth_btn />
        </div>
      </div>
    );
  }
}
export default Login;
