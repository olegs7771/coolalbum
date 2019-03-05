import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="pos-f-t">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            CoolAlbum
          </a>
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg ml-auto ">
            <ul className="navbar-nav mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
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
export default Header;
