import React, { Component } from "react";

class ProfileItems extends Component {
  render() {
    const { name, email } = this.props;
    return (
      <ul className="list-group-flush my-4 text-left">
        <li className="list-group-item ">
          <span className="text-info">Name</span> {name}
        </li>
        <li className="list-group-item ">
          <span className="text-info">Email</span> {email}
        </li>
      </ul>
    );
  }
}
export default ProfileItems;
