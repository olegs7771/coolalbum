import React, { Component } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

class Intl_tel_input extends Component {
  state = {
    phone: ""
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <PhoneInput
        placeholder="Enter phone number"
        value={this.state.phone}
        onChange={phone => this.setState({ phone })}
      />
    );
  }
}
export default Intl_tel_input;
