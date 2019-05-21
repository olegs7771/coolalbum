import React, { Component } from "react";
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
  };

  render() {
    const { phone } = this.state;
    return (
      <div className="col-md-12 my-5">
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
export default SmsLogin;
