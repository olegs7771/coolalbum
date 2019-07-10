import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../../actions/postAction";
import InboxItems from "./InboxItems";

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
    const { posts } = this.state;
    if (posts) {
      console.log("posts", posts);
    }

    return <InboxItems />;
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
