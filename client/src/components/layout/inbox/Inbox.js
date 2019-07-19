import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/postAction";
import InboxItems from "./InboxItems";
import Spinner from "../../../utils/Spinner";

class Inbox extends Component {
  state = {
    loading: false,
    posts: null,
    message: {}
  };

  componentDidMount() {
    this.props.getPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.post !== this.props.post) {
      this.setState({
        posts: this.props.post
      });
    }
    if (prevProps.message !== this.props.message) {
      this.setState({
        message: this.props.message
      });
    }
  }

  render() {
    const { posts, loading, message } = this.state;
    let content;
    if (posts === null || loading) {
      content = (
        <div className="row my-4 ">
          <Spinner />
        </div>
      );
    } else {
      content = (
        <div className="row">
          {posts.map((item, index) => (
            <InboxItems
              key={index}
              name={item.senderName}
              avatar={item.senderAvatar}
              date={item.date}
              text={item.text}
              id={item._id}
            />
          ))}
        </div>
      );
    }

    return (
      <div className=" my-2">
        {message.post ? <div className="text-success my-2">Deleted</div> : null}
        {content}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post.post,
  message: state.message.message
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Inbox);
