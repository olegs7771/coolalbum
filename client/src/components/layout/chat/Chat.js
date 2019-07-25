import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import ChatUsers from "./ChatUsers";
import ChatItem from "./ChatItem";
import { connect } from "react-redux";
import { chatMessage, loadChatMessages } from "../../../actions/chatAction";
import Socket_io from "../../../utils/Socket_io";

class Chat extends Component {
  state = {
    text: "",
    chatMessages: "",
    onlineUsers: []
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
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
      text: ""
    });
  };

  componentDidMount() {
    this.props.loadChatMessages();
    Socket_io().on("all", data => {
      this.setState({
        chatMessages: data
      });
    });
  }

  // handleOnlineUsers = online => {
  //   console.log("online", online);
  // };

  render() {
    const { text, chatMessages } = this.state;
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
  { chatMessage, loadChatMessages }
)(Chat);
