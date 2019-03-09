import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import window from "global";

import { connect } from "react-redux";

import { registerUser } from "../../../actions/userActions";
class Facebook_auth_btn extends Component {
  state = {
    fbValidated: false,
    email: "",
    name: "",
    picture: "",
    id: ""
  };

  handleLogout = () => {
    console.log(window);

    this.setState({
      fbValidated: false
    });
  };

  responseFacebook = response => {
    console.log(response);
    this.setState({
      fbValidated: true,
      email: response.email,
      name: response.name,
      picture: response.picture.data.url,
      id: response.id
    });
  };

  render() {
    const { fbValidated, email, name, picture, id } = this.state;

    let fbContent;
    if (fbValidated) {
      fbContent = (
        <div className="card card-body my-3">
          <div className="row">
            <div className="col-md-8">
              <span className="h4">{name}</span>
              <br />
              <span className="h5">{email}</span>
            </div>
            <div className="col-md-2">
              <img src={picture} alt="" />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary" onClick={this.handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="991632717694701"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          cssClass="my-facebook-button-class"
          icon="fa-facebook mr-1"
        />
      );
    }

    return (
      <div className="row">
        <span className="text-center text-info h5 col-md-12 mb-3">
          Don' have an account? Sign Up!
        </span>
        <div className="col-md-12">{fbContent}</div>
      </div>
    );
  }
}
export default connect(
  null,
  { registerUser }
)(withRouter(Facebook_auth_btn));
