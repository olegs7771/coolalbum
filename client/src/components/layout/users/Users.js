import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../../actions/userActions";

import Spinner from "../../../utils/Spinner";
import UserItems from "./UserItems";

// import styled from "styled-components";

class Users extends Component {
  state = {
    users: [],
    loading: false,
    albumsPublic: "",
    albumsPrivate: "",
    albums: [],
    noUsers: true
  };

  componentDidMount() {
    //load all users
    const data = {
      id: this.props.user.id
    };
    this.props.getAllUsers(data);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      if (this.props.users.users) {
        console.log("this.props.users", this.props.users);
        if (this.props.users.users.length > 0) {
          this.setState({
            noUsers: false
          });
        }
      }

      this.setState({
        users: this.props.users.users
      });
    }
    if (prevProps.album !== this.props.album) {
      this.setState({
        users: this.props.users.users
      });
      console.log("albums", this.props.album.albums);
    }
  }

  render() {
    console.log("this.state", this.state);

    let userContent;

    const { users, loading } = this.state;
    if (users === null || loading) {
      userContent = (
        <div className="pt-5 ">
          <Spinner />
        </div>
      );
    } else {
      userContent = (
        <div className="row">
          {this.state.noUsers ? (
            <div className="my-3 mx-auto">
              <span className="h5">No users to show</span>
            </div>
          ) : null}
          {users.map((item, index) => (
            <UserItems
              key={index}
              name={item.name}
              phone={item.phone}
              email={item.email}
              location={item.location}
              avatar={item.avatar}
              date={item.date}
              id={item._id}
              rotation={item.rotation}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        className="my-4 mx-auto"
        style={{ height: this.state.noUsers ? 600 : null }}
      >
        {userContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  user: state.auth.user,
  album: state.album
});
export default connect(mapStateToProps, { getAllUsers })(Users);
