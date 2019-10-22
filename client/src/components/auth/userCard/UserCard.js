import React, { Component } from "react";
import UserCardItem from "./UserCardItem";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUserAlbums } from "../../../actions/albumAction";
import Spinner from "../../../utils/Spinner";

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: ""
    };

    props.getUserAlbums();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log("this.props.album", this.props.album);
    }
  }

  render() {
    const { user } = this.props;
    console.log("user", user);

    let userContent;
    if (user) {
      userContent = (
        <UserCardItem
          phone={user.phone}
          name={user.name}
          email={user.email}
          avatar={user.avatar}
          date={user.date}
          location={user.location}
        />
      );
    } else {
<<<<<<< HEAD
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
=======
      userContent = <Spinner />;
>>>>>>> 175de00e6e372553cd0e937cb2c5b39566bd7a20
    }

    return <div style={{ backgroundColor: "#95d0f0" }}>{userContent}</div>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  album: state.album
});

export default connect(
  mapStateToProps,
  { getUserAlbums }
)(UserCard);
