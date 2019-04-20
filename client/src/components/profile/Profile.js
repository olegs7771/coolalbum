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

    // if (user) {
    //   return user.map(items => (
    //     <ProfileItems
    //       key={items.id}
    //       avatar={items.avatar}
    //       email={items.email}
    //       name={items.name}
    //     />
    //   ));
    // }
    return <div />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Profile);
