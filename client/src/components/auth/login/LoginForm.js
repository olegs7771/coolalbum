import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/userActions";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("submitted");
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(newUser);
    console.log(newUser);
  };

  render() {
    const { email, password } = this.state;

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
              />
              <TextFormGroup
                placeholder="Password..."
                value={password}
                name="password"
                onChange={this.onChange}
              />

              <button className="btn btn-dark">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { loginUser }
)(Login);
