import React, { Component } from "react";

class ChatUsersItem extends Component {
  render() {
    console.log("this.props", this.props);

    const { name } = this.props;
    return (
      <ul className=" list-group">
        <li className="list-group-item">{name}</li>
      </ul>
    );
  }
}
export default ChatUsersItem;
