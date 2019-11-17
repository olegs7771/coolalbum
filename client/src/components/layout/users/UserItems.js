import React, { Component } from "react";
import { connect } from "react-redux";
import "./Users.css";
import moment from "moment";
import Post from "../posts/Post";
import styled from "styled-components";
import { getUserAlbumsById } from "../../../actions/albumAction";
class UserItems extends Component {
  state = {
    showCreds: false,
    showPostForm: false,
    toEmail: "",
    toID: "",
    //add paddingTop if image rotation > 0deg
    isPadding: false,
    privateAlbumCount: 0,
    publicAlbumCount: 0
  };
  componentDidMount() {
    if (this.props.rotation > 0) {
      this.setState({
        isPadding: true
      });
    }
  }

  _showPostForm = () => {
    // here we bind email of each userCard
    this.setState({
      showPostForm: !this.state.showPostForm,
      toEmail: this.props.email,
      toID: this.props.id
    });
  };

  _showCreds = id => {
    this.setState({
      showCreds: !this.state.showCreds
    });
    const data = {
      id
    };
    this.props.getUserAlbumsById(data);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.album !== this.props.album) {
      if (this.props.album.albums) {
        const privateAlbumCount = this.props.album.albums.filter(album => {
          return album.private === "true";
        });
        const publicAlbumCount = this.props.album.albums.filter(album => {
          return album.private === "false";
        });

        this.setState({
          privateAlbumCount: privateAlbumCount.length,
          publicAlbumCount: publicAlbumCount.length
        });
      }
    }
  }

  render() {
    //Styles
    const Card = styled.section`
      background: rgb(179, 215, 255, 0);
    `;

    //resize avatar if it includes gravatar
    let avatarResizes;

    if (this.props.avatar.includes("www.gravatar.com")) {
      avatarResizes = (
        <div>
          <img
            src={this.props.avatar}
            className="card-img-top"
            alt="..."
            style={{
              width: "100%"
            }}
          />
        </div>
      );
    } else {
      avatarResizes = (
        <div style={{ paddingBottom: this.props.rotation > 0 ? "11%" : null }}>
          <img
            src={this.props.avatar}
            className="card-img-top"
            alt="..."
            style={{
              width: "100%",

              transform: `rotate(${this.props.rotation}deg)`
            }}
          />
        </div>
      );
    }

    const { name, email, phone, location, date } = this.props;
    const { showCreds, showPostForm, toEmail, toID } = this.state;
    //button show toggle

    //messageForm toggle
    //if message been sent -->this.state.message===true --->dispaly message
    let postForm;

    if (showPostForm) {
      //binds email of clicked user and going to Post
      postForm = <Post toEmail={toEmail} toID={toID} />;
    } else {
      postForm = null;
    }

    return (
      <div
        className="col-md-4 col-12 my-1 p-2 rounded"
        onMouseLeave={() => {
          this.setState({
            showCreds: false,
            privateAlbumCount: 0,
            publicAlbumCount: 0
          });
        }}
      >
        <Card className="card ">
          <div
            className="py-1 border"
            style={{ backgroundColor: "rgb(60, 72, 77)" }}
          >
            <span className="card-title mt-1 text-white ">{name}</span>
          </div>

          <div
            className="card-img-top"
            style={{ paddingTop: this.state.isPadding ? "12%" : null }}
          >
            {avatarResizes}
          </div>
          {/* {toggle btn} */}
          <span
            onClick={() =>
              this.setState({
                showCreds: !this.state.showCreds
              })
            }
          ></span>

          {showCreds ? (
            <ul className="list-group list-group-flush mt-2">
              <li
                className="list-group-item"
                style={{ backgroundColor: "rgb(60, 72, 77,0.5)" }}
              >
                <span className="text-white"> Email: {email}</span>
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "rgb(60, 72, 77,0.5)" }}
              >
                <span className="text-white">Phone: {phone}</span>
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "rgb(60, 72, 77,0.5)" }}
              >
                <span className="text-white"> Location: {location}</span>
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "rgb(60, 72, 77,0.5)" }}
              >
                {/* {Additional Data on user} */}
                <div className="row">
                  <div className="col-md-4 col-4">
                    <span className="text-white">
                      Since
                      <br />
                      {moment(date).format("DD/MM/YYYY")}
                    </span>
                  </div>
                  <div className="col-md-8 col-8">
                    <span className="text-white h5">
                      Private Albums:{" "}
                      <span className="text-danger h5">
                        {this.state.privateAlbumCount}
                      </span>
                      <br />
                      Public Albums:{" "}
                      <span className="text-success h5">
                        {this.state.publicAlbumCount}
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          ) : null}

          <div
            className="btn-group border "
            style={{
              backgroundColor: "rgb(60, 72, 77)"
            }}
          >
            <div className="btn  btn-sm " onClick={this._showPostForm}>
              <span
                className="p-1 text-white  "
                style={{
                  marginLeft: "-6px"
                }}
              >
                Message
              </span>
            </div>

            <div className="btn   btn-sm">
              <span className="p-1 text-white  ">Like</span>
            </div>
            <div className="btn   btn-sm">
              <span
                className="p-1 text-white  "
                onMouseEnter={this._showCreds.bind(this, this.props.id)}
              >
                {this.state.showCreds ? null : (
                  <i className="fas fa-caret-down fa-2x"></i>
                )}
              </span>
            </div>
          </div>
        </Card>
        {this.state.showPostForm ? (
          <div className="mx-auto  p-2 border mt-2">{postForm}</div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  album: state.album
});

export default connect(mapStateToProps, { getUserAlbumsById })(UserItems);
