import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileAction";
import Avatar from "react-avatar-edit";

class ProfileAvatar extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    const src = props.user.avatar;
    this.state = {
      name: "",
      src,
      errors: {},
      message: {},
      preview: null
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }

  //react-avatar-edit
  onClose = () => {
    this.setState({ preview: null });
  };

  onCrop = preview => {
    console.log("onCrop", preview);

    this.setState({ preview });
  };

  onBeforeFileLoad = elem => {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };
  // end react-avatar-edit

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

      if (profile) {
        this.setState({
          name: profile.name,
          email: profile.email,
          status: profile.status,
          location: profile.location
        });
      }
    }
  }

  render() {
    console.log("this.state", this.state);

    return (
      <div className="row my-4">
        <div className="col-md-12 mx-auto">
          <Avatar
            width={330}
            height={295}
            onCrop={this.onCrop}
            onClose={this.onClose}
            onBeforeFileLoad={this.onBeforeFileLoad}
            src={this.state.src}
          />
          <img src={this.state.preview} alt="Preview" className="my-3" />
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
  { getProfile }
)(ProfileAvatar);
