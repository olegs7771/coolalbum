import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../../actions/userActions";
import Spinner from "../../../utils/Spinner";
import UserItems from "./UserItems";

class Users extends Component {
  state = {
    users: [],
    loading: false
  };

  componentDidMount() {
    //load all users
    this.props.getAllUsers();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        users: this.props.users.users
      });
    }
  }

  render() {
    console.log("this.props", this.props);
    console.log("this.state", this.state);
    let userContent;
    const { users, loading } = this.state;
    if (users === null || loading) {
      userContent = <Spinner />;
    } else {
      userContent = (
        <div className="row">
          {users.map((item, index) => (
            <UserItems
              key={index}
              name={item.name}
              phone={item.phone}
              email={item.email}
              location={item.location}
              avatar={item.avatar}
              date={item.date}
            />
          ))}
        </div>
      );
    }

    return <div className=" row my-4">{userContent}</div>;
  }
}

const mapStateToProps = state => ({
  users: state.users
});
export default connect(
  mapStateToProps,
  { getAllUsers }
)(Users);
