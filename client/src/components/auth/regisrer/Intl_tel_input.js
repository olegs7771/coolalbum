import React, { Component } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

class Intl_tel_input extends Component {
  onChange = () => {
    console.log("phone change");
  };

  onBlur = () => {
    console.log("blured");
  };

  render() {
    return (
      <IntlTelInput
        preferredCountries={["tw"]}
        onPhoneNumberChange={this.onChange}
        onPhoneNumberBlur={this.onBlur}
      />
    );
  }
}
export default Intl_tel_input;
