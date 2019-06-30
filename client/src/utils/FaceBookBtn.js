import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { authFacebook } from "../actions/userActions";
import { withRouter } from "react-router-dom";
// import Spinner from "./Spinner";
// import styled from "styled-components";
import "../App.css";

class FaceBookBtn extends Component {
  state = {
    showLoginBtn: true,
    accessToken: ""
  };

  responseFacebook = response => {
    const { history } = this.props;

    this.setState({
      accessToken: response.accessToken,
      showLoginBtn: false
    });
    this.props.authFacebook(this.state.accessToken, history);
  };

  //Logout
  handleLogoutBtn = e => {
    this.setState({
      showLoginBtn: true,
      accessToken: ""
    });
  };

  render() {
    const { showLoginBtn } = this.state;
    let loginContent;
    if (showLoginBtn) {
      return (loginContent = (
        <div className="my-3">
          <FacebookLogin
            appId="991632717694701"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            cssClass="my-facebook-button"
          />
        </div>
      ));
    } else {
      loginContent = null;
    }

    return <div className="my-4">{loginContent}</div>;
  }
}
export default connect(
  null,
  { authFacebook }
)(withRouter(FaceBookBtn));
