import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import ChatItem from "./ChatItem";
import TextFormSelect from "../../textFormGroup/TextFormSelect";
import { connect } from "react-redux";
import {
  chatMessage,
  loadChatMessages,
  loadChatMessagesByDate
} from "../../../actions/chatAction";
import Socket_io from "../../../utils/Socket_io";

class Chat extends Component {
  state = {
    text: "",
    chatMessages: null,
    onlineUsers: null,
    onlineUserMessage: "",
    chatDates: [],
    select: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  //select date to show chat messages
  onChangeSelect = e => {
    const socket = Socket_io();
    console.log("e.target.value", e.target.value);
    const data = {
      date: e.target.value
    };
    this.props.loadChatMessagesByDate(data);
    socket.on("bydate", messagesByDate => {
      console.log("messagesByDate", messagesByDate);

      this.setState({
        chatMessages: messagesByDate
      });
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
    this.props.loadChatMessages();
    const socket = Socket_io();
    console.log("socket", socket);

    const { name } = this.props.auth.user;
    //emit new user to all
    socket.emit("new_user", name);
    socket.on("online", name => {
      this.setState({
        onlineUserMessage: name + "  online"
      });
    });
    socket.on("all", data => {
      console.log("all data", data);

      this.setState({
        chatMessages: data,
        chatDates: data
      });
    });
  }

  render() {
    const {
      text,
      chatMessages,
      onlineUserMessage,
      chatDates,
      select
    } = this.state;
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
          uid={item.uid}
        />
      ));
    }

    return (
      <div className=" my-4  ">
        <div className="row ">
          <div className="col-md-3 mb-1">
            <TextFormSelect
              options={chatDates}
              name="select"
              onChange={this.onChangeSelect}
              value={select}
            />
          </div>
          <div className="  col-md-9 col-12 ">
            {/* {Chat Here} */}
            <div>{chatMessagesContent}</div>
            {/* {End Chat} */}
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
  { chatMessage, loadChatMessages, loadChatMessagesByDate }
)(Chat);
