import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";

import { connect } from "react-redux";
import { loginUser } from "../../../actions/userActions";
import { sendSmsCode } from "../../../actions/phoneAction";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    messages: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        errors: this.props.errors,
        messages: this.props.message
      });
      //clear this.state.errors if this.state.messages obj>0
      if (Object.keys(this.state.messages).length > 0) {
        this.setState({
          errors: {}
        });
      }
    }
    if (prevState.email !== this.state.email) {
      const data = {
        email: this.state.email
      };
      this.props.sendSmsCode(data, this.props.history);
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
                error={errors.email}
                // message={messages.message}
              />
              <TextFormGroup
                placeholder="Password..."
                value={password}
                name="password"
                onChange={this.onChange}
                error={errors.password}
              />

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
  { loginUser, sendSmsCode }
)(withRouter(LoginForm));
