import React, { Component } from "react";

import Spinner from "../../../utils/Spinner";
import ChatUsersItem from "./ChatUsersItem";

class ChatUsers extends Component {
  componentDidMount() {
    // this.props.getOnlineUsers();
  }

  render() {
    const { onlineUsers } = this.props;
    // console.log("user", users);

    let chatUsersContent;
    if (onlineUsers) {
      chatUsersContent = onlineUsers.map((item, index) => (
        <ChatUsersItem key={index} name={item.name} />
      ));
    }
    return <ul className="list-group">{<span>{chatUsersContent}</span>}</ul>;
  }
}

export default ChatUsers;
