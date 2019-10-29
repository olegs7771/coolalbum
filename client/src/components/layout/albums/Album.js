import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserAlbums } from "../../../actions/albumAction";
import Spinner from "../../../utils/Spinner";
import AlbumItems from "./AlbumItems";

export class Album extends Component {
  state = {
    isUserHasAlbums: false
  };

  componentDidMount() {
    this.props.getUserAlbums();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.album !== this.props.album) {
      if (this.props.album.albums) {
        if (this.props.album.albums.length > 0) {
          this.setState({
            isUserHasAlbums: true
          });
        }
      }
    }
  }

  render() {
    console.log("this.props.album", this.props.album);
    const { loading, albums } = this.props.album;
    let albumsContent;
    if (albums === null || loading) {
      albumsContent = <Spinner />;
    } else {
      albumsContent = albums.map(album => (
        <AlbumItems key={album._id} title={album.title} />
      ));
    }

    return (
      <div className="row  my-4">
        <div className="col-md-4 border">text</div>
        <div className="col-md-8 border">{albumsContent}</div>
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
