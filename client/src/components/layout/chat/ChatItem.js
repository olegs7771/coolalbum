import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { deleteChatMessage } from "../../../actions/chatAction";

class ChatItem extends Component {
  deleteChatMessage = id => {
    const data = {
      id
    };
    this.props.deleteChatMessage(data);
  };

  render() {
    const authName = this.props.auth.user.name;

    const { name, date, text, id } = this.props;

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

    //delete button
    let dltBtnContent;
    dltBtnContent = (
      <i
        className="fas fa-trash-alt mr-auto"
        onClick={this.deleteChatMessage.bind(this, id)}
      />
    );
    return (
      <ul className="list-group ">
        <li
          className="list-group-item mb-1  "
          style={{
            backgroundColor: userColorContent,
            marginLeft: marginContent,
            padding: "5px"
          }}
        >
          <div
            className="border rounded-pill px-5"
            style={{ textAlign: "left", background: "white" }}
          >
            <span className="text-success">{name}</span>{" "}
            <span className="text-danger" style={{ fontSize: "0.7em" }}>
              {moment(date).format("LLL")}
            </span>
          </div>
          <div className="row ">
            <div className="col-md-11  col-10">
              <span style={{ fontSize: "0.9em" }}>{text}</span>
            </div>
            <div className="col-md-1 col-2">{dltBtnContent}</div>
          </div>
        </li>
      </ul>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteChatMessage }
)(ChatItem);
