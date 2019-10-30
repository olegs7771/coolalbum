import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";

import { selectAlbum } from "../../../actions/albumAction";
class AlbumEdit extends Component {
  componentDidMount() {
    //open album by id

    const data = {
      id: this.props.match.params.id
    };
    this.props.selectAlbum(data);
  }

  render() {
    console.log("this.props", this.props);
    if (this.props.album.album) {
      return (
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
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}
const mapStateToProps = state => ({
  album: state.album
});

export default connect(
  mapStateToProps,
  { selectAlbum }
)(AlbumEdit);
