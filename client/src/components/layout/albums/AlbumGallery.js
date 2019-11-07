import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectImage } from "../../../actions/albumAction";

class AlbumGallery extends Component {
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

  _selectGalleryImage = () => {
    const data = {
      id: this.props.id,
      image: this.props.image,
      title: this.props.title,
      comments: this.props.comments,
      date: this.props.date
    };
    this.props.selectImage(data);
    this.props.history.push(`/gallery_image/${this.props.id}`);
  };

  render() {
    return (
      <div
        className="card"
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._selectGalleryImage}
        style={{
          borderColor: this.state.onMouseEnter ? "#34cceb" : null,
          borderWidth: this.state.onMouseEnter ? 3 : null,
          marginBottom: 2,
          width: "100%"
        }}
      >
        <img src={this.props.image} className="card-img-top" alt="..." />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { selectImage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AlbumGallery));
