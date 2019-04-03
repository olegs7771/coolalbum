import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import { authFacebook } from "../actions/userActions";
import { withRouter } from "react-router-dom";

class FaceBookBtn extends Component {
  state = {
    showLoginBtn: true,
    accessToken: ""
  };

  responseFacebook = response => {
    const { history } = this.props;
    console.log(response);
    this.setState({
      accessToken: response.accessToken,
      showLoginBtn: false
    });
    this.props.authFacebook(this.state.accessToken, history);
    console.log(this.state);
  };

  componentClicked = e => {
    console.log("clicked");
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
          />
        </div>
      ));
    } else {
      loginContent = null;
    }

    return (
      <div>
        {loginContent}
        <button className="btn btn-warning" onClick={this.handleLogoutBtn}>
          Logout
        </button>
      </div>
    );
  }
}
export default connect(
  null,
  { authFacebook }
)(withRouter(FaceBookBtn));
