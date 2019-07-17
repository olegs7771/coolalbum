import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/postAction";
import InboxItems from "./InboxItems";
import Spinner from "../../../utils/Spinner";

class Inbox extends Component {
  state = {
    loading: false,
    posts: null
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
  }

  render() {
    const { posts, loading } = this.state;
    let content;
    if (posts === null || loading) {
      content = (
        <div className="row my-4 ">
          <Spinner />
        </div>
      );
    } else {
      content = (
        <div className="row my-4 ">
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

    return <div>{content}</div>;
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post.post
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Inbox);
