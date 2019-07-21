import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import ChatUsers from "./ChatUsers";
import ChatItem from "./ChatItem";
import { connect } from "react-redux";
import { chatMessage, loadChatMessages } from "../../../actions/chatAction";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

class Chat extends Component {
  state = {
    text: "",
    chatMessages: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  messageSendHandler = e => {
    e.preventDefault();

    const { text } = this.state;

    console.log("submitted");
    const data = {
      text
    };
    this.props.chatMessage(data);
  };
  componentDidMount() {
    this.props.loadChatMessages();
    socket.on("all", this.handleData);
  }
  handleData = all => {
    console.log("all", all);
    this.setState({
      chatMessages: all
    });
  };

  render() {
    const { name, text, date, chatMessages } = this.state;
    console.log("this.state", this.state.chatMessages);
    let chatMessagesContent;
    if (chatMessages) {
      chatMessagesContent = chatMessages.map((item, index) => (
        <ChatItem
          key={index}
          name={item.name}
          text={item.text}
          date={item.date}
        />
      ));
    }

    return (
      <div className=" my-4 mx-auto ">
        <div className="h4 text-center"> Here Chat</div>
        <div className="row">
          <div className="col-md-4 col-4 border">
            <h5 className="h5">Online Users</h5>
            <ChatUsers />
          </div>
          <div className="col-md-8 col-8 ">
            <h5 className="mt-2">Chat</h5>
            <div className="container">
              <ul className="my-2  p-2">{chatMessagesContent}</ul>
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
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { chatMessage, loadChatMessages }
)(Chat);
