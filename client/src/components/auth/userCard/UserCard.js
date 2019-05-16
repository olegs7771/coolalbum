import React, { Component } from "react";
import UserCardItem from "./UserCardItem";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getProfile } from "../../../actions/profileAction";
import Spinner from "../../../utils/Spinner";

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileExists: false,
      avatar: ""
    };

    const id = {
      id: props.match.params.id
    };
    props.getProfile(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile !== this.props.profile) {
      // this.props coming here
      console.log("this.props", this.props);

      this.setState({
        profileExist: true
      });
    }
  }

  render() {
    const { user } = this.props;
    const { loading } = this.props.profile;

    let profileContent;
    //show userCard with: viewprofile or create profile
    //check if user has profile from state
    if (this.state.profileExist) {
      return (profileContent = (
        <div className="row">
          <div className="col-md-6 border my-4">
            <UserCardItem
              name={user.name}
              email={user.email}
              avatar={user.avatar}
              date={user.date}
            />
            <Link
              to={`/profile_edit/${user.id}`}
              className="btn btn-sm btn-info mb-2"
            >
              {" "}
              <i className="fas fa-user mr-1" />
              View Profile{" "}
            </Link>
          </div>
        </div>
      ));
    } else {
      profileContent = (
        <div className="row">
          <div className="col-md-6 border my-4">
            <UserCardItem
              name={user.name}
              email={user.email}
              avatar={user.avatar}
              date={user.date}
            />

            <div className="mx-auto my-3">
              In oreder to fully use our site <br />
              Please create profile
            </div>
            <Link
              to={`/profile_create/${user.id}`}
              className="btn btn-sm btn-info mb-2"
            >
              {" "}
              <i className="fas fa-user mr-1" />
              Create Profile{" "}
            </Link>
          </div>
        </div>
      );
    }

    if (loading) {
      return <Spinner />;
    } else {
      return <div>{profileContent};</div>;
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(UserCard);
