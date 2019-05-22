import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { sendSmsCode } from "../../../actions/phoneAction";
//intl_phone_input
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

class SmsLogin extends Component {
  state = {
    phone: ""
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("phone", this.state.phone);
    const text = "some text for message";
    const phoneNumber = this.state.phone;
    const data = {
      text,
      phoneNumber
    };
    this.props.sendSmsCode(data, this.props.history);
  };

  render() {
    const { phone } = this.state;
    return (
      <div className="col-md-12 my-5 border">
        <div className="h3 text-center text-info">Login with SMS</div>
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <span className="text-left h5">Enter your phone number</span>

            <div className="form-group my-3 ">
              <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                onChange={phone => this.setState({ phone })}
                className="form-control form-control-lg "
              />
              <button type="submit" className="btn btn-block btn-primary mt-1">
                Send cofirmation code{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { sendSmsCode }
)(withRouter(SmsLogin));
