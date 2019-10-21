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
      avatar: ""
    };

    props.getProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile !== this.props.profile) {
      // this.props coming here
    }
  }

  render() {
    const { user } = this.props;
    // console.log("user", user);

    const { loading, profile } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      //check for profile
      if (Object.keys(profile).length > 0) {
        //user has profile

        profileContent = (
          <div className="row ">
            <div className="col-md-6 my-4 border">
              <UserCardItem
                phone={user.phone}
                name={user.name}
                email={user.email}
                avatar={user.avatar}
                date={user.date}
                location={user.location}
              />
            </div>
            <div className="col-md-6 my-4">
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
        );
      } else {
        profileContent = (
          <div className="row">
            <div className="col-md-6  my-4">
              <div className="card card-body ">
                <UserCardItem
                  name={user.name}
                  email={user.email}
                  avatar={user.avatar}
                  phone={user.phone}
                  date={user.date}
                  location={user.location}
                />
              </div>
            </div>
            <div className="col-md-6 my-4">
              <div className="mx-auto my-3">
                seems like you do not have any albums <br />
                Here you can create one
              </div>
              <Link
                to={`/profile_create/${user.id}`}
                className="btn btn-sm btn-dark mb-2"
              >
                {" "}
                <i className="fas fa-user mr-1" />
                Create Profile{" "}
              </Link>
            </div>
          </div>
        );
      }
    }

    return <div className=" ">{profileContent}</div>;
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
