import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import Intl_tel_input from "./Intl_tel_input";

class Register extends Component {
  render() {
    return (
      <div className="row ">
        <RegisterForm />
        <Intl_tel_input />
      </div>
    );
  }
}
export default Register;
