import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../../actions/userActions";
import Spinner from "../../../utils/Spinner";
import ChatUsersItem from "./ChatUsersItem";

class ChatUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { users, loading } = this.props.users;
    console.log("user", users);

    let chatUsersContent;
    if (users === null || loading) {
      chatUsersContent = <Spinner />;
    } else {
      chatUsersContent = users.map((item, index) => (
        <ChatUsersItem key={index} name={item.name} />
      ));
    }
    return (
      <div>
        <span>{chatUsersContent}</span>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users
});
export default connect(
  mapStateToProps,
  { getAllUsers }
)(ChatUsers);
