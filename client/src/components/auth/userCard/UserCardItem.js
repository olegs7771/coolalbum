import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class UserCardItem extends Component {
  componentDidMount() {
    console.log("this.props.avatar", this.props.avatar);
  }
  _onloadImage = ({ target: img }) => {
    console.log("offsetWidth", img.offsetWidth);
    console.log("offsetHeight", img.offsetHeight);
  };

  render() {
    const { name, email, avatar, phone, date, location, rotation } = this.props;
    // console.log("this.props", this.props);

    return (
      <div className="row ">
        <div className="col-md-7  ">
          <div className="pr-5  ">
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
                {""} <span className=" h6 ml-4 ">{location}</span>
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
          <div className="btn-group my-4">
            {/* { Edit userCard} */}
            <Link to="/userCard_edit">
              <div className=" btn btn-info" onClick={this.editHandle}>
                Edit Profile
              </div>
            </Link>
            <div className="a btn btn-danger ml-2">Delete Profile</div>
          </div>
        </div>
        <div className="col-md-5  border-danger">
          <div style={{ paddingTop: "25%", paddingBottom: "25%" }}>
            <img
              src={avatar}
              className="my-3  "
              style={{
                width: "100%",
                transform: ` rotate(${rotation}deg)`
              }}
              alt=""
              onLoad={this._onloadImage}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default UserCardItem;
