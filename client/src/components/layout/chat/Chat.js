import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import ChatUsers from "./ChatUsers";
import ChatItem from "./ChatItem";
import ChatOnlineItem from "./ChatOnlineItem";
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
    chatMessages: null,
    onlineUsers: null,
    onlineUserMessage: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // this.props.chatLoader();
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
    const { name } = this.props.auth.user;

    //emit new user to all
    socket.emit("new_user", name);
    socket.on("online", name => {
      this.setState({
        onlineUserMessage: name + "  online"
      });
      setTimeout(() => {
        this.setState({
          onlineUserMessage: ""
        });
      }, 5000);
      console.log("user online");
    });

    socket.on("connected", message => {
      console.log("message", message);
    });

    this.props.loadChatMessages();
    socket.on("all", data => {
      this.setState({
        chatMessages: data
      });
    });
    socket.on("liveuser", uname => {
      let users = [];
      users.push(uname);
      this.setState({
        onlineUsers: users
      });
    });
  }

  render() {
    const { text, chatMessages, onlineUsers, onlineUserMessage } = this.state;
    console.log("this.state", this.state);

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
    let chatUsersContent;
    if (onlineUsers) {
      chatUsersContent = onlineUsers.map((item, index) => (
        <ChatOnlineItem key={index} uname={item.name} />
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
            <ul className="list-group">{chatUsersContent}</ul>
            <div className="mx-auto text-success">{onlineUserMessage}</div>
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
