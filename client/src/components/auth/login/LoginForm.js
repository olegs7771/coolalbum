import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";

import { connect } from "react-redux";
import { loginUser, isEmailExists } from "../../../actions/userActions";

import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    message: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        errors: this.props.errors,
        message: this.props.message
      });
      //clear this.state.errors if this.state.messages obj>0
      if (Object.keys(this.state.message).length > 0) {
        this.setState({
          errors: {}
        });
      }
    }
    if (prevState.email !== this.state.email) {
      const data = {
        email: this.state.email
      };
      this.props.isEmailExists(data, this.props.history);
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Intering Email field for sending to fetch code
  onChangeMail = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    const { history } = this.props;
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(newUser, history);
  };

  render() {
    const { email, password, errors, message } = this.state;
    console.log("this.props", this.props);
    console.log("this.state", this.state);

    return (
      <div>
        <div className="text-center h3">Login Into Your Account</div>
        <div className="card card-body">
          <div className="container">
            <form onSubmit={this.onSubmit}>
              <TextFormGroup
                placeholder="Email..."
                type="email"
                value={email}
                name="email"
                onChange={this.onChangeMail}
                error={errors.loginEmail}
                message={message.loginEmail}
              />
              <TextFormGroup
                placeholder="Password..."
                value={password}
                name="password"
                onChange={this.onChange}
                error={errors.password}
              />

              <div className="form-check form-check-inline my-4">
                <div className="row">
                  <div className="col-md-4">
                    {" "}
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
                    <label className="form-check-label">Remember me</label>
                  </div>
                  <div className="col-md-8 ">
                    {" "}
                    <a href="/recover_pass" className="ml-4 text-center">
                      Forgot password?
                    </a>
                    <br />
                  </div>
                </div>
              </div>

              <button className="btn btn-dark">Login</button>
            </form>
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
  { loginUser, isEmailExists }
)(withRouter(LoginForm));
