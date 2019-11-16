import React, { Component } from "react";
import { connect } from "react-redux";
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
    albums: []
  };
  componentDidMount() {
    console.log("mounted");
    console.log("ids ", this.props.id);

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

  render() {
    let albumsCount;
    if (this.props.album.albums) {
      albumsCount = this.props.album.albums.length;
    } else {
      albumsCount = 0;
    }
    //Styles
    const Card = styled.section`
      background: rgb(179, 215, 255, 0);
    `;
    const FontSize = styled.span`
      font-size: 12px;
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
      <div className="col-md-4 col-12 my-1 p-2 rounded">
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
                <div className="row">
                  <div className="col-md-10 col-10">
                    <FontSize>
                      <span className="text-white">{email}</span>
                    </FontSize>
                  </div>
                  <div className="col-md-2 col-2">
                    <i
                      className="fas fa-times text-white"
                      onClick={() =>
                        this.setState({
                          showCreds: false
                        })
                      }
                    ></i>
                  </div>
                </div>
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "rgb(60, 72, 77,0.5)" }}
              >
                <FontSize>
                  <span className="text-white">{phone}</span>
                </FontSize>
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "rgb(60, 72, 77,0.5)" }}
              >
                <FontSize>
                  <span className="text-white">{location}</span>
                </FontSize>
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "rgb(60, 72, 77,0.5)" }}
              >
                {/* {Additional Data on user} */}
                <div className="row">
                  <div className="col-md-6 col-6">
                    <FontSize>
                      <span className="text-white">
                        Registered on
                        <br />
                        {moment(date).format("DD/MM/YYYY")}
                      </span>
                    </FontSize>
                  </div>
                  <div className="col-md-6 col-6">
                    <FontSize>
                      <span className="text-white">
                        Private Albums:{albumsCount}
                        <br />
                        Public Albums:
                      </span>
                    </FontSize>
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
              <FontSize>
                <span
                  className="p-1 text-white  "
                  style={{
                    marginLeft: "-6px"
                  }}
                >
                  Message
                </span>
              </FontSize>
            </div>

            <div className="btn   btn-sm">
              <FontSize>
                <span className="p-1 text-white  ">Like</span>
              </FontSize>
            </div>
            <div className="btn   btn-sm">
              <FontSize>
                <span
                  className="p-1 text-white  "
                  onClick={this._showCreds.bind(this, this.props.id)}
                >
                  Show More
                </span>
              </FontSize>
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
