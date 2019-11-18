import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import FaceBookBtn from "../../../utils/FaceBookBtn";
import { connect } from "react-redux";
import { sendPost } from "../../../actions/postAction";

import styled from "styled-components";

class Post extends Component {
  state = {
    text: "",
    avatar: "",
    name: "",
    showBtn: true,
    isAuthenticated: false,
    toEmail: "",
    toID: "",
    message: null
  };

  componentDidMount() {
    //get toMail from changing props
    this.setState({
      toEmail: this.props.toEmail,
      toID: this.props.toID
    });

    const { auth } = this.props;
    if (auth.isAuthenticated) {
      this.setState({
        isAuthenticated: true
      });
    }
    //obtain sender creds from currentlly authenticated user
    if (auth.user) {
      this.setState({
        avatar: auth.user.avatar,
        name: auth.user.name,
        email: auth.user.email,
        rotation: auth.user.rotation
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      console.log("this.props.message", this.props.message);
      this.setState({
        message: this.props.message.message.post
      });
      setTimeout(() => {
        this.setState({
          message: []
        });
      }, 5000);
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      showBtn: true
    });
  };
  _sendPost = e => {
    e.preventDefault();
    const { text, name, email, avatar, rotation, toEmail, toID } = this.state;

    const senderText = text; //text of post
    const senderAvatar = avatar; //sender avatar
    const senderAvatarRotation = rotation; //sender avatar rotation
    const senderName = name; //sender name
    const senderEmail = email; //sender name
    const toId = toID; // receiver ID

    const data = {
      senderText,
      senderAvatar,
      senderAvatarRotation,
      senderName,
      senderEmail,
      toEmail,
      toId
    };
    //sending post data to postAction
    this.props.sendPost(data);
  };

  render() {
    //styles
    const FontSize = styled.span`
      font-size: 12px;
    `;

    let formContent;
    let btnContent;
    let avatarContent;

    const { showBtn, isAuthenticated, text, avatar, message } = this.state;
    if (showBtn) {
      if (isAuthenticated) {
        btnContent = (
          <div>
            <button className="btn btn-light mb-2">Send</button>
          </div>
        );
        avatarContent = (
          <div
            style={{
              paddingTop: this.props.auth.user.rotation > 0 ? "13%" : null,
              width: "100%"
            }}
          >
            <img
              src={avatar}
              alt="user"
              style={{
                width: "100%",
                transform: `rotate(${this.state.rotation}deg)`
              }}
            />
          </div>
        );
      } else {
        btnContent = (
          <div>
            <FaceBookBtn />
          </div>
        );
      }
    }
    //show message instead of textarea form
    if (message) {
      formContent = (
        <div className="text-success my-2">
          <FontSize>
            <span>{message}</span>
          </FontSize>
        </div>
      );
    } else {
      formContent = (
        <div className="row  ">
          <div className="col-lg-4   col-4 mt-1 ">{avatarContent}</div>

          <div
            className=" col-lg-8 col-8  pt-5 
          
            "
            // style={{ marginTop: "-20px" }}
          >
            <form onSubmit={this._sendPost}>
              <TextAreaFormGroup
                name="text"
                value={text}
                onChange={this.onChange}
              />
              {btnContent}
            </form>
          </div>
        </div>
      );
    }

    return <div>{formContent}</div>;
  }
}
const mapStateToprops = state => ({
  auth: state.auth,
  message: state.message
});
export default connect(mapStateToprops, { sendPost })(Post);
