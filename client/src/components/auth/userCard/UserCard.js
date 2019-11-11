import React, { Component } from "react";
import UserCardItem from "./UserCardItem";
// import { Link } from "react-router-dom";

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

    let userContent;
    if (user) {
      userContent = (
        <UserCardItem
          phone={user.phone}
          name={user.name}
          email={user.email}
          avatar={user.avatar}
          rotation={user.rotation}
          date={user.date}
          location1={user.location}
        />
      );
    } else {
      userContent = <Spinner />;
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
