import React, { Component } from "react";
import TextFormGroup from "../textFormGroup/TextFormGroup";
import { connect } from "react-redux";
import { loginUser } from "../../actions/userActions";

class Login extends Component {
  state = {
    email: "",
    password1: ""
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
      password1: this.state.password1
    };

    this.props.loginUser(newUser);
    console.log(newUser);
  };

  render() {
    const { email, password1 } = this.state;
    return (
      <div className="row my-3">
        <div className="col-md-12">
          <div className="text-center h3">Register Here</div>
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
                  value={password1}
                  name="password1"
                  onChange={this.onChange}
                />

                <button className="btn btn-dark">Login</button>
              </form>
            </div>
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
