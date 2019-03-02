import React, { Component } from "react";
import TextFormGroup from "../textFormGroup/TextFormGroup";

class Register extends Component {
  onSubmit = e => {
    e.preventDefault();
    console.log("submitted");
  };

  render() {
    return (
      <div className="row my-3">
        <div className="col-md-12">
          <div className="text-center h3">Register Here</div>
          <div className="card card-body">
            <div className="container">
              <form onSubmit={this.onSubmit}>
                <TextFormGroup placeholder="Name..." />
                <TextFormGroup
                  placeholder="Email..."
                  type="email"
                  info="We will never share your email with anyone else"
                />
                <TextFormGroup placeholder="Password..." name="password1" />
                <TextFormGroup
                  placeholder="Confirm Password..."
                  name="password2"
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
export default Register;
