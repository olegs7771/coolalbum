import React, { Component } from "react";
import { connect } from "react-redux";
import AlbumGallery from "./AlbumGallery";
import { Link, withRouter } from "react-router-dom";
import Moment from "moment";
import { deleteImage } from "../../../actions/albumAction";

class GalleryImage extends Component {
  state = {
    message: {}
  };
  componentDidMount() {
    if (!this.props.album.selectedImage) {
      this.props.history.push("/albums");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.message !== this.props.message) {
      this.setState({
        message: this.props.message
      });
    }
  }

  _deleteImage = e => {
    e.preventDefault();
    console.log("image id :", this.props.album.selectedImage.id);
    const data = {
      album_id: this.props.album.album._id,
      image_id: this.props.album.selectedImage.id
    };
    this.props.deleteImage(data, this.props.history);
  };

  render() {
    console.log("this.state", this.state);

    if (this.props.album.selectedImage) {
      return (
        <div className="my-1">
          <div className=" my-4">
            <div className="row">
              <div className="col-md-2 ">
                <Link to={`/album_edit/${this.props.album.album._id}`}>
                  Back To Album
                </Link>
              </div>
              <div className="col-md-10 ">
                <span className="h5 text-success ">
                  {this.props.album.album.title} gallery
                </span>
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
                  <h5 className="card-title">
                    {this.props.album.selectedImage.title}
                  </h5>
                  <p className="card-text">
                    {this.props.album.selectedImage.comments}
                  </p>
                  <div className="row">
                    <div className="col-md-10">
                      <p className="card-text">
                        <small className="text-muted">
                          Last updated{" "}
                          {Moment(this.props.album.selectedImage.date).format(
                            "DD/MM/YYYY"
                          )}
                        </small>
                      </p>
                    </div>
                    <div className="col-md-2">
                      {this.state.message.message ? (
                        <span className="text-success h6">
                          {this.state.message.message}
                        </span>
                      ) : null}
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={this._deleteImage}
                      >
                        Delete Image
                      </button>
                    </div>
                  </div>
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
  album: state.album,
  message: state.message.message
});

const mapDispatchToProps = { deleteImage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GalleryImage));
