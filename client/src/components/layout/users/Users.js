import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../../actions/userActions";
import Spinner from "../../../utils/Spinner";
import UserItems from "./UserItems";
// import styled from "styled-components";

class Users extends Component {
  state = {
    users: [],
    loading: false
  };

  componentDidMount() {
    //load all users

    const data = {
      id: this.props.user.id
    };
    this.props.getAllUsers(data);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        users: this.props.users.users
      });
    }
  }

  render() {
    //styles

    let userContent;
    const { users, loading } = this.state;
    if (users === null || loading) {
      userContent = <Spinner />;
    } else {
      userContent = (
        <div className="row">
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
            />
          ))}
        </div>
      );
    }

    return <div className="  my-4 mx-auto">{userContent}</div>;
  }
}

const mapStateToProps = state => ({
  users: state.users,
  user: state.auth.user
});
export default connect(
  mapStateToProps,
  { getAllUsers }
)(Users);
