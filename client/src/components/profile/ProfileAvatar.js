import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileAction";

class ProfileAvatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      avatar: "",

      errors: {},
      message: {}
    };
  }
  componentDidMount() {
    //trigger getProfile();
    const id = {
      id: this.props.match.params.id
    };
    this.props.getProfile(id);
  }

  componentDidUpdate(prevProps, prevState) {
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
          location: profile.location,
          avatar: profile.avatar
        });
      }
    }
  }

  render() {
    console.log("this.state", this.state);

    return (
      <div className="row my-4">
        <div className="col-md-12 mx-auto">
          <img src={this.state.avatar} alt={this.state.name} />
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
