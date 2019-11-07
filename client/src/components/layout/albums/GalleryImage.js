import React, { Component } from "react";
import { connect } from "react-redux";
import AlbumGallery from "./AlbumGallery";
import { Link, withRouter } from "react-router-dom";

class GalleryImage extends Component {
  componentDidMount() {
    if (!this.props.album.selectedImage) {
      this.props.history.push("/albums");
    }
  }

  render() {
    if (this.props.album.selectedImage) {
      return (
        <div className="my-1">
          <div className="mx-auto my-4">
            <div className="row">
              <div className="col-md-2 border">
                <Link to={`/album_edit/${this.props.album.album._id}`}>
                  Back To Album
                </Link>
              </div>
              <div className="col-md-10 border">
                <span className="h6">Gallery</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="card mb-3">
                <img
                  src={this.props.album.selectedImage.image}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              {this.props.album.gallery.map(item => (
                <AlbumGallery
                  key={item._id}
                  id={item._id}
                  image={item.img}
                  comments={item.comments}
                  title={item.img_title}
                  date={item.date}
                />
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}

const mapStateToProps = state => ({
  album: state.album
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GalleryImage));
