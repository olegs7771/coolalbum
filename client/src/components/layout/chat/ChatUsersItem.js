import React, { Component } from "react";

class ChatUsersItem extends Component {
  render() {
    // const { name } = this.props;
    return (
      <li
        className="list-group-item"
        style={{ lineHeight: "0.5rem", textAlign: "left" }}
      >
        {/* {name} */}
        some user
      </li>
    );
  }
}
export default ChatUsersItem;
