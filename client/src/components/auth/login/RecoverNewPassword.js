import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { isPassValid, isMatchedPass } from "../../../actions/userActions";
import { withRouter } from "react-router-dom";

class RecoverNewPassword extends Component {
  state = {
    name: "",
    email: "",
    password1: "",
    password2: "",
    errors: {},
    messages: {}
  };

  componentDidMount() {
    // console.log("params", this.props.match.params);
    const decoded = jwt_decode(this.props.match.params.token);
    // console.log("decoded", decoded);
    this.setState({
      name: decoded.name,
      email: decoded.email
    });
  }

  //Checkin password onChange
  onChangePassword1 = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onChangePassword2 = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
    if (prevProps.message !== this.props.message) {
      this.setState({
        messages: this.props.message
      });
    }

    if (prevState.password1 !== this.state.password1) {
      const data = {
        password1: this.state.password1
      };

      this.props.isPassValid(data);
    }
    if (prevState.password2 !== this.state.password2) {
      const data = {
        password2: this.state.password2
      };

      this.props.isPassValid(data);
    }
  }
  //on submit form form mattching
  onSubmitPassword = e => {
    e.preventDefault();
    console.log("submitted");
    const data = {
      password1: this.state.password1,
      password2: this.state.password2,
      email: this.state.email
    };
    //we add email of user for further findAndUpdate({email})

    this.props.isMatchedPass(data, this.props.history);
  };

  render() {
    const { name, password1, password2, errors, messages } = this.state;
    console.log("this.props", this.props);
    console.log("this.state", this.state);

    return (
      <div>
        {" "}
        <div className="card card-body my-4 bg-light">
          <div className="card-header h5 bg-warning">
            Welcome {name} to the Password Recovery
          </div>

          <p className="card-text mt-3">
            Please provide your e-mail address on which we will send you further
            instructions.
          </p>
          <form onSubmit={this.onSubmitPassword}>
            <TextFormGroup
              placeholder="new password"
              value={password1}
              name="password1"
              onChange={this.onChangePassword1}
              error={errors.password1}
              message={messages.password1}
            />
            <TextFormGroup
              placeholder="confirm password"
              value={password2}
              name="password2"
              onChange={this.onChangePassword2}
              error={errors.password2}
              message={messages.password2}
            />
            <button type="submit" className="btn btn-block btn-dark">
              Confirm
            </button>
          </form>
          {messages.message ? (
            <div className="my-3 text-success">{messages.message}</div>
          ) : null}
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
  { isPassValid, isMatchedPass }
)(withRouter(RecoverNewPassword));
