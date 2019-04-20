import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { confirmRegister } from "../actions/userActions";

class ConfirmRegister extends Component {
  componentDidMount() {
    console.log("this.props.match.params", this.props.match.params);

    console.log("confirmRegister shooted to userAction");
    const { history } = this.props;

    const data = {
      token: this.props.match.params.token,
      id: this.props.match.params._id
    };

    this.props.confirmRegister(data, history);
    history.push("/success_msg");
  }

  render() {
    return (
      <div>
        <div className="mx-auto">Thank you for Registration</div>
      </div>
    );
  }
}
export default connect(
  null,
  { confirmRegister }
)(withRouter(ConfirmRegister));
