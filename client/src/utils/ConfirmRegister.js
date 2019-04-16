import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmRegister } from "../actions/userActions";

class ConfirmRegister extends Component {
  componentDidMount() {
    this.props.confirmRegister(this.props.match.params.token);
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
)(ConfirmRegister);
