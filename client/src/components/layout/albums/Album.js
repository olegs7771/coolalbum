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
    // console.log("window.innerWidth", window.innerWidth);
    console.log("this.state", this.state);
    console.log("this.props", this.props);

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
    if (this.state.isUserHasAlbums === false || this.props.loading === false) {
      wellcomeUserContent = (
        <p className="text-left ">
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
        <div className="col-md-2 ">
          <div className="my-4">{wellcomeUserContent}</div>
        </div>
        <div className="col-md-10  ">
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
