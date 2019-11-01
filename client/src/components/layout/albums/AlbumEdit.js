import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import Spinner from "../../../utils/Spinner";

import { selectAlbum, addImageToGallery } from "../../../actions/albumAction";
class AlbumEdit extends Component {
  state = {
    albumHasGallery: false
  };

  componentDidMount() {
    const data = {
      id: this.props.match.params.id
    };
    this.props.selectAlbum(data);
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
  _selectImageToGallery = e => {
    this.setState({
      selected
    });
  };

  //Add Image To the Gallery
  _addImageToGallery = e => {
    console.log("add");
    const data = {
      obj: 1
    };
    this.props.addImageToGallery(data);
  };

  render() {
    // console.log("this.props", this.props);
    // console.log("this.state", this.state);

    //If Album has gallery split to col
    if (!this.state.albumHasGallery) {
      if (this.props.album.album) {
        return (
          <div className="card">
            <img
              src={this.props.album.album.image}
              className="card-img-top"
              alt="..."
            />
            <div className="row">
              <div className="col-md-8">
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
              <div className="col-md-4 ">
                <div className="mx-auto mt-4">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      onChange={this._selectFile}
                      onClick={this._selectImageToGallery}
                    />
                    <label className="custom-file-label bg-success">
                      <p className="text-left text-white">
                        {" "}
                        Add Image To Gallery
                      </p>
                    </label>
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
    } else {
      if (this.props.album.album) {
        return (
          <div className="row">
            <div className="col-lg-10">
              <div className="card">
                <img
                  src={this.props.album.album.image}
                  className="card-img-top"
                  alt="..."
                />
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
            </div>
            <div className="col-lg-2">Gallery</div>
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
  { selectAlbum, addImageToGallery }
)(AlbumEdit);
