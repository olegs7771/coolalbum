import React, { Component } from "react";
import moment from "moment";
import Post from "../posts/Post";
import styled from "styled-components";

class UserItems extends Component {
  state = {
    showCreds: false,
    showPostForm: false,
    toEmail: "",
    toID: "",
    //add paddingTop if image rotation > 0deg
    isPadding: false
  };
  componentDidMount() {
    console.log("this.props.rotation", this.props.rotation);

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

  render() {
    console.log("this.props", this.props);

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
              width: "100%",
              height: "100%"
            }}
          />
        </div>
      );
    } else {
      avatarResizes = (
        <img
          src={this.props.avatar}
          className="card-img-top"
          alt="..."
          style={{
            width: "100%",
            height: "100%",
            transform: `rotate(${this.props.rotation}deg)`
          }}
        />
      );
    }

    const { name, email, phone, location, date } = this.props;
    const { showCreds, showPostForm, toEmail, toID } = this.state;
    //button show toggle
    let button;
    if (showCreds) {
      button = (
        <FontSize>
          <span
            className="p-1 text-white "
            style={{ backgroundColor: "rgb(126, 140, 145)" }}
          >
            Show less..
          </span>
        </FontSize>
      );
    } else {
      button = (
        <FontSize>
          <span
            className="p-1 text-white "
            style={{ backgroundColor: "rgb(126, 140, 145)" }}
          >
            Show more..
          </span>
        </FontSize>
      );
    }
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
      <div className="col-md-4 col-12 my-1 p-2 ">
        <Card className="card ">
          <div
            className="py-1 border"
            style={{ backgroundColor: "rgb(60, 72, 77)" }}
          >
            <span className="card-title mt-1 text-white ">{name}</span>
          </div>

          <div
            className="card-img-top"
            style={{ paddingTop: this.state.isPadding ? "13%" : null }}
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
          >
            <div className="div my-2">{button}</div>
          </span>

          {showCreds ? (
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item"
                style={{ backgroundColor: "rgb(60, 72, 77,0.5)" }}
              >
                <FontSize>
                  <span className="text-white">{email}</span>
                </FontSize>
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
                <FontSize>
                  <span className="text-white">
                    Registered on
                    <br />
                    {moment(date).format("DD/MM/YYYY")}
                  </span>
                </FontSize>
              </li>
            </ul>
          ) : null}

          <div
            className="btn-group border "
            style={{
              backgroundColor: "rgb(60, 72, 77)"
            }}
          >
            <div className="btn btn-sm " onClick={this._showPostForm}>
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
          </div>
        </Card>
        {this.state.showPostForm ? (
          <div className="mx-auto  p-2 border mt-2">{postForm}</div>
        ) : null}
      </div>
    );
  }
}

export default UserItems;
