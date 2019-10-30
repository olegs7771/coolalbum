import React, { Component } from "react";
import Moment from "moment";
import { connect } from "react-redux";
import { selectAlbum } from "../../../actions/albumAction";
import { Link } from "react-router-dom";

class AlbumItems extends Component {
  render() {
    return (
      <div className="card col-md-6 mb-2" style={{ width: "23rem" }}>
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

        <Link to={`/album_edit/${this.props.id}`}>Open</Link>
      </div>
    );
  }
}

export default connect(
  null,
  { selectAlbum }
)(AlbumItems);
