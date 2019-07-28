import React, { Component } from "react";

class ChatOnlineItem extends Component {
  render() {
    const { uname } = this.props;
    console.log("this.props", this.props);

    return <li className="list-group-item">{uname}user here</li>;
  }
}
export default ChatOnlineItem;
