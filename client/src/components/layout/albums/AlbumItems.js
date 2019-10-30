import React, { Component } from "react";
import Moment from "moment";
import { connect } from "react-redux";
import { selectAlbum } from "../../../actions/albumAction";

class AlbumItems extends Component {
  _openAlbum = () => {
    //open album by id
    console.log("open id :", this.props.id);
    const data = {
      id: this.props.id,
      title: this.props.title,
      desc: this.props.desc,
      date: this.props.date
    };
    this.props.selectAlbum(data);
  };
  render() {
    return (
      <div className="card" style={{ width: "18rem" }}>
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
        <button className="btn btn-success" onClick={this._openAlbum}>
          Open
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { selectAlbum }
)(AlbumItems);
