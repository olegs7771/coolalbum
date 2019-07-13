import React, { Component } from "react";
import moment from "moment";
import Post from "../posts/Post";
import styled from "styled-components";
import { connect } from "react-redux";

class UserItems extends Component {
  state = {
    showCreds: false,
    showPostForm: false,
    toEmail: "",
    toID: ""
  };

  showPostForm = (email, id) => {
    // here we bind email of each userCard
    this.setState({
      showPostForm: !this.state.showPostForm,
      toEmail: email,
      toID: id
    });
  };

  render() {
    //resize avatar if it includes gravatar
    let avatarResizes;

    if (this.props.avatar.includes("www.gravatar.com")) {
      avatarResizes = (
        <div>
          <img
            src={this.props.avatar}
            className="card-img-top"
            alt="..."
            style={{ width: "75%" }}
          />
        </div>
      );
    } else {
      avatarResizes = (
        <img
          src={this.props.avatar}
          className="card-img-top"
          alt="..."
          style={{ width: "200px", height: "150px" }}
        />
      );
    }

    const { id, name, email, phone, location, date } = this.props;
    const { showCreds, showPostForm, toEmail, toID } = this.state;
    //button show toggle
    let button;
    if (showCreds) {
      button = "Show less..";
    } else {
      button = "Show more..";
    }
    //messageForm toggle
    let postForm;
    if (showPostForm) {
      //binds email of clicked user and going to Post
      postForm = <Post toEmail={toEmail} toID={toID} />;
    } else {
      postForm = null;
    }
    //Styles
    const Card = styled.section`
      background: rgb(179, 215, 255, 0.11);
    `;
    const Avatar = styled.section``;
    return (
      <div className="col-md-4 my-2">
        <Card className="card myImage-1563033419704">
          <h5 className="card-title my-3">{name}</h5>
          <Avatar className="card-img-top">{avatarResizes}</Avatar>
          <div className="card-body">
            {/* {toggle btn} */}
            <span
              className="btn btn-light btn-sm ml-1"
              onClick={() =>
                this.setState({
                  showCreds: !this.state.showCreds
                })
              }
            >
              {button}
            </span>
          </div>
          {showCreds ? (
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Email:{email}</li>
              <li className="list-group-item">Phone:{phone}</li>
              <li className="list-group-item">Location:{location}</li>
              <li className="list-group-item">
                Registered at: {moment(date).format("DD/MM/YYYY")}
              </li>
            </ul>
          ) : null}

          <div className="card-body">
            <div className="btn-group my-3">
              <div
                className="btn btn-light btn-link"
                onClick={this.showPostForm.bind(this, email, id)}
              >
                Message
              </div>
              <div className="btn btn-light btn-link ml-4">like</div>
            </div>
          </div>
        </Card>
        <div className="mx-auto">{postForm}</div>
      </div>
    );
  }
}
export default connect()(UserItems);
