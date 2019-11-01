import React, { Component } from "react";
import Moment from "moment";
import { connect } from "react-redux";
import { selectAlbum } from "../../../actions/albumAction";
import { withRouter } from "react-router-dom";

class AlbumItems extends Component {
  state = {
    isonMouseEnter: false
  };

  _onMouseEnter = e => {
    if (e.type === "mouseenter") {
      return this.setState({
        isonMouseEnter: true
      });
    }
  };
  _onMouseLeave = e => {
    if (e.type === "mouseleave") {
      return this.setState({
        isonMouseEnter: false
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
          backgroundColor: this.state.isonMouseEnter ? "#e9f0eb" : null
        }}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
      >
        <img
          src={this.props.image}
          style={{ width: "100%" }}
          className="card-img-top"
          alt=""
        />
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
