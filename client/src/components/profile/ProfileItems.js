import React, { Component } from "react";
import moment from "moment";

class ProfileItems extends Component {
  render() {
    const { name, email, avatar, date } = this.props;
    return (
      <div className="row">
        <div className="col-md-8">
          <ul className="list-group-flush my-4 text-left">
            <li className="list-group-item ">
              <span className="text-info">Name </span> {name}
            </li>
            <li className="list-group-item ">
              <span className="text-info">Email</span> {email}
            </li>
            <li className="list-group-item ">
              <span className="text-info">Registered at </span>
              {moment(date).format("DD/MM/YYYY")}
              {date}
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <img src={avatar} className="my-3 rounded-circle border" />
        </div>
      </div>
    );
  }
}
export default ProfileItems;
