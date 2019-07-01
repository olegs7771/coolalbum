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
              id={item._id}
            />
          ))}
        </div>
      );
    }

    return <div className="  my-4 mx-auto">{userContent}</div>;
  }
}

const mapStateToProps = state => ({
  users: state.users
});
export default connect(
  mapStateToProps,
  { getAllUsers }
)(Users);
