import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  sendSmsCode,
  sendCode,
  isEmailvalid,
  isPhonevalid
} from "../../../actions/phoneAction";
//intl_phone_input
import PhoneInput from "react-phone-number-input";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import "react-phone-number-input/style.css";

import Socket_io from "../../../utils/Socket_io";

class SmsLogin extends Component {
  state = {
    phone: "",
    email: "",
    text: "",
    number: null,
    code: "",
    errors: {},
    messages: {}
  };

  //User on submit sends Email and Phone Number.
  // We check if there is Email and Phone number exists in db
  onSubmitCodeRequest = e => {
    e.preventDefault();

    const { phone, email } = this.state;
    const data = {
      phone, //user phone number
      email // user email
    };
    //sending phone number from form to phoneAction
    this.props.sendSmsCode(data, this.props.history);
    Socket_io().on("smsStatus", data => {
      console.log("data from api", data);
      this.setState({
        number: data.number
      });
    });
  };
  //On Submitting Next code beed sent to userAction
  onSubmitCode = e => {
    e.preventDefault();
    const data = {
      authCode: this.state.code
    };
    console.log("data", data);
  };

  //after recieving sms code user inters it in state
  onChangeCode = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  //Intering Email field for sending to fetch code
  onChangeMail = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //obtain errors from props to state
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        errors: this.props.errors,
        messages: this.props.message
      });
      //clear this.state.errors if this.state.messages obj>0
      if (Object.keys(this.state.messages).length > 0) {
        this.setState({
          errors: {}
        });
      }
      if (Object.keys(this.state.errors).length > 0) {
        this.setState({
          messages: {}
        });
      }
    }
    //this.state.email changed , data sends  to api
    if (prevState.email !== this.state.email) {
      const data = {
        email: this.state.email
      };
      this.props.isEmailvalid(data, this.props.history);
    }
    if (prevState.phone !== this.state.phone) {
      const data = {
        phone: this.state.phone
      };
      this.props.isPhonevalid(data, this.props.history);
    }

    // this.state.code changed , data sends to api
    if (prevState.code !== this.state.code) {
      const data = {
        code: this.state.code
      };
      this.props.sendCode(data, this.props.history);
    }
  }

  render() {
    const { phone, number, code, email, errors, messages } = this.state;
    console.log("this.props", this.props);
    console.log("this.state", this.state);

    if (!number) {
      return (
        <div className="col-md-12 my-5 border">
          <div className="h3 text-center text-info">Login with SMS</div>
          <div className="container">
            <form onSubmit={this.onSubmitCodeRequest}>
              <TextFormGroup
                placeholder="Email"
                type="email"
                value={email}
                name="email"
                onChange={this.onChangeMail}
                error={errors.loginSmsEmail}
                message={messages.message}
              />

              <span className="text-left h5">Enter your phone number</span>
              <div className="form-group my-3 ">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phone}
                  name="phone"
                  onChange={phone => this.setState({ phone })}
                  className="form-control form-control-lg "
                />
                <div className="text-danger">{errors.phone}</div>
                <div className="text-success">{messages.phone}</div>
                <button
                  type="submit"
                  className="btn btn-block btn-primary mt-1"
                >
                  Send cofirmation code{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className='"col-md-12 my-5 border'>
          <div className="container">
            <form onSubmit={this.onSubmitCode}>
              <span className="text-left h5">Enter 6 Digits Code</span>

              <div className="form-group my-3 ">
                <TextFormGroup
                  type="number"
                  className="form-control form-control-lg"
                  name="code"
                  value={code}
                  onChange={this.onChangeCode}
                  error={errors.code}
                  message={messages.code}
                />
                <button
                  type="submit"
                  className="btn btn-block btn-primary mt-1"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  errors: state.errors.errors,
  message: state.message.message
});

export default connect(
  mapStateToProps,
  { sendSmsCode, sendCode, isEmailvalid, isPhonevalid }
)(withRouter(SmsLogin));
