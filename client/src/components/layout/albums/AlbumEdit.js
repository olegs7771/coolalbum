import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import Spinner from "../../../utils/Spinner";
import AlbumGallery from "./AlbumGallery";
import { imageOrientation } from "../../../utils/imageOrientation";
import { rotateDeg } from "../../../utils/imageOrientationSwitch";

import { withRouter } from "react-router-dom";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import TextFormGroup from "../../textFormGroup/TextFormGroup";

import {
  selectAlbum,
  addImageToGallery,
  deleteAlbum,
  getGallery
} from "../../../actions/albumAction";

const getOrientation = imageOrientation();

class AlbumEdit extends Component {
  state = {
    albumHasGallery: false,
    showDeleteWorning: false,
    image_gallery_comment: "",
    image_gallery_title: "",
    message: {},
    isMobile: false,
    rotation: ""
  };
  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const data = {
      id: this.props.match.params.id
    };
    this.props.selectAlbum(data);
    this.props.getGallery(data);
    if (window.innerWidth < 500) {
      this.setState({
        isMobile: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //If Gallery in Album [].length>0 split screen
    if (prevProps.album !== this.props.album) {
      if (this.props.album.gallery.length > 0) {
        this.setState({
          albumHasGallery: true
        });
      }
    }
    if (prevProps.message !== this.props.message) {
      this.setState({
        message: this.props.message
      });
    }
  }

  //Select Image To Gallery
  _selectFile = e => {
    console.log("e.target.files[0]", e.target.files[0]);

    this.setState({
      selectedImage: URL.createObjectURL(e.target.files[0]),
      uploadImage: e.target.files[0]
    });
    getOrientation(e.target.files[0], orientation => {
      console.log("orientation", orientation);
      const rotationDeg = rotateDeg(orientation);
      console.log("rotationDeg ", rotationDeg);

      this.setState({
        rotation: rotationDeg
      });
    });
  };

  //Add Image To the Gallery
  _addImageToGallery = e => {
    this.setState({
      isSubmitted: true
    });
    e.preventDefault();
    const fd = new FormData();
    fd.append("gallery_img", this.state.uploadImage);
    fd.append("img_title", this.state.image_gallery_title);
    fd.append("comments", this.state.image_gallery_comment);
    fd.append("id", this.props.album.album._id);
    fd.append("rotation", this.state.rotation);
    const data = {
      history: this.props.history,
      id: this.props.album.album._id
    };

    this.props.addImageToGallery(fd, data);
  };

  //Show worning on onMouseEnter event

  //Delete Album by id
  _deleteAlbum = e => {
    console.log("delete ", this.props.album.album._id);
    const data = {
      id: this.props.album.album._id
    };
    this.props.deleteAlbum(data, this.props.history);
  };

  render() {
    //If Album has gallery split to col
    if (!this.state.albumHasGallery) {
      if (this.props.album.album) {
        return (
          <div className="py-3">
            <div className=" py-0">
              <img
                src={this.props.album.album.image}
                className="card-img-top "
                alt="..."
                style={{
                  paddingTop:
                    this.props.album.album.rotation !== "0" ? "25%" : null,

                  paddingBottom:
                    this.props.album.album.rotation !== "0" ? "25%" : null,
                  width: "100%",
                  transform: `rotate(${this.props.album.album.rotation}deg)`
                }}
              />

              <div className="row">
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">
                      {this.props.album.album.title}
                    </h5>
                    <p className="card-text">{this.props.album.album.desc}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Created{" "}
                        {Moment(this.props.album.album.date).format(
                          "DD/MM/YYYY"
                        )}
                      </small>
                    </p>
                  </div>
                </div>
                <div className="col-md-6 ">
                  {this.state.selectedImage ? (
                    <div className="p-1 border">
                      <div
                        style={{
                          paddingTop: this.state.rotation === 0 ? null : "22%",

                          paddingBottom:
                            this.state.rotation === 0 ? null : "22%"
                        }}
                      >
                        <img
                          onLoad={this._onLoadImage}
                          src={this.state.selectedImage}
                          alt=""
                          className="rounded"
                          style={{
                            width: "100%",
                            transform: `rotate(${this.state.rotation}deg)`
                          }}
                        />
                      </div>
                      {!this.state.message.gallery && this.state.isSubmitted ? (
                        <Spinner />
                      ) : null}
                      {this.state.message.gallery ? (
                        <span className="text-success h6">
                          {this.state.message.gallery}
                        </span>
                      ) : null}
                      <div className=" m-1  ">
                        <TextFormGroup
                          placeholder="Add Title to Picture.."
                          type="text"
                          name="image_gallery_title"
                          value={this.state.image_gallery_title}
                          onChange={this._onChange}
                          style={{
                            marginTop: "-20px",
                            marginBottom: "-10px"
                          }}
                        />
                        <TextAreaFormGroup
                          placeholder="Add some comments.."
                          type="text"
                          name="image_gallery_comment"
                          value={this.state.image_gallery_comment}
                          onChange={this._onChange}
                          style={{
                            marginTop: "-20px"
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div
                    style={{
                      marginTop:
                        this.state.selectedImage && !this.state.isMobile
                          ? "-30px"
                          : null
                    }}
                  >
                    <div className={this.state.isMobile ? "row" : "row my-4"}>
                      <div className="col-md-6 col-6  ">
                        <form onSubmit={this._addImageToGallery}>
                          <div
                            className="custom-file"
                            style={{ width: "100%" }}
                          >
                            <input
                              type="file"
                              name="gallery_img"
                              className="custom-file-input"
                              onChange={this._selectFile}
                            />
                            <label className="custom-file-label bg-success">
                              <p className="text-left text-white">
                                {" "}
                                Pick Image
                              </p>
                            </label>
                          </div>
                          {this.state.selectedImage ? (
                            <div className="my-2 mx-auto">
                              <input
                                type="submit"
                                value="Add To The Gallery"
                                className="btn btn-sm btn-success"
                              />
                            </div>
                          ) : null}
                        </form>
                      </div>
                      <div className="col-md-6 col-6 pt-1  ">
                        <button className="btn">
                          <i
                            className="fas fa-trash-alt text-danger "
                            onClick={this._deleteAlbum}
                          >
                            {" "}
                            Delete Album
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ height: 600, paddingTop: 250 }}>
            <Spinner />
          </div>
        );
      }
      //Gallery [] > 0
    } else {
      if (this.props.album.album) {
        return (
          <div className="row py-2">
            <div className="col-lg-10 border">
              <div className=" py-0">
                <img
                  src={this.props.album.album.image}
                  className="card-img-top "
                  alt="..."
                  style={{
                    paddingTop:
                      this.props.album.album.rotation !== "0" ? "25%" : null,

                    paddingBottom:
                      this.props.album.album.rotation !== "0" ? "25%" : null,
                    width: "100%",
                    transform: `rotate(${this.props.album.album.rotation}deg)`
                  }}
                />

                <div className="row">
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">
                        {this.props.album.album.title}
                      </h5>
                      <p className="card-text">{this.props.album.album.desc}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          Created{" "}
                          {Moment(this.props.album.album.date).format(
                            "DD/MM/YYYY"
                          )}
                        </small>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    {this.state.selectedImage ? (
                      <div className="p-1 border">
                        <div
                          style={{
                            paddingTop:
                              this.state.rotation === 0 ? null : "22%",

                            paddingBottom:
                              this.state.rotation === 0 ? null : "22%"
                          }}
                        >
                          <img
                            onLoad={this._onLoadImage}
                            src={this.state.selectedImage}
                            alt=""
                            className="rounded"
                            style={{
                              width: "100%",
                              transform: `rotate(${this.state.rotation}deg)`
                            }}
                          />
                        </div>
                        {!this.state.message.gallery &&
                        this.state.isSubmitted ? (
                          <Spinner />
                        ) : null}
                        {this.state.message.gallery ? (
                          <span className="text-success h6">
                            {this.state.message.gallery}
                          </span>
                        ) : null}
                        <div className=" m-1  ">
                          <TextFormGroup
                            placeholder="Add Title to Picture.."
                            type="text"
                            name="image_gallery_title"
                            value={this.state.image_gallery_title}
                            onChange={this._onChange}
                            style={{
                              marginTop: "-20px",
                              marginBottom: "-10px"
                            }}
                          />
                          <TextAreaFormGroup
                            placeholder="Add some comments.."
                            type="text"
                            name="image_gallery_comment"
                            value={this.state.image_gallery_comment}
                            onChange={this._onChange}
                            style={{
                              marginTop: "-20px"
                            }}
                          />
                        </div>
                      </div>
                    ) : null}
                    <div
                      style={{
                        marginTop:
                          this.state.selectedImage && !this.state.isMobile
                            ? "-30px"
                            : null
                      }}
                    >
                      <div className={this.state.isMobile ? "row" : "row my-4"}>
                        <div className="col-md-6 col-6  ">
                          <form onSubmit={this._addImageToGallery}>
                            <div
                              className="custom-file"
                              style={{ width: "100%" }}
                            >
                              <input
                                type="file"
                                name="gallery_img"
                                className="custom-file-input"
                                onChange={this._selectFile}
                              />
                              <label className="custom-file-label bg-success">
                                <p className="text-left text-white">
                                  {" "}
                                  Pick Image
                                </p>
                              </label>
                            </div>
                            {this.state.selectedImage ? (
                              <div className="my-2 mx-auto">
                                <input
                                  type="submit"
                                  value="Add To The Gallery"
                                  className="btn btn-sm btn-success"
                                />
                              </div>
                            ) : null}
                          </form>
                        </div>
                        <div className="col-md-6 col-6 pt-1  ">
                          <button className="btn">
                            <i
                              className="fas fa-trash-alt text-danger "
                              onClick={this._deleteAlbum}
                            >
                              {" "}
                              Delete Album
                            </i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-6 d-line">
              {this.props.album.gallery.map(item => (
                <AlbumGallery
                  key={item._id}
                  id={item._id}
                  image={item.img}
                  comments={item.comments}
                  title={item.img_title}
                  date={item.date}
                  rotation={item.rotation}
                />
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ height: 600, paddingTop: 250 }}>
            <Spinner />
          </div>
        );
      }
    }
  }
}
const mapStateToProps = state => ({
  album: state.album,
  message: state.message.message
});

export default connect(mapStateToProps, {
  selectAlbum,
  addImageToGallery,
  deleteAlbum,
  getGallery
})(withRouter(AlbumEdit));
