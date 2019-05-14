import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getProfile,
  deleteProfile,
  updateAvatar
} from "../../actions/profileAction";
import { withRouter, Link } from "react-router-dom";

class ProfileEditAvatar extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);

    this.state = {
      errors: {},

      //Here Avatar string update State
      selectedImage: props.avatar,
      uploadImage: ""
    };
    this.fileSelectedHandlert = this.fileSelectedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  componentDidMount() {
    //trigger getProfile();
    const id = {
      id: this.props.match.params.id
    };
    this.props.getProfile(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        errors: this.props.errors,
        message: this.props.message
      });

      const profile = this.props.profile;
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Select Avatar from browser to tmp memory
  fileSelectedHandler = e => {
    console.log("selected image", e.target.files[0]);

    this.setState({
      selectedImage: URL.createObjectURL(e.target.files[0]),
      uploadImage: e.target.files[0]
    });
  };

  //Upload Avatar from browser to db
  fileUploadHandler = e => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("myImage", this.state.uploadImage);

    this.props.updateAvatar(fd, this.props.history);
  };

  render() {
    const { selectedImage, uploadImage, errors } = this.state;

    //content showen to confirm delete profile (isConfirmDelete: true)

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <img
              src={selectedImage}
              className="rounded-circle"
              style={{ width: "150px" }}
              alt=""
            />
            <br />

            <form onSubmit={this.fileUploadHandler}>
              <input
                type="file"
                name="myImage"
                onChange={this.fileSelectedHandler}
                className="btn btn-sm btn-info mt-3"
              />
              <br />
              <div className="my-1 text-muted">max size 100k</div>
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-sm btn-info my-3">
                    Upload
                  </button>
                </div>
                <div className="col">
                  {this.state.errors.error ? (
                    <div className="my-3 text-danger">
                      {this.state.errors.error}
                    </div>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors.errors,
  user: state.auth.user,
  message: state.message,
  profile: state.profile.profile
});
export default connect(
  mapStateToProps,
  { getProfile, deleteProfile, updateAvatar }
)(withRouter(ProfileEditAvatar));
