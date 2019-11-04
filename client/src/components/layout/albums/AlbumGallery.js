import React, { Component } from "react";
import { connect } from "react-redux";

export class AlbumGallery extends Component {
  render() {
    return (
      <div className="card" style={{ width: "100%" }}>
        <img src={this.props.image} className="card-img-top" alt="..." />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumGallery);
