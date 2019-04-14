import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MailSentSuccess extends Component {
  render() {
    const { message } = this.props.mail;
    return (
      <div>
        <div className="row ">
          <div className="mx-auto">
            <div className="col-md-12 my-4">
              <div className="h4 text-center ">{message}</div>
            </div>
          </div>
        </div>
        <Link to="/">Go Back To Main</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mail: state.mail
});

export default connect(
  mapStateToProps,
  {}
)(MailSentSuccess);
