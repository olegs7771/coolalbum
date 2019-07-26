import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import ChatUsers from "./ChatUsers";
import ChatItem from "./ChatItem";
import { connect } from "react-redux";
import {
  chatMessage,
  loadChatMessages,
  chatLoader
} from "../../../actions/chatAction";
import Socket_io from "../../../utils/Socket_io";

class Chat extends Component {
  state = {
    text: "",
    chatMessages: "",
    onlineUsers: [],
    typing: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.chatLoader();
    // console.log("loading");
    this.setState({
      typing: true
    });
  };
  messageSendHandler = e => {
    e.preventDefault();
    const { text } = this.state;

    const data = {
      text
    };
    if (data.text) {
      this.props.chatMessage(data);
    }
    this.setState({
      text: "",
      typing: false
    });
  };

  componentDidMount() {
    const socket = Socket_io();
    console.log("socket", socket);

    const { name } = this.props.auth.user;

    socket.emit("user", name);
    const anotherName = "alice";
    socket.emit("anotherUser", anotherName);

    this.props.loadChatMessages();
    socket.on("all", data => {
      this.setState({
        chatMessages: data
      });
    });
  }

  render() {
    const { text, chatMessages, typing } = this.state;
    console.log("this.state", this.state);
    let typingContent;
    if (typing) {
      typingContent = <div className="mx-auto">Typing...</div>;
    } else {
      typingContent = null;
    }

    let chatMessagesContent;
    if (chatMessages) {
      chatMessagesContent = chatMessages.map((item, index) => (
        <ChatItem
          key={index}
          name={item.name}
          text={item.text}
          date={item.date}
          id={item._id}
        />
      ));
    }

    return (
      <div className=" my-4 mx-auto ">
        <div className="row">
          <div className="col-md-3 col-12 ">
            <h5 className=" mt-2">Online Users</h5>
            <ChatUsers />
          </div>
          <div className="col-md-9 col-12 ">
            <h5 className="mt-2">Chat</h5>
            <div>{chatMessagesContent}</div>
            {typingContent}
            <form onSubmit={this.messageSendHandler}>
              <TextAreaFormGroup
                onChange={this.onChange}
                value={text}
                name="text"
                placeholder="write something.."
              />

              <input
                type="submit"
                value="send"
                className="btn btn-light mx-auto mb-2"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { chatMessage, loadChatMessages, chatLoader }
)(Chat);
