import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { setCurrentUser, logoutUser } from "../../../actions/userActions";
import { getPosts } from "../../../actions/postAction";
import { getWeather } from "../../../actions/weatherAction";

import { reactLocalStorage } from "reactjs-localstorage";
import jwtDecode from "jwt-decode";
import { isEmpty } from "../../../utils/isEmpty";
//weather widget
import WeatherWidGet from "../../../utils/WeatherWidGet";

class Header extends Component {
  state = {
    posts: null,
    rotation: ""
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
    // Fetch Weather API from OPEN WEATHER MAP
    if (this.props.auth.user.name) {
      this.props.getWeather();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.post !== this.props.post) {
      this.setState({
        posts: this.props.post.post
      });
    }

    //get posts after user logged
    if (prevProps.auth !== this.props.auth) {
      //Rotate Avatar in Header if not taken from Facebook or Gravatar
      const reg = new RegExp("^(http|https)://|^//www", "i");
    }
  }

  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { posts } = this.state;

    //Show links for auth user
    let linksContent;
    if (isAuthenticated) {
      linksContent = (
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/contact">
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/users">
              Users
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/chat">
              Chat
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/albums">
              My Albums
            </Link>
          </li>
        </ul>
      );
    } else {
      linksContent = null;
    }

    let postCountcontent;
    if (posts) {
      if (posts.length > 0) {
        postCountcontent = (
          <div>
            <i className="fas fa-envelope  text-white mr-2" />
            <span className="text-white">{posts.length}</span>
          </div>
        );
      } else {
        postCountcontent = null;
      }
    }
    if (user) {
      return (
        <div className="pos-f-t">
          <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand mr-5" href="/">
              CoolAlbum
            </a>
            <ul className="navbar-nav ml-auto mt-2 ">
              <li className="nav-item ">
                <WeatherWidGet />
              </li>
            </ul>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg ml-auto ">
              {!isEmpty(user) ? (
                <ul className="nav justify-content-end">
                  {/* {Post Envelope} */}
                  <li className="nav-item active ">
                    <Link to="/inbox">{postCountcontent}</Link>
                  </li>
                  <li className="nav-item active">
                    <Link to={`/userCard/${user.id}`}>
                      <span className="text-info ml-2 ">{user.name}</span>
                    </Link>
                    {/* {if no avatar do not use white border on avatar} */}
                    {!isEmpty(user.avatar) ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="rounded-circle ml-2 "
                        style={{
                          width: "50px",
                          height: "50px",
                          border: "2px solid white",

                          transform: `rotate(${this.state.rotation}deg)`
                        }}
                      />
                    ) : (
                      <img
                        src={user.avatar}
                        alt=""
                        className="rounded-circle ml-4 "
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
            <div className="bg-dark p-4">{linksContent}</div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { setCurrentUser, logoutUser, getWeather, getPosts }
)(withRouter(Header));
