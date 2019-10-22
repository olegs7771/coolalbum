import React, { Component } from "react";
import { connect } from "react-redux";

export class AlbumCreate extends Component {
  render() {
    const { name } = this.props.auth.user;
    return <div>{name}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumCreate);
