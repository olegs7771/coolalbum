import React, { Component } from "react";

class ChatUsersItem extends Component {
  render() {
    console.log("this.props", this.props);

    const { name } = this.props;
    return (
      <li
        className="list-group-item"
        style={{ lineHeight: "0.5rem", textAlign: "left" }}
      >
        {name}
      </li>
    );
  }
}
export default ChatUsersItem;
