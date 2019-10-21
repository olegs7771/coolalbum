import React, { Component } from "react";
import { connect } from "react-redux";
import {
  clearErrors,
  updateAvatar,
  deleteAvatar
} from "../../../actions/profileAction";

import { withRouter } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import jwt_decode from "jwt-decode";

class UserCardAvatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      message: {},
      token: "",
      //don't show delete avatar btn if
      // db--> avatar === ''
      showDeleteBtn: false,

      //Here Avatar string update State
      selectedImage: props.avatar,
      uploadImage: ""
    };
    this.fileSelectedHandlert = this.fileSelectedHandler.bind(this);
    // this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }
  componentDidMount() {
    this.setState({
      token: reactLocalStorage.get("jwtToken")
    });

    //Do not show deleteBtn if avatar === ' //www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48?s=200&r=pg&d=mm'  (empty user)

    if (
      this.props.user.avatar !==
      "//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48?s=200&r=pg&d=mm"
    ) {
      this.setState({
        showDeleteBtn: true
      });
    } else {
      this.setState({
        showDeleteBtn: false
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
    if (prevProps.message !== this.props.message) {
      this.setState({
        message: this.props.message
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Select Avatar from browser to tmp memory
  fileSelectedHandler = e => {
    this.setState({
      selectedImage: URL.createObjectURL(e.target.files[0]),
      uploadImage: e.target.files[0]
    });
    this.props.clearErrors();
  };

  //Upload Avatar from browser to db
  _avatarUpload = e => {
    e.preventDefault();
    const { token } = this.state;
    const decoded = jwt_decode(token);
    console.log("decoded", decoded);
    //if decoded.unhashedPassword
    let passwordData;
    if (decoded.unhashedPassword) {
      passwordData = decoded.unhashedPassword;
    } else {
      passwordData = decoded.password;
    }
    const userData = {
      email: decoded.email,
      password: passwordData
    };
    const fd = new FormData();
    fd.append("myImage", this.state.uploadImage);
    this.props.updateAvatar(fd, this.props.history, userData);
  };
  //Delete Avatar in DB
  _deleteAvatar = () => {
    const { token } = this.state;
    const decoded = jwt_decode(token);
    console.log("decoded", decoded);
    //if decoded.unhashedPassword
    let passwordData;
    if (decoded.unhashedPassword) {
      passwordData = decoded.unhashedPassword;
    } else {
      passwordData = decoded.password;
    }
    const userData = {
      email: decoded.email,
      password: passwordData
    };
    this.props.deleteAvatar(this.props.history, userData);
  };

  render() {
    const { selectedImage, message, errors } = this.state;

    //content showen to confirm delete profile (isConfirmDelete: true)

    return (
      <div>
        <div className="">
          <img
            src={selectedImage}
            className="rounded"
            style={{ width: "150px" }}
            alt=""
          />
          <br />
          <div className="">
            {errors.error ? (
              <div className="my-3 text-danger">{errors.error}</div>
            ) : null}
            {message ? (
              <div className="my-3 text-success">{message.avatar}</div>
            ) : null}
          </div>

          <form onSubmit={this._avatarUpload}>
            <div className="custom-file my-2">
              <input
                type="file"
                name="myImage"
                onChange={this.fileSelectedHandler}
                className=" custom-file-input my-2"
              />
              <label className="custom-file-label">Choose file...</label>
            </div>
            <br />
            <div className="my-1 text-muted">max size 100k</div>

            <div className="btn-group">
              {this.state.showDeleteBtn ? (
                <button type="submit" className="btn btn-sm btn-info my-3">
                  Change Avatar
                </button>
              ) : (
                <button type="submit" className="btn btn-sm btn-info my-3">
                  Add Avatar
                </button>
              )}

              {this.state.showDeleteBtn ? (
                <button
                  type="button"
                  className="btn btn-sm btn-warning my-3 ml-1"
                  onClick={this._deleteAvatar}
                >
                  Delete Avatar
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors.errors,
  user: state.auth.user,
  message: state.message.message
});
export default connect(
  mapStateToProps,
  { clearErrors, updateAvatar, deleteAvatar }
)(withRouter(UserCardAvatar));
//
