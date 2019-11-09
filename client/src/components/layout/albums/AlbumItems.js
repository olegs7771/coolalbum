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
        className="card col-lg-4  "
        style={{
          width: "100%",
          backgroundColor: this.state.onMouseEnter ? "#e9f0eb" : null
        }}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
      >
        <div className="p-1" style={{ height: 200, paddingBottom: "20%" }}>
          <img
            src={this.props.image}
            style={{ width: "100%", height: "100%" }}
            className="card-img-top"
            alt=""
            style={{
              width: "100%",
              transform: `rotate(${this.props.rotation}deg)`
            }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>

          <p className="card-text">{this.props.desc}</p>
        </div>
        <span>Created {Moment(this.props.date).format("DD/MM/YYYY")}</span>
      </div>
    );
  }
}

export default connect(
  null,
  { selectAlbum }
)(withRouter(AlbumItems));
