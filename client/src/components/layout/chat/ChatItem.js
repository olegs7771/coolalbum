import React, { Component } from "react";

class ChatItem extends Component {
  render() {
    const { name, date, chatMessage } = this.props;
    return (
      <div>
        <li className="list-group-item ">
          <div className="row ">
            <div className="col-md-4 ">
              <span className="text-success">{name}</span>{" "}
              <span className="text-warning" style={{ fontSize: "0.7em" }}>
                {date}
              </span>
            </div>
            <div className="col-md-8 ">
              <span style={{ fontSize: "0.9em" }}>{chatMessage}</span>
            </div>
          </div>
        </li>
      </div>
    );
  }
}
export default ChatItem;
