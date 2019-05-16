import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";

import { connect } from "react-redux";
import { loginUser } from "../../../actions/userActions";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        errors: this.props.errors
      });
    }
  }

  onChange = e => {
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
    const { email, password, errors } = this.state;

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
                onChange={this.onChange}
                error={errors.email}
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
  errors: state.errors.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(LoginForm));
