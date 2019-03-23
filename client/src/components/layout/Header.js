import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser, logoutUser } from "../../actions/userActions";
import { reactLocalStorage } from "reactjs-localstorage";
import jwtDecode from "jwt-decode";
class Header extends Component {
  //Logout

  handleLogout = e => {
    const { history } = this.props;
    console.log("loggedout");
    this.props.logoutUser(history);
  };

  componentDidMount() {
    //obtain token from localStorage
    const token = reactLocalStorage.get("jwtToken");
    if (token) {
      //decode token with jwt-decode
      const decodedToken = jwtDecode(token);
      this.props.setCurrentUser(decodedToken);
    }
    console.log(this.props);
  }

  render() {
    const token = reactLocalStorage.get("jwtToken");
    console.log(token);

    console.log(this.props.auth);
    const { user } = this.props.auth;
    let authContent;
    if (Object.keys(user).length > 0) {
      authContent = (
        <ul className="nav justify-content-end">
          <li className="nav-item active">
            <span className="text-white">Welcome</span>{" "}
            <span className="text-info">{user.name}</span>
            <button
              className="text-white btn ml-4 "
              onClick={this.handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      );
    } else {
      authContent = (
        <ul className="nav justify-content-end">
          <li className="nav-item active">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      );
    }

    return (
      <div className="pos-f-t">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            CoolAlbum
          </a>
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg ml-auto ">
            {authContent}
          </nav>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </nav>
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/">
                  Link
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser, logoutUser }
)(withRouter(Header));
