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
      albumsContent = (
        <div className="mx-auto mt-5">
          <Spinner />
        </div>
      );
    } else {
      albumsContent = albums.map(album => (
        <AlbumItems
          key={album._id}
          image={album.image}
          title={album.title}
          desc={album.desc}
          date={album.date}
          id={album._id}
        />
      ));
    }
    let wellcomeUserContent;
    if (this.state.isUserHasAlbums === false) {
      wellcomeUserContent = (
        <p className="text-left h5">
          You don't have any albums. Time to create
          <Link to="/albums_create"> one</Link>
        </p>
      );
    } else {
      wellcomeUserContent = (
        <p className="text-left">
          Here you can edit Albums or
          <Link to="/albums_create"> add</Link> anoter one
        </p>
      );
    }

    return (
      <div
        className="row  my-4"
        style={{ height: !this.state.isUserHasAlbums ? "600px" : null }}
      >
        <div className="col-md-4 ">
          <div className="my-4">{wellcomeUserContent}</div>
        </div>
        <div className="col-md-8  ">
          <div className="row">{albumsContent}</div>
        </div>
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
