import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser, logoutUser } from "../../actions/userActions";
import { reactLocalStorage } from "reactjs-localstorage";
import jwtDecode from "jwt-decode";
import { isEmpty } from "../../utils/isEmpty";
class Header extends Component {
  state = {
    isAuthenticated: false
  };

  //Logout

  handleLogout = e => {
    const { history } = this.props;

    this.props.logoutUser(history);
    history.push("/");
  };

  componentDidMount() {
    //obtain token from localStorage and
    const token = reactLocalStorage.get("jwtToken");
    if (token) {
      //decode token with jwt-decode
      const decodedToken = jwtDecode(token);
      //  putting it into redux state
      this.props.setCurrentUser(decodedToken);
    }
  }

  render() {
    const { user } = this.props.auth;
    if (user) {
    }

    return (
      <div className="pos-f-t">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            CoolAlbum
          </a>

          <nav className="navbar navbar-dark bg-dark navbar-expand-lg ml-auto ">
            {!isEmpty(user) ? (
              <ul className="nav justify-content-end">
                <li className="nav-item active">
                  <span className="text-white">Welcome</span>{" "}
                  <span className="text-info ml-2">{user.name}</span>
                  {/* {if no avatar do not use white border on avatar} */}
                  {!isEmpty(user.avatar) ? (
                    <img
                      src={user.avatar}
                      alt=""
                      className="rounded-circle ml-2 "
                      style={{ width: "50px", border: "2px solid white" }}
                    />
                  ) : (
                    <img
                      src={user.avatar}
                      alt=""
                      className="rounded-circle ml-2 "
                      style={{ width: "50px" }}
                    />
                  )}
                  <button
                    className="text-white btn ml-4 "
                    onClick={this.handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="nav justify-content-end">
                <li className="nav-item active">
                  <Link to="/login" className="nav-link">
                    <span className="text-white">Login</span>
                  </Link>
                </li>

                <li className="nav-item active">
                  <Link to="/register" className="nav-link">
                    <span className="text-white">SignUp</span>
                  </Link>
                </li>
              </ul>
            )}
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
