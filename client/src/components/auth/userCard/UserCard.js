import React, { Component } from "react";
import UserCardItem from "./UserCardItem";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUserAlbums } from "../../../actions/albumAction";
import Spinner from "../../../utils/Spinner";

class UserCard extends Component {
  render() {
    return <div className=" ">Here User Albums</div>;
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
