import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import Spinner from "../../../utils/Spinner";
import AlbumGallery from "./AlbumGallery";

import { withRouter } from "react-router-dom";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import TextFormGroup from "../../textFormGroup/TextFormGroup";

import {
  selectAlbum,
  addImageToGallery,
  deleteAlbum,
  getGallery
} from "../../../actions/albumAction";
class AlbumEdit extends Component {
  state = {
    albumHasGallery: false,
    showDeleteWorning: false,
    image_gallery_comment: "",
    image_gallery_title: "",
    message: {}
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
  }

  //Select Image To Gallery
  _selectFile = e => {
    this.setState({
      selectedImage: URL.createObjectURL(e.target.files[0]),
      uploadImage: e.target.files[0]
    });
  };

  //Add Image To the Gallery
  _addImageToGallery = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("gallery_img", this.state.uploadImage);
    fd.append("img_title", this.state.image_gallery_title);
    fd.append("comments", this.state.image_gallery_comment);
    fd.append("id", this.props.album.album._id);
    const data = {
      history: this.props.history,
      id: this.props.album.album._id
    };

    this.props.addImageToGallery(fd, data);
  };

  //Show worning on onMouseEnter event

  _onMouseEnter = e => {
    console.log("event.type", e.type);
    if (e.type === "mouseenter") {
      this.setState({
        showDeleteWorning: true
      });
    }
  };
  _onMouseLeave = e => {
    console.log("event.type", e.type);
    if (e.type === "mouseleave") {
      this.setState({
        showDeleteWorning: false
      });
    }
  };

  //Delete Album by id
  _deleteAlbum = e => {
    console.log("delete ", this.props.album.album._id);
    const data = {
      id: this.props.album.album._id
    };
    this.props.deleteAlbum(data, this.props.history);
  };

  render() {
    // console.log("this.props", this.props);
    console.log("this.state", this.state);

    //If Album has gallery split to col
    if (!this.state.albumHasGallery) {
      if (this.props.album.album) {
        return (
          <div className="card py-2">
            <img
              src={this.props.album.album.image}
              className="card-img-top"
              alt="..."
            />
            <div className="row">
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{this.props.album.album.title}</h5>
                  <p className="card-text">{this.props.album.album.desc}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Created{" "}
                      {Moment(this.props.album.album.date).format("DD/MM/YYYY")}
                    </small>
                  </p>
                </div>
              </div>
              <div className="col-md-6 ">
                {this.state.selectedImage ? (
                  <div className="p-1 ">
                    <img
                      onLoad={this._onLoadImage}
                      src={this.state.selectedImage}
                      className="rounded"
                      style={{
                        width: "100%",
                        transform: `rotate(${this.state.rotation}deg)`
                      }}
                      alt=""
                      onClick={this._rotateImage}
                    />
                    <div className=" m-1 p-2">
                      <TextFormGroup
                        placeholder="Add Title to Picture.."
                        type="text"
                        name="image_gallery_title"
                        value={this.state.image_gallery_title}
                        onChange={this._onChange}
                        style={{ marginTop: "-20px" }}
                      />
                      <TextAreaFormGroup
                        placeholder="Add some comments.."
                        type="text"
                        name="image_gallery_comment"
                        value={this.state.image_gallery_comment}
                        onChange={this._onChange}
                        style={{ marginTop: "-20px" }}
                      />
                    </div>
                  </div>
                ) : null}
                <div className="mx-auto ">
                  <div className="row">
                    <div className="col-md-8">
                      <form onSubmit={this._addImageToGallery}>
                        <div className="custom-file" style={{ width: "60%" }}>
                          <input
                            type="file"
                            name="gallery_img"
                            className="custom-file-input"
                            onChange={this._selectFile}
                          />
                          <label className="custom-file-label bg-success">
                            <p className="text-left text-white"> Pick Image</p>
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
                    <div
                      className="col-md-4 pt-1 pr-5  "
                      onMouseEnter={this._onMouseEnter}
                      onMouseLeave={this._onMouseLeave}
                    >
                      <i
                        className="fas fa-trash-alt  fa-2x"
                        onClick={this._deleteAlbum}
                      ></i>
                      Delete Album
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
      //Gallery []===0
    } else {
      if (this.props.album.album) {
        return (
          <div className="row py-2">
            <div className="col-lg-10">
              <div className="card py-2">
                <img
                  src={this.props.album.album.image}
                  className="card-img-top"
                  alt="..."
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
                      <div className="p-1 ">
                        <img
                          onLoad={this._onLoadImage}
                          src={this.state.selectedImage}
                          className="rounded"
                          style={{
                            width: "100%",
                            transform: `rotate(${this.state.rotation}deg)`
                          }}
                          alt=""
                          onClick={this._rotateImage}
                        />
                        <div className=" m-1 p-2">
                          <TextFormGroup
                            placeholder="Add Title to Picture.."
                            type="text"
                            name="image_gallery_title"
                            value={this.state.image_gallery_title}
                            onChange={this._onChange}
                            style={{ marginTop: "-20px" }}
                          />
                          <TextAreaFormGroup
                            placeholder="Add some comments.."
                            type="text"
                            name="image_gallery_comment"
                            value={this.state.image_gallery_comment}
                            onChange={this._onChange}
                            style={{ marginTop: "-20px" }}
                          />
                        </div>
                      </div>
                    ) : null}
                    <div className="mx-auto ">
                      <div className="row">
                        <div className="col-md-8">
                          <form onSubmit={this._addImageToGallery}>
                            <div
                              className="custom-file"
                              style={{ width: "60%" }}
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
                        <div
                          className="col-md-4 pt-1 pr-5  "
                          onMouseEnter={this._onMouseEnter}
                          onMouseLeave={this._onMouseLeave}
                        >
                          <i
                            className="fas fa-trash-alt  fa-2x"
                            onClick={this._deleteAlbum}
                          ></i>
                          Delete Album
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              {this.props.album.gallery.map(item => (
                <AlbumGallery key={item._id} image={item.img} />
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
  album: state.album
});

export default connect(
  mapStateToProps,
  { selectAlbum, addImageToGallery, deleteAlbum, getGallery }
)(withRouter(AlbumEdit));
