import React, { Component } from "react";
import LoginForm from "./LoginForm";
import SmsLogin from "./SmsLogin";
import FaceBookBtn from "../../../utils/FaceBookBtn";

class Login extends Component {
  render() {
    return (
      <div className="row my-3">
        <div className="col-md-6">
          <LoginForm />
        </div>
        <div className="col-md-6">
          <span className="text-center text-info h5 col-md-12 mb-3">
            Don' have an account? Sign Up!
          </span>
          <FaceBookBtn />

          <SmsLogin />
        </div>
      </div>
    );
  }
}
export default Login;
