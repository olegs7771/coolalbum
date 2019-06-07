import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import { connect } from "react-redux";
import { isEmailExists, recoverPass } from "../../../actions/userActions";
import { withRouter } from "react-router-dom";

class RecoverPassword extends Component {
  state = {
    email: "",
    errors: {},
    messages: {}
  };

  onChangeMail = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
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
    }
    if (prevState.email !== this.state.email) {
      const data = {
        email: this.state.email
      };

      this.props.isEmailExists(data, this.props.history);
    }
  }
  //send email for sending user instructions on recreate password

  onSubmitMail = e => {
    e.preventDefault();

    const data = {
      email: this.state.email
    };

    if (this.state.messages.loginEmail) {
      this.props.recoverPass(data, this.props.history);
    } else {
      this.setState({
        errors: {
          loginEmail: "fix email"
        }
      });
    }
  };

  render() {
    const { email, errors, messages } = this.state;
    console.log("this.state", this.state);

    return (
      <div>
        <div className="card card-body my-4 bg-light">
          <div className="card-header h5 bg-warning">Forgot your password?</div>

          <p className="card-text mt-3">
            Please provide your e-mail address on which we will send you further
            instructions.
          </p>
          <form onSubmit={this.onSubmitMail}>
            <TextFormGroup
              placeholder="Email..."
              type="email"
              value={email}
              name="email"
              onChange={this.onChangeMail}
              error={errors.loginEmail}
              message={messages.loginEmail}
            />
            <button type="submit" className="btn btn-block btn-dark">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors.errors,
  message: state.message.message
});
export default connect(
  mapStateToProps,
  { isEmailExists, recoverPass }
)(withRouter(RecoverPassword));
