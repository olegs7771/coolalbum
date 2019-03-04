import React, { Component } from "react";
import TextFormGroup from "../textFormGroup/TextFormGroup";
import { connect } from "react-redux";
import { registerUser } from "../../actions/userActions";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: ""
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
      name: this.state.username,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2
    };

    this.props.registerUser(newUser);
    console.log(newUser);
  };

  render() {
    const { username, email, password1, password2 } = this.state;
    return (
      <div className="row my-3">
        <div className="col-md-12">
          <div className="text-center h3">Register Here</div>
          <div className="card card-body">
            <div className="container">
              <form onSubmit={this.onSubmit}>
                <TextFormGroup
                  placeholder="Name..."
                  value={username}
                  name="username"
                  onChange={this.onChange}
                />
                <TextFormGroup
                  placeholder="Email..."
                  type="email"
                  value={email}
                  name="email"
                  onChange={this.onChange}
                  info="We will never share your email with anyone else"
                />
                <TextFormGroup
                  placeholder="Password..."
                  value={password1}
                  name="password1"
                  onChange={this.onChange}
                />
                <TextFormGroup
                  placeholder="Confirm Password..."
                  value={password2}
                  name="password2"
                  onChange={this.onChange}
                />

                <button className="btn btn-dark">Register</button>
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
  { registerUser }
)(Register);
