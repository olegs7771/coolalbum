import React, { Component } from "react";
import TextFormGroup from "../components/textFormGroup/TextFormGroup";
import TextAreaFormGroup from "../components/textFormGroup/TextAreaFormGroup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendEmailMessage } from "../actions/emailAction";
import Spinner from "../utils/Spinner";

class Contact extends Component {
  state = {
    name: "",
    company: "",
    email: "",
    text: "",
    errors: {},
    mailSent: {
      message: "",
      loading: false
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // after submit
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        errors: this.props.errors,
        mailSent: this.props.mail
      });
    }
  }

  onSubmit = e => {
    const { name, company, email, text } = this.state;
    const { history } = this.props;
    e.preventDefault();
    const emailContact = true;
    const newEmailMessage = {
      name,
      company,
      email,
      text,
      emailContact
    };
    this.props.sendEmailMessage(newEmailMessage, history);
  };

  render() {
    const { name, company, email, phone, text, errors, mailSent } = this.state;
    const { message, loading } = mailSent;
    console.log("errors", errors);

    let mailMessageContent;

    if (Object.keys(errors).length === 0) {
      if (message === null || loading) {
        mailMessageContent = <Spinner />;
      } else {
        mailMessageContent = (
          <div>
            <div className="text-success my-2">{message}</div>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="card card-body my-4 bg-light ">
          <div className="row">
            <div className="col-md-4 ">
              <div className="text-center h3">CoolAlbum</div>

              <div className="my-4">
                <p className="text-left">
                  <i className="fas fa-phone-volume mr-2" />
                  050-3054422
                </p>

                <p className="text-left">
                  <i className="fas fa-envelope mr-2" />
                  coolalbum@coolalbum.info
                </p>
              </div>
            </div>
            <div className="col-md-8 ">
              <div className="text-center h3">Email Us</div>
              <form onSubmit={this.onSubmit} className="my-4">
                <div className="row my-2">
                  <div className="col my-2">
                    <TextFormGroup
                      label="Name"
                      name="name"
                      value={name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                  </div>
                  <div className="col my-2">
                    <TextFormGroup
                      name="company"
                      label="Company"
                      value={company}
                      onChange={this.onChange}
                      error={errors.company}
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col my-2">
                    <TextFormGroup
                      name="email"
                      label="Email"
                      value={email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                  </div>
                  <div className="col my-2">
                    <div className="form-group">
                      <TextFormGroup
                        label="Phone - Optional"
                        value={phone}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <TextAreaFormGroup
                  label="Message"
                  name="text"
                  value={text}
                  onChange={this.onChange}
                  error={errors.text}
                />

                <div className="mx-auto">
                  {mailMessageContent}
                  <button type="submit" className="btn btn-block bg-dark my-4">
                    <span className="text-white">Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors.errors,
  mail: state.mail
});

export default connect(
  mapStateToProps,
  { sendEmailMessage }
)(withRouter(Contact));
