import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import FaceBookBtn from "../../../utils/FaceBookBtn";
import { connect } from "react-redux";
import { sendPost } from "../../../actions/postAction";
import Avatar from "../../../utils/Avatar";

class Post extends Component {
  state = {
    text: "",
    avatar: "",
    name: "",
    showBtn: false,
    isAuthenticated: false,
    toEmail: "",
    toID: ""
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

    this.props.sendPost(data);
  };

  render() {
    console.log("this.state", this.state);

    let btnContent;
    let avatarContent;
    const { showBtn, isAuthenticated, text, avatar, name } = this.state;
    if (showBtn) {
      if (isAuthenticated) {
        btnContent = (
          <div>
            <button className="btn btn-light mb-2">Send</button>
          </div>
        );
        avatarContent = (
          <img src={avatar} alt="user" style={{ width: "5rem" }} />
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

    return (
      <div className="row">
        <div className="col-lg-3 d-none d-lg-block   mt-4 mb-3 mr-3 rounded">
          {avatarContent}
        </div>

        <div className="col-md-12 col-lg-8 ">
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
}
const mapStateToprops = state => ({
  auth: state.auth
});
export default connect(
  mapStateToprops,
  { sendPost }
)(Post);
