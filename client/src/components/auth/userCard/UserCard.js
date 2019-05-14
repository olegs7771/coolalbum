import React, { Component } from "react";
import UserCardItem from "./UserCardItem";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getProfile } from "../../../actions/profileAction";

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
      this.setState({
        profileExist: true
      });
    }
  }

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <div className="row">
          <div className="col-md-6 border my-4">
            <UserCardItem
              name={user.name}
              email={user.email}
              avatar={user.avatar}
              date={user.date}
            />
            {this.state.profileExist ? (
              <Link
                to={`/profile_edit/${user.id}`}
                className="btn btn-sm btn-info mb-2"
              >
                {" "}
                <i className="fas fa-user mr-1" />
                View Profile{" "}
              </Link>
            ) : (
              <div>
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
            )}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(UserCard);
