import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import ChatUsersItem from "./ChatUsersItem";

class Chat extends Component {
  messageSendHandler = e => {
    e.preventDefault();
    console.log("submitted");
  };

  render() {
    return (
      <div className=" my-4 mx-auto ">
        <div className="h4 text-center"> Here Chat</div>
        <div className="row">
          <div className="col-md-4 col-4 border">
            <h5 className="h5">Online Users</h5>
            <ChatUsersItem />
          </div>
          <div className="col-md-8 col-8 border">
            <h5 className="mt-2">Chat</h5>
            <div className="container">
              <form onSubmit={this.messageSendHandler}>
                <TextAreaFormGroup />
                <button type="submit" className="btn btn-light mx-auto mb-2">
                  send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Chat;
