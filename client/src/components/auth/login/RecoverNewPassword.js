import React, { Component } from "react";
import TextFormGroup from "../../textFormGroup/TextFormGroup";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { isPassValid } from "../../../actions/userActions";

class RecoverNewPassword extends Component {
  state = {
    name: "",
    password1: "",
    password2: "",
    errors: {},
    messages: {}
  };

  componentDidMount() {
    console.log("params", this.props.match.params);
    const decoded = jwt_decode(this.props.match.params.token);
    console.log("decoded", decoded);
    this.setState({
      name: decoded.name
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
    if (prevProps !== this.props) {
      this.setState({
        errors: this.props.errors,
        message: this.props.message
      });
      //clear this.state.errors if this.state.messages obj>0
      if (Object.keys(this.state.messages).length > 0) {
        this.setState({
          errors: {}
        });
      }
    }
    if (prevState.password1 !== this.state.password1) {
      const data = {
        password1: this.state.password1
      };

      this.props.isPassValid(data);
    }
  }

  render() {
    const { name, password1, password2, errors, messages } = this.state;
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
          <form onSubmit={this.onSubmitMail}>
            <TextFormGroup
              placeholder="new password"
              value={password1}
              name="password1"
              onChange={this.onChangePassword1}
              error={errors.loginEmail}
              message={messages.loginEmail}
            />
            <TextFormGroup
              placeholder="confirm password"
              value={password2}
              name="password2"
              onChange={this.onChangePassword2}
              error={errors.loginEmail}
              message={messages.loginEmail}
            />
            <button type="submit" className="btn btn-block btn-dark">
              Confirm
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
  { isPassValid }
)(RecoverNewPassword);
