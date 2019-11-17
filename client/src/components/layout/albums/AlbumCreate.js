import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { imageOrientation } from "../../../utils/imageOrientation";
import { rotateDeg } from "../../../utils/imageOrientationSwitch";
import Spinner from "../../../utils/Spinner";

import TextFormGroup from "../../textFormGroup/TextFormGroup";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import TextFormCheckbox from "../../textFormGroup/TextFormCheckbox";

import { updateAlbum, clearErrors } from "../../../actions/albumAction";

const getOrientation = imageOrientation();

export class AlbumCreate extends Component {
  state = {
    title: "",
    desc: "",
    theme_selected: null,
    errors: {},
    //ReactJS errors

    message: {},
    rotation: 0,
    albumTypePrivate: false
  };
  componentDidMount() {
    this.setState({
      message: {}
    });
  }

  _onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      submitted: false
    });
  };

  //Select File
  _selectFile = e => {
    console.log("e.target", e.target.files[0]);
    this.setState({
      theme_selected: URL.createObjectURL(e.target.files[0]),
      theme_upload: e.target.files[0],
      errors: {},
      submitted: false
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
  //Define the type of Album
  _changeType = e => {
    console.log("e.type", e.type);
    if (e.type === "change") {
      this.setState({
        albumTypePrivate: !this.state.albumTypePrivate
      });
    }
  };

  //Create Album
  _createAlbum = e => {
    e.preventDefault();
    this.setState({
      submitted: true
    });

    //create FormData
    const FD = new FormData();
    FD.append("album_theme", this.state.theme_upload);
    FD.append("title", this.state.title);
    FD.append("desc", this.state.desc);
    FD.append("rotation", this.state.rotation);
    FD.append("albumType", this.state.albumTypePrivate);

    const history = this.props.history;
    this.props.updateAlbum(FD, history);
  };
  //Get Errors And Messages
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      console.log("this.props.errors", this.props.errors);
      this.setState({
        errors: this.props.errors
      });
    }
    if (prevProps.message !== this.props.message) {
      console.log("this.props.message", this.props.message);
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
                placeholder="Choose Title for Album (max 20 chars)"
                onChange={this._onChange}
                error={this.props.errors.title}
                minLength={3}
                maxLength={20}
              />

              <TextAreaFormGroup
                name="desc"
                placeholder="Some Description of Album (max 20 chars)"
                value={this.state.desc}
                onChange={this._onChange}
                error={this.props.errors.desc}
                minLength={3}
                maxLength={20}
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
              <div className="mx-auto my-1">
                {this.state.errors ? (
                  <span className="text-danger">{this.state.errors.error}</span>
                ) : null}
              </div>
              {this.state.submitted &&
              !this.props.message.album &&
              Object.keys(this.state.errors).length === 0 ? (
                <Spinner />
              ) : null}
              <div className="mx-auto my-2">
                {this.props.message.album ? (
                  <span className="text-success">
                    {this.props.message.album}
                  </span>
                ) : null}
              </div>
              <div className="row my-2">
                <div className="col-md-4 col-4">
                  <TextFormCheckbox
                    text="Private"
                    onChange={this._changeType}
                  />
                </div>

                <div className="col-md-4 col-4">
                  <button type="submit" className="btn btn-success my-3">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
          {this.state.theme_selected ? (
            <div className="col-md-6  pt-2 pb-5  ">
              <img
                // onLoad={this._onLoadImage}
                src={this.state.theme_selected}
                alt=""
                style={{
                  width: "100%",
                  transform: `rotate(${this.state.rotation}deg)`,
                  borderRadius: 5
                }}
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
