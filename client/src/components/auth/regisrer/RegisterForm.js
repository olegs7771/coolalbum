import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import { connect } from "react-redux";
// import FacebookLogin from "react-facebook-login";
import Facebook_auth_btn from "../login/Facebook_auth_btn";
import { registerUser } from "../../../actions/userActions";

class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    showLoginBtnFaceBook: false
  };

  handleShowLoginBtnFaceBook = e => {
    e.preventDefault();
    this.setState({
      showLoginBtnFaceBook: !this.state.showLoginBtnFaceBook
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  responseFacebook = response => {
    console.log(response);
    // this.setState({
    //   fbValidated: true,
    //   email: response.email,
    //   name: response.name,
    //   picture: response.picture.data.url,
    //   id: response.id
    // });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("submitted");
    const newUser = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser);
    console.log(newUser);
  };

  render() {
    let fbContent;
    if (this.state.showLoginBtnFaceBook) {
      fbContent = (
        <div className="my-2">
          <Facebook_auth_btn />
        </div>
      );
    }

    const { username, email, password } = this.state;
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
                value={password}
                name="password"
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
        <button
          className="btn-primary btn-block"
          onClick={this.handleShowLoginBtnFaceBook}
        >
          Continue with Facebook
        </button>
        {this.state.showLoginBtnFaceBook ? <div>{fbContent}</div> : null}
      </div>
    );
  }
}
export default connect(
  null,
  { registerUser }
)(RegisterForm);
