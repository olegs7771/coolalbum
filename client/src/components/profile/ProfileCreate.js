import React, { Component } from "react";
import { connect } from "react-redux";
import TextFormGroup from "../textFormGroup/TextFormGroup";
import { createProfile, getProfile } from "../../actions/profileAction";
import { withRouter, Link } from "react-router-dom";

class ProfileCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      avatar: "",
      status: "",
      location: "",
      errors: {},
      message: {}
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitCreateProfile = e => {
    const { name, email, avatar, status, location } = this.state;
    e.preventDefault();

    const newProfileData = {
      name,
      email,
      avatar,
      status,
      location,
      user: this.props.match.params.id
    };
    this.props.createProfile(newProfileData);
    console.log("newProfileData :", newProfileData);
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        message: this.props.message
      });
    }
  }

  render() {
    const {
      name,
      email,
      avatar,
      status,
      location,
      errors,
      message
    } = this.state;

    return (
      <div>
        <div className="my-3">
          Dear {<span className="h5 text-info">{this.props.user.name}</span>}{" "}
          here you can create your profile
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
                <button type="submit" className="btn btn-info">
                  Create
                </button>
                <div className="my-2">
                  {message.message ? (
                    <div className="text-success">
                      <i className="fas fa-thumbs-up mr-2" />
                      {message.message} <br />
                      <Link to="/" className="my-2 btn btn-info">
                        <i className="fas fa-arrow-left mr-2" />
                        Home
                      </Link>
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <img
              src={avatar}
              className="rounded-circle"
              style={{ width: "150px" }}
              alt=""
            />
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
  message: state.message
});
export default connect(
  mapStateToProps,
  { createProfile, getProfile }
)(withRouter(ProfileCreate));