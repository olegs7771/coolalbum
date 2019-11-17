import React, { Component } from "react";
import Moment from "moment";
import { connect } from "react-redux";
import { selectAlbum } from "../../../actions/albumAction";
import { withRouter } from "react-router-dom";

class AlbumItems extends Component {
  state = {
    onMouseEnter: false
  };

  _onMouseEnter = e => {
    if (e.type === "mouseenter") {
      return this.setState({
        onMouseEnter: true
      });
    }
  };
  _onMouseLeave = e => {
    if (e.type === "mouseleave") {
      return this.setState({
        onMouseEnter: false
      });
    }
  };
  _onClick = e => {
    this.props.history.push(`/album_edit/${this.props.id}`);
  };

  render() {
    return (
      <div
        className="card col-lg-3 ml-1  p-2 mb-1"
        style={{
          width: "100%",
          backgroundColor: this.state.onMouseEnter ? "#e9f0eb" : null
        }}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
      >
        <div style={{ paddingBottom: "15%", paddingTop: "25%" }}>
          <img
            src={this.props.image}
            className="card-img-top"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              transform: `rotate(${this.props.rotation}deg)`
            }}
          />
        </div>
        <div className="card-body border " style={{ height: "100%" }}>
          <h5 className="card-title">{this.props.title}</h5>

          <p className="card-text">{this.props.desc}</p>
        </div>
        <span>Created {Moment(this.props.date).format("DD/MM/YYYY")}</span>

        <div className="py-2 border bg-dark">
          <div className="row">
            <div className="col-md-6 col-6">
              {this.props.private === "true" ? (
                <span className="text-danger">Private</span>
              ) : (
                <span className="text-success">Public</span>
              )}
            </div>
            <div className="col-md-6 col-6">
              <span className="text-white">
                {this.props.imagesQuant} Images
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { selectAlbum })(withRouter(AlbumItems));
