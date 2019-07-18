import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import FaceBookBtn from "../../../utils/FaceBookBtn";
import { connect } from "react-redux";
import { sendPost } from "../../../actions/postAction";
import Avatar from "../../../utils/Avatar";
import styled from "styled-components";

class Post extends Component {
  state = {
    text: "",
    avatar: "",
    name: "",
    showBtn: false,
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
        email: auth.user.email
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      console.log("this.props.message", this.props.message);
      this.setState({
        message: this.props.message.message.post
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      showBtn: true
    });
  };
  sendPost = e => {
    e.preventDefault();
    const { text, name, email, avatar, toEmail, toID } = this.state;
    const senderText = text; //text of post
    const senderAvatar = avatar; //sender avatar
    const senderName = name; //sender name
    const senderEmail = email; //sender name
    const toId = toID; // receiver ID

    const data = {
      senderText,
      senderAvatar,
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
    console.log("this.state", this.state);
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
          <img src={avatar} alt="user" style={{ width: "2.7rem" }} />
        );
      } else {
        btnContent = (
          <div>
            <FaceBookBtn />
          </div>
        );

        avatarContent = <Avatar />;
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
        <div className="row ">
          <div className="col-lg-3  col-3 mt-1  ">{avatarContent}</div>

          <div
            className="col-md-12 col-lg-8 col-9
          
            "
            style={{ marginTop: "-20px" }}
          >
            <form onSubmit={this.sendPost}>
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
export default connect(
  mapStateToprops,
  { sendPost }
)(Post);
