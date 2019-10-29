import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserAlbums } from "../../../actions/albumAction";
import Spinner from "../../../utils/Spinner";

export class Album extends Component {
  componentDidMount() {
    this.props.getUserAlbums();
  }

  render() {
    console.log("this.props.album", this.props.album);
    const { loading, albums } = this.props.album;
    let albumsContent;
    if (albums === null || loading) {
      albumsContent = <Spinner />;
    } else {
      albumsContent = (
        <div className="col-md-12 border">here come all albums</div>
      );
    }

    return (
      <div className="row border my-4">
        <div className="col-md-12 my-3">{albumsContent}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  album: state.album
});

const mapDispatchToProps = { getUserAlbums };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Album);
