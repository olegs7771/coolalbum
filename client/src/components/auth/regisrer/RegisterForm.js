import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/userActions";

class RegisterForm extends Component {
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
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { registerUser }
)(RegisterForm);
