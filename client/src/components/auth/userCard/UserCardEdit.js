import React, { Component } from "react";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import UserCardAvatar from "./UserCardAvatar";
import { updateUser } from "../../../actions/userActions";

import { getProfile } from "../../../actions/profileAction";
//intl_phone_input
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

class UserCardEdit extends Component {
  state = {
    name: "",
    email: "",
    avatar: "",
    bio: "",
    location: "",
    phone: "",
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
    const token = reactLocalStorage.get("jwtToken");
    console.log("token", token);

    //trigger getProfile();
    // const id = {
    //   id: this.props.match.params.id
    // };
    this.props.getProfile();

    //get user creds from props to state
    if (Object.keys(this.props.user).length > 0) {
      let bio;
      this.props.user.bio ? (bio = this.props.user.bio) : (bio = "");
      this.setState({
        location: this.props.user.location,
        name: this.props.user.name,
        email: this.props.user.email,
        bio,
        avatar: this.props.user.avatar
      });
    }
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
  }
  //after submit user been update in db

  onSubmitUpdateUser = e => {
    const { name, email, bio, location } = this.state;
    e.preventDefault();

    const upUser = {
      name,
      email,
      bio,
      location
    };
    this.props.updateUser(upUser, this.props.history);
  };

  render() {
    const {
      name,
      email,
      bio,
      location,
      phone,
      errors,
      message,
      avatar
    } = this.state;
    // console.log("this.props.user", this.props.user);
    console.log("this.state", this.state);

    return (
      <div>
        <div className="h4 my-4">Edit User Card </div>
        {message.user ? (
          <div className="my-3 text-success"> {message.user}</div>
        ) : null}
        <div className="row">
          <div className="col-md-8  mt-4">
            <form onSubmit={this.onSubmitUpdateUser}>
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
                label="Location"
                value={location}
                name="location"
                onChange={this.onChange}
                error={errors.location}
              />
              <TextAreaFormGroup
                label="Bio"
                placeholder="write about yourself something..."
                value={bio}
                name="bio"
                onChange={this.onChange}
                error={errors.bio}
                info="You can write a  some basic information about yourself"
              />
              <div className="mx-auto">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={phone => this.setState({ phone })}
                  className="form-control"
                />{" "}
                <br />
                <div className="my-2">
                  Your number needed for login with SMS (Optinal)
                </div>
              </div>
              <button type="submit" className="btn btn-dark btn-lg my-4">
                Edit
              </button>
            </form>
          </div>
          <div className="col-md-4">
            <div className="h5 text-center my-3">Edit Avatar</div>
            <div className=" card card-body  " style={{ height: "432px" }}>
              {name ? <UserCardAvatar avatar={avatar} /> : null}
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
  { updateUser, getProfile }
)(UserCardEdit);
