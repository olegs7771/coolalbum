import React, { Component } from "react";
import { connect } from "react-redux";

import TextFormGroup from "../textFormGroup/TextFormGroup";
import ProfileEditAvatar from "./ProfileEditAvatar";
import {
  createProfile,
  getProfile,
  deleteProfile
} from "../../actions/profileAction";
import { withRouter } from "react-router-dom";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);

    this.state = {
      name: "",
      email: "",
      avatar: "",
      status: "",
      location: "",
      errors: {},
      message: {},
      isConfirmDelete: false
    };
  }

  componentDidMount() {
    //trigger getProfile();
    const id = {
      id: this.props.match.params.id
    };
    this.props.getProfile(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
    if (this.props.message !== prevProps.message) {
      this.setState({
        message: this.props.message
      });
    }
    if (this.props.profile !== prevProps.profile) {
      this.setState({
        profile: this.props.profile
      });

      const profile = this.props.profile;

      if (profile) {
        this.setState({
          name: profile.name,
          email: profile.email,
          status: profile.status,
          location: profile.location
        });
      }

      // { Here we obtain Avatar string from User}
      if (this.props.user) {
        this.setState({
          avatar: this.props.user.avatar
        });
      }
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitCreateProfile = e => {
    const { name, email, status, location } = this.state;
    e.preventDefault();

    const newProfileData = {
      name,
      email,
      status,
      location,
      user: this.props.match.params.id
    };
    this.props.createProfile(newProfileData, this.props.history);
  };

  // cancel delete profile
  handleCancelDeleteProfile = e => {
    e.preventDefault();
    this.props.history.push("/");
  };

  //confirm delete profile
  handleDeleteProfile = e => {
    e.preventDefault();

    this.props.deleteProfile(this.props.history);
  };

  render() {
    const {
      name,
      email,
      status,
      location,
      errors,
      isConfirmDelete,
      message,
      avatar
    } = this.state;
    console.log("this.props", this.props.message);
    console.log("this.state.message", message);

    //content showen to confirm delete profile (isConfirmDelete: true)

    let confirmDelete = (
      <div className="my-2 text-danger">
        Are You really sure to Delete Your Profile? <br />
        Profile can not be redeemed!
        <div className="mx-auto">
          <div className="btn-group">
            <button
              className="btn btn-sm btn-secondary mr-3"
              onClick={this.handleCancelDeleteProfile}
            >
              No
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={this.handleDeleteProfile}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <div className="my-4">
          <span className="h4">Dear</span>
          {<span className="h3 text-info"> {this.props.user.name}</span>}

          <span className="h3"> here you can edit your profile</span>
        </div>
        {/* {Message} */}
        <div className="my-2">
          {Object.keys(message).length > 0 ? (
            <div className="text-success">
              <i className="fas fa-thumbs-up mr-2" />
              {message.profile} <br />
            </div>
          ) : null}
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="card card-body my-4">
              <form onSubmit={this.onSubmitCreateProfile}>
                <TextFormGroup
                  label="Name"
                  value={name}
                  name="name"
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFormGroup
                  label="Email"
                  value={email}
                  name="email"
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFormGroup
                  label="Status"
                  value={status}
                  name="status"
                  onChange={this.onChange}
                  error={errors.status}
                />
                <TextFormGroup
                  label="Location"
                  value={location}
                  name="location"
                  onChange={this.onChange}
                  error={errors.location}
                />
                <div className="btn-group">
                  <button type="submit" className="btn btn-info">
                    <i className="fas fa-user-edit mr-2" />
                    Edit
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={e => {
                      e.preventDefault();
                      this.setState({
                        isConfirmDelete: !this.state.isConfirmDelete
                      });
                    }}
                  >
                    <i className="fas fa-trash-alt mr-2" />
                    Delete Profile
                  </button>
                </div>

                {isConfirmDelete ? <div>{confirmDelete}</div> : null}
              </form>
            </div>
          </div>
          <div
            className=" card card-body col-md-4 mt-4 "
            style={{ height: "432px" }}
          >
            {name ? <ProfileEditAvatar avatar={avatar} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors.errors,
  user: state.auth.user,
  message: state.message.message,
  profile: state.profile.profile
});
export default connect(
  mapStateToProps,
  { createProfile, getProfile, deleteProfile }
)(withRouter(ProfileEdit));
