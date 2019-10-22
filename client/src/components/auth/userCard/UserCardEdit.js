import React, { Component } from "react";
import { connect } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import UserCardAvatar from "./UserCardAvatar";
import { getUser, updateUser } from "../../../actions/userActions";
import Spinner from "../../../utils/Spinner";

//intl_phone_input
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import jwt_decode from "jwt-decode";

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
    isConfirmDelete: false,
    token: "",
    isUserData: false
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.setState({
      token: reactLocalStorage.get("jwtToken")
    });

    //get user creds from props to state
    if (Object.keys(this.props.user).length > 0) {
      let bio;
      this.props.user.bio ? (bio = this.props.user.bio) : (bio = "");
      this.setState({
        location: this.props.user.location,
        name: this.props.user.name,
        email: this.props.user.email,
        bio,
        avatar: this.props.user.avatar,
        phone: this.props.user.phone,
        isUserData: true
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
    const { name, email, bio, location, phone, token } = this.state;
    console.log("token", token);

    e.preventDefault();

    const upUserCred = {
      name,
      email,
      bio,
      location,
      phone
    };
    // email & password for action to relogin update user
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
    this.props.updateUser(upUserCred, this.props.history, userData);
    console.log("upUserCred", upUserCred);
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
      avatar,
      isUserData
    } = this.state;

    if (!isUserData) {
      return (
        <div className="pt-5" style={{ height: 400 }}>
          <Spinner />
        </div>
      );
    } else {
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
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextFormGroup
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFormGroup
                  placeholder="Location"
                  value={location}
                  name="location"
                  onChange={this.onChange}
                  error={errors.location}
                />

                <TextAreaFormGroup
                  placeholder="Bio"
                  value={bio}
                  name="bio"
                  onChange={this.onChange}
                  error={errors.bio}
                  info="You can write a  some basic information about yourself"
                />
                <div className="mx-auto">
                  <PhoneInput
                    placeholder="Phone"
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
              <div className="h5 text-center ">Edit Avatar</div>
              <div className="  ">
                {name ? <UserCardAvatar avatar={avatar} /> : null}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  errors: state.errors.errors,
  user: state.auth.user,
  message: state.message.message,
  album: state.album.album
});
export default connect(
  mapStateToProps,
  { updateUser, getUser }
)(UserCardEdit);
