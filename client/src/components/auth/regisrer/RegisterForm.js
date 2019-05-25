import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import { connect } from "react-redux";
import FaceBookBtn from "../../../utils/FaceBookBtn";
import { registerUser } from "../../../actions/userActions";
import { withRouter } from "react-router-dom";

class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    showLoginBtnFaceBook: false,
    errors: {}
  };

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props.errors !== prevProps.errors) {
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
    e.preventDefault();

    const newUser = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    console.log(this.props);

    const { history } = this.props;
    this.props.registerUser(newUser, history);
    console.log(newUser);
  };

  render() {
    const { username, email, password, errors } = this.state;

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
                onChange={this.onChange}
                error={errors.email}
                info="We will never share your email with anyone else"
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
  errors: state.errors.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterForm));