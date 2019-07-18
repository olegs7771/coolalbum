import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";

import { connect } from "react-redux";
import FaceBookBtn from "../../../utils/FaceBookBtn";

import {
  registerUser,
  deleteErrors,
  isUserEmailExists
} from "../../../actions/userActions";
import { withRouter } from "react-router-dom";
//intl_phone_input
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    showLoginBtnFaceBook: false,
    errors: {},
    message: {}
  };

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
    if (this.props.message !== prevProps.message) {
      this.setState({
        message: this.props.message
      });
    }
    if (prevState.email !== this.state.email) {
      const data = {
        email: this.state.email
      };
      this.props.isUserEmailExists(data, this.props.history);
    }
  }
  //Intering Email field for sending to fetch code
  onChangeEmail = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.deleteErrors();
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      location: this.state.location,

      password: this.state.password
    };
    console.log("this.props", this.props);

    const { history } = this.props;
    this.props.registerUser(newUser, history);
    console.log(newUser);
  };

  render() {
    const {
      username,
      email,
      phone,
      location,

      password,
      errors,
      message
    } = this.state;
    // console.log("this.state", this.state);

    return (
      <div className="col-md-6 my-3  mx-auto">
        <div className="text-center h3 ">Register Here</div>
        <div className="card card-body">
          <div className="container">
            <form onSubmit={this.onSubmit}>
              <TextFormGroup
                placeholder="Name..."
                value={username}
                name="username"
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFormGroup
                placeholder="Email..."
                type="email"
                value={email}
                name="email"
                onChange={this.onChangeEmail}
                error={errors.regEmail}
                message={message.regEmail}
                info="We will never share your email with anyone else"
              />

              <div className="mt-3">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phone}
                  className="form-control form-control-lg "
                  onChange={phone => this.setState({ phone })}
                />{" "}
                <br />
                <div className="">
                  Your number needed for login with SMS (Optinal)
                </div>
              </div>
              <TextFormGroup
                placeholder="Location..."
                value={location}
                name="location"
                onChange={this.onChange}
                error={errors.location}
              />

              <TextFormGroup
                placeholder="Password..."
                value={password}
                name="password"
                onChange={this.onChange}
                error={errors.password}
              />
              <button className="btn btn-dark">Join Now</button>
            </form>
          </div>
        </div>

        <div className="row my-2">
          <div className="col-md-5">
            <hr />
          </div>
          <div className="col-md-2">or</div>
          <div className="col-md-5">
            <hr />
          </div>
          <div className="mx-auto">
            <FaceBookBtn />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors.errors,
  message: state.message.message
});

export default connect(
  mapStateToProps,
  { registerUser, deleteErrors, isUserEmailExists }
)(withRouter(RegisterForm));
