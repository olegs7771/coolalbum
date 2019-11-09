import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TextFormGroup from "../../textFormGroup/TextFormGroup";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import { updateAlbum, clearErrors } from "../../../actions/albumAction";

export class AlbumCreate extends Component {
  state = {
    title: "",
    desc: "",
    theme_selected: null,
    errors: {},
    message: {},
    rotation: 0
  };

  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.clearErrors();
  };

  //Select File
  _selectFile = e => {
    console.log("e.target", e.target.files[0]);
    this.setState({
      theme_selected: URL.createObjectURL(e.target.files[0]),
      theme_upload: e.target.files[0]
    });
  };
  //Loaded Image
  _onLoadImage = ({ target: img }) => {
    console.log("img.naturalWidth", img.naturalWidth);
    console.log("img.naturalHeight", img.naturalHeight);
    console.log("img.offsetWidth", img.offsetWidth);
    console.log("img.offsetHeight", img.offsetHeight);
  };
  //Rotate Image
  _rotateImage = () => {
    this.setState({
      rotation: this.state.rotation + 90
    });
  };

  //Create Album
  _createAlbum = e => {
    e.preventDefault();

    //create FormData
    const FD = new FormData();
    FD.append("album_theme", this.state.theme_upload);
    FD.append("title", this.state.title);
    FD.append("desc", this.state.desc);
    FD.append("rotation", this.state.rotation);
    const history = this.props.history;
    this.props.updateAlbum(FD, history);
  };
  //Get Errors And Messages
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      return console.log("this.props.errors", this.props.errors);
    }
    if (prevProps.message !== this.props.message) {
      return console.log("this.props.message", this.props.message);
    }
  }

  render() {
    const { name } = this.props.auth.user;
    return (
      <div className="" style={{ paddingTop: 30, paddingBottom: 60 }}>
        <p className="text-left">
          Wellcome <span className="text-success">{name}</span> to the Album
          creation page.<br></br> Choose The Name and Content for your album
          <br></br>
          Later you can edit the description and and content
        </p>
        <div className="row my-4">
          <div className="col-md-6 ">
            <form onSubmit={this._createAlbum}>
              <TextFormGroup
                name="title"
                value={this.state.title}
                placeholder="Choose Title for Album"
                onChange={this._onChange}
                error={this.props.errors.title}
              />
              <TextAreaFormGroup
                name="desc"
                placeholder="Some Description of Album"
                value={this.state.desc}
                onChange={this._onChange}
                error={this.props.errors.desc}
              />
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  onChange={this._selectFile}
                />
                <label className="custom-file-label">
                  <p className="text-left"> Pick Image for Main Theme</p>
                </label>
              </div>
              <button type="submit" className="btn btn-success my-3">
                Create
              </button>
            </form>
            {this.props.message.album ? (
              <span className="text-success">{this.props.message.album}</span>
            ) : null}
          </div>
          {this.state.theme_selected ? (
            <div className="col-md-6  pt-2 pb-5  ">
              <img
                onLoad={this._onLoadImage}
                src={this.state.theme_selected}
                alt=""
                style={{
                  width: "100%",
                  transform: `rotate(${this.state.rotation}deg)`,
                  borderRadius: 5
                }}
                onClick={this._rotateImage}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors.errors,
  message: state.message.message
});

const mapDispatchToProps = { updateAlbum, clearErrors };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AlbumCreate));
