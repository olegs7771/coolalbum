import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

class ChatItem extends Component {
  render() {
    const authName = this.props.auth.user.name;
    console.log("authName", authName);

    const { name, date, text } = this.props;

    //backgroundColor for User(auth/rest)
    let userColorContent;
    //margin for User(auth/rest)
    let marginContent;

    if (name === authName) {
      userColorContent = "rgb(197, 247, 190)";
      marginContent = "0px";
    } else {
      userColorContent = "rgb(243, 247, 242)";
      marginContent = "50px";
    }
    return (
      <ul className="list-group ">
        <li
          className="list-group-item mb-1  "
          style={{
            backgroundColor: userColorContent,
            width: "15rem",
            marginLeft: marginContent
          }}
        >
          <div className="row ">
            <div className="col-md-4 " style={{ textAlign: "left" }}>
              <span className="text-success">{name}</span>{" "}
              <span className="text-warning" style={{ fontSize: "0.7em" }}>
                {moment(date).format("LLL")}
              </span>
            </div>
            <div className="col-md-8 ">
              <span style={{ fontSize: "0.9em" }}>{text}</span>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ChatItem);
