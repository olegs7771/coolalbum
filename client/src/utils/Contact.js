import React, { Component } from "react";
import TextFormGroup from "../components/textFormGroup/TextFormGroup";
import TextAreaFormGroup from "../components/textFormGroup/TextAreaFormGroup";
import { GET_ERRORS } from "../actions/types";

class Contact extends Component {
  state = {
    name: "",
    company: "",
    email: "",
    message: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("submitted");
  };

  render() {
    const { name, company, email, phone, message, errors } = this.state;
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
                        label="Phone Number"
                        value={phone}
                        onChange={this.onChange}
                        error={errors.name}
                      />
                    </div>
                  </div>
                </div>
                <TextAreaFormGroup
                  label="Message"
                  name="message"
                  value={message}
                  onChange={this.onChange}
                />

                <div className="mx-auto">
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
export default Contact;
