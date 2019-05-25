import React, { Component } from "react";
import { connect } from "react-redux";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import ProfileEditAvatar from "../../profile/ProfileEditAvatar";

import {
  createProfile,
  getProfile,
  deleteProfile
} from "../../../actions/profileAction";

class UserCardEdit extends Component {
  state = {
    name: "",
    email: "",
    avatar: "",
    status: "",
    location: "",
    errors: {},
    message: {},
    isConfirmDelete: false
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
    if (this.props.user !== prevProps.user) {
      const user = this.props.user;

      if (user) {
        this.setState({
          name: user.name,
          email: user.email,
          status: user.status,
          location: user.location
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
    console.log("this.props.user", this.props.user);
    console.log("this.state", this.state);

    return (
      <div>
        <div className="h4 my-4">Edit User Card </div>

        <div className="row">
          <div className="col-md-8  mt-4">
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
          </div>
          <div className="col-md-4">
            <div className="h5 text-center my-3">Edit Avatar</div>
            <div className=" card card-body  " style={{ height: "432px" }}>
              {name ? <ProfileEditAvatar avatar={avatar} /> : null}
            </div>
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
)(UserCardEdit);
