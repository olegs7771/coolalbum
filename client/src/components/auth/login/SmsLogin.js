import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { sendSmsCode } from "../../../actions/phoneAction";
//intl_phone_input
import PhoneInput from "react-phone-number-input";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import "react-phone-number-input/style.css";

//Socket.io client
import io from "socket.io-client";

const socket = io("http://localhost:5000");

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

    const text = "Your code will be  valid for 5 min";

    const { phone, email } = this.state;
    const data = {
      phone,
      email,
      text
    };
    //sending phone number from form to phoneAction
    this.props.sendSmsCode(data, this.props.history);
    socket.on("smsStatus", data => {
      console.log("data from api", data);
      this.setState({
        number: data.number
      });
    });
  };
  //On Submitting Next code beed sent to userAction
  onSubmitCode = e => {
    e.preventDefault();
    console.log("code", this.state.code);
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
    console.log("prevState", prevState);
    console.log("this.state", this.state);

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
    }
    if (prevState.email !== this.state.email) {
      const data = {
        email: this.state.email
      };
      this.props.sendSmsCode(data, this.props.history);
    }
  }

  render() {
    const { phone, number, code, email, errors, messages } = this.state;

    console.log("this.state errors", this.state.errors);
    console.log("this.state phone", this.state.phone);

    if (!number) {
      //SMS form after sended by user

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
                error={errors.error}
                message={messages.message}
              />
              {errors.email ? <div>{errors.email}</div> : null}
              <span className="text-left h5">Enter your phone number</span>
              <div className="form-group my-3 ">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={phone => this.setState({ phone })}
                  className="form-control form-control-lg "
                />
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
      // SMS form before Send by user
      return (
        <div className='"col-md-12 my-5 border'>
          <div className="container">
            <form onSubmit={this.onSubmitCode}>
              <span className="text-left h5">Enter 6 Digits Code</span>

              <div className="form-group my-3 ">
                <input
                  type="number"
                  max="6"
                  min="6"
                  className="form-control form-control-lg"
                  name="code"
                  value={code}
                  onChange={this.onChangeCode}
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
  { sendSmsCode }
)(withRouter(SmsLogin));
