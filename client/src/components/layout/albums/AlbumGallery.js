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
  _onLoadImage = ({ target: img }) => {
    console.log("img", img);
  };

  render() {
    return (
      <div
        className="card  "
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._selectGalleryImage}
        style={{
          borderColor: this.state.onMouseEnter ? "#34cceb" : null,
          borderWidth: this.state.onMouseEnter ? 3 : null,
          marginBottom: 2,
          width: "100%",

          paddingTop: this.props.rotation > 0 ? "12%" : null,
          paddingBottom: this.props.rotation > 0 ? "12%" : null
        }}
      >
        <div>
          <img
            onLoad={this._onLoadImage}
            src={this.props.image}
            className="card-img-top"
            alt="..."
            style={{
              width: "100%",
              height: 100,
              transform: `rotate(${this.props.rotation}deg)`
            }}
          />
        </div>
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
