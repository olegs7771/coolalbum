import React, { Component } from "react";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProfile } from "../../../actions/userActions";
import Spinner from "../../../utils/Spinner";

class UserCardItem extends Component {
  state = {
    message: {}
  };
  _deleteProfile = () => {
    this.props.deleteProfile(this.props.history);
    this.setState({
      isSubmitted: true
    });
  };
  render() {
    const {
      name,
      email,
      avatar,
      phone,
      date,
      location1,
      rotation
    } = this.props;

    return (
      <div className="row ">
        <div className="col-md-7 border ">
          <div className="pr-5 pt-5 ">
            <ul className="list-group-flush my-4 text-left  ">
              <li className="list-group-item  ">
                <span className="text-info">Name </span>
                {""} <span className=" h6 ml-4">{name}</span>
              </li>
              <li className="list-group-item  ">
                <span className="text-info">Email </span>
                {""} <span className=" h6 ml-4 ">{email}</span>
              </li>
              <li className="list-group-item  ">
                <span className="text-info">Phone</span>
                {""} <span className=" h6 ml-4 ">{phone}</span>
              </li>
              <li className="list-group-item  ">
                <span className="text-info">Location</span>
                {""} <span className=" h6 ml-4 ">{location1}</span>
              </li>
              <li className="list-group-item  ">
                <span className="text-info">Registered at </span>
                {""}{" "}
                <span className=" h6 ml-4">
                  {moment(date).format("DD/MM/YYYY")}
                </span>
              </li>
            </ul>
          </div>
          {!this.state.message.message && this.state.isSubmitted ? (
            <Spinner />
          ) : null}
          {this.state.message.message ? (
            <span className="text-success h6">
              {this.state.message.message}
            </span>
          ) : null}
          <div className="btn-group my-4">
            {/* { Edit userCard} */}
            <Link to="/userCard_edit">
              <div className=" btn btn-info" onClick={this.editHandle}>
                Edit Profile
              </div>
            </Link>
            <div
              className="a btn btn-danger ml-2"
              onClick={this._deleteProfile}
            >
              Delete Profile
            </div>
          </div>
        </div>
        <div className="col-md-5  border">
          <div>
            <div style={{ padding: "10%" }}>
              <img
                src={avatar}
                className="my-3  "
                style={{
                  width: "100%",
                  transform: ` rotate(${rotation}deg)`
                }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message.message
});
export default connect(
  mapStateToProps,
  { deleteProfile }
)(withRouter(UserCardItem));
