import React, { Component } from "react";
import { connect } from "react-redux";
import TextFormGroup from "../textFormGroup/TextFormGroup";
import {
  createProfile,
  getProfile,
  clearErrors
} from "../../actions/profileAction";
import { withRouter } from "react-router-dom";
import ProfileEditAvatar from "./ProfileEditAvatar";
//intl_phone_input
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

class ProfileCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      avatar: "",
      status: "",
      location: "",
      phone: "",
      errors: {},
      message: {}
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.clearErrors();
  };

  onSubmitCreateProfile = e => {
    const { name, email, avatar, status, location, phone } = this.state;
    e.preventDefault();

    const newProfileData = {
      name,
      email,
      avatar,
      status,
      location,
      phone,
      user: this.props.match.params.id
    };
    this.props.createProfile(newProfileData, this.props.history);
    console.log("newProfileData :", newProfileData);
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        message: this.props.message,
        avatar: this.props.user.avatar,
        errors: this.props.errors
      });
    }
  }

  render() {
    const {
      name,
      email,
      // avatar,
      status,
      location,
      phone,
      errors,
      message
    } = this.state;
    console.log("this.state.message", message);
    console.log("this.props", this.props.message);

    return (
      <div>
        <div className="my-4">
          <span className="h5">Dear {""}</span>
          {<span className="h5 text-info">{this.props.user.name}</span>}{" "}
          <span className="h5">here you can create your profile</span>
        </div>
        <div className="card card-body">
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
              <span className="h5 d-block ">Fill All Fields</span>
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
                  <div className="mx-auto">
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={phone => this.setState({ phone })}
                    />{" "}
                    <br />
                    <div className="my-2">
                      Your number needed for login with SMS (Optinal)
                    </div>
                  </div>

                  <button type="submit" className="btn btn-info">
                    Create
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-4 ">
              <div className="container">
                <span className="h5 d-block ">Edit Avatar</span>
                <ProfileEditAvatar avatar={this.props.user.avatar} />
              </div>
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
  profile: state.profile.profile,
  message: state.message.message
});
export default connect(
  mapStateToProps,
  { createProfile, getProfile, clearErrors }
)(withRouter(ProfileCreate));
