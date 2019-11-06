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
  constructor(props) {
    super();
    this.state = {
      albumHasGallery: false,
      showDeleteWorning: false,
      selectedImage: null,
      image_gallery_comment: "",
      image_gallery_title: "",
      message: {},
      id: ""
    };
    const data = {
      id: !this.state.selectedImage ? props.match.params.id : this.state.id
    };
    props.selectAlbum(data);
  }
  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    //If Gallery in Album [].length>0 split screen
    if (prevProps.album !== this.props.album) {
      if (this.props.album.gallery.length > 0) {
        this.setState({
          albumHasGallery: true
        });
      }
    }
    //Display Selected Image from Gallery As Theme Image
    if (prevProps.album.selectedImage !== this.props.album.selectedImage) {
      console.log("selected image :", this.props.album.selectedImage.title);
      this.setState({
        selectedImage: this.props.album.selectedImage,
        id: this.props.match.params.id
      });
    }

    if (prevProps.message !== this.props.message) {
      this.setState({
        message: this.props.message
      });
    }
  }
  componentDidMount() {
    if (this.state.selectedImage) {
      console.log("selected no need in params");
    }

    const data = {
      id: !this.state.selectedImage ? this.props.match.params.id : this.state.id
    };

    this.props.getGallery(data);
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

  //Delete Album by id
  _deleteAlbum = e => {
    console.log("delete ", this.props.album.album._id);
    const data = {
      id: this.props.album.album._id
    };
    this.props.deleteAlbum(data, this.props.history);
  };
  //Delete Album Image from Gallery
  _deleteImageGallery = e => {
    console.log("delete ", this.state.selectedImage.id);
    // const data = {
    //   id: this.props.album.album._id
    // };
    // this.props.deleteAlbum(data, this.props.history);
  };

  render() {
    console.log("this.state.id", this.state.id);

    let ThemeImageContent;
    if (this.props.album.album) {
      if (this.state.selectedImage) {
        ThemeImageContent = (
          <div className="card mb-3">
            <img
              src={this.state.selectedImage.image}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{this.state.selectedImage.title}</h5>
              <p className="card-text">{this.state.selectedImage.comments}</p>
              <div className="row">
                <div className="col-lg-8">
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated{" "}
                      {Moment(this.state.selectedImage.date).format(
                        "DD/MM/YYYY"
                      )}
                    </small>
                  </p>
                </div>
                <div className="col-lg-4">
                  {/* {Delete Image from Gallery} */}

                  <i
                    className="fas fa-trash-alt  fa-2x"
                    onClick={this._deleteImageGallery}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        );
      } else
        ThemeImageContent = (
          <div className="card mb-3">
            <img
              src={this.props.album.album.image}
              className="card-img-top"
              alt="..."
            />
          </div>
        );
    }

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
                    <div className="col-md-4 pt-1 pr-5  ">
                      <i
                        className="fas fa-trash-alt  fa-2x"
                        onClick={this._deleteAlbum}
                      ></i>
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
            <div className="col-lg-10">
              <div className=" py-2">
                {/* { Show Selected Image From Gallery if selectedImage:true } */}
                {ThemeImageContent}
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
                        {this.state.message ? (
                          <span>{this.state.message.gallery}</span>
                        ) : null}
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
                        <div className="col-md-4 pt-1 pr-5  ">
                          <i
                            className="fas fa-trash-alt  fa-2x"
                            onClick={this._deleteAlbum}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              {this.props.album.gallery.map(item => (
                <AlbumGallery
                  key={item._id}
                  image={item.img}
                  title={item.img_title}
                  comments={item.comments}
                  date={item.date}
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

export default connect(
  mapStateToProps,
  { selectAlbum, addImageToGallery, deleteAlbum, getGallery }
)(withRouter(AlbumEdit));
