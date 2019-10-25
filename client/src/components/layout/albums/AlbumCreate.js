import React, { Component } from "react";
import { connect } from "react-redux";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";

export class AlbumCreate extends Component {
  state = {
    album_title: "",
    album_desc: "",
    theme_image_selected: null,
    rotation: 0
  };
  //Select File
  _selectFile = e => {
    console.log("e.target", e.target.files[0]);
    this.setState({
      theme_image_selected: URL.createObjectURL(e.target.files[0])
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
    console.log("submitted");
  };
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
                value={this.state.album_title}
                placeholder="Choose Title for Album"
                onChange={e =>
                  this.setState({
                    album_title: e.target.value
                  })
                }
              />
              <TextAreaFormGroup
                placeholder="Some Description of Album"
                value={this.state.album_desc}
                onChange={e =>
                  this.setState({
                    album_desc: e.target.value
                  })
                }
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
          </div>
          {this.state.theme_image_selected ? (
            <div className="col-md-6  pt-2 pb-5  ">
              <img
                onLoad={this._onLoadImage}
                src={this.state.theme_image_selected}
                alt=""
                style={{
                  width: "100%",
                  transform: `rotate(${this.state.rotation}deg)`
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
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumCreate);
