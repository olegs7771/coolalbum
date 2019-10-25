import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class UserCardItem extends Component {
  state = {
    rotateAvatar: false
  };
  componentDidMount() {
    console.log("this.props.avatar", this.props.avatar);
    const reg = new RegExp("^(http|https|//www)://", "i");
    if (!reg.test(this.props.avatar)) {
      console.log("true");
      this.setState({
        rotateAvatar: true
      });
    } else {
      console.log(false);
      this.setState({
        rotateAvatar: false
      });
    }
  }

  render() {
    const { name, email, avatar, phone, date, location } = this.props;
    // console.log("this.props", this.props);

    return (
      <div className="row ">
        <div className="col-md-8  ">
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
        <div className="col-md-4 border ">
          <div className="border" style={{ paddingTop: 60, paddingBottom: 60 }}>
            <img
              src={avatar}
              className="my-3  "
              style={{
                width: "100%",
                transform: this.state.rotateAvatar ? "rotate(90deg)" : null
              }}
              alt=""
              onLoad={({ target: img }) => console.log("img", img)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default UserCardItem;
