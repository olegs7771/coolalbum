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
    const { loading, albums } = this.props;
    let albumsContent;
    if (albums === null || loading) {
      albumsContent = <Spinner />;
    } else {
      albumsContent = <div>Here ALBUMS</div>;
    }

    return (
      <div
        className="row border my-4"
        style={{ height: albums == null ? 600 : null }}
      >
        <div className="h5 mx-auto">
          {albums == null ? (
            <div>
              <span>You do not have any Albums</span>

              <Link className="nav-link " to="/albums_create">
                Create Album
              </Link>
            </div>
          ) : (
            <span>Albums</span>
          )}
        </div>
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
