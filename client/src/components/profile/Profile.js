import React, { Component } from "react";
import ProfileItems from "./ProfileItems";

import { connect } from "react-redux";

class Profile extends Component {
  componentDidMount() {
    console.log("this.props", this.props);
  }

  render() {
    const { user } = this.props;
    console.log("user", user);

    if (user) {
      return (
        <div className="row">
          <div className="col-md-6">
            <ProfileItems
              name={user.name}
              email={user.email}
              avatar={user.avatar}
              date={user.date}
            />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Profile);
