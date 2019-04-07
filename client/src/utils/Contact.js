import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div>
        <div className="card card-body my-4 " style={{ height: "300px" }}>
          <div className="row">
            <div className="col-md-4 border">Phone</div>
            <div className="col-md-8 border">
              <div className="text-center h3">Email Us</div>
              <form action="" className="my-4">
                <div className="row my-2">
                  <div className="col-md-6 my-2">
                    <input type="text" />
                  </div>
                  <div className="col-md-6 my-2">
                    <input type="text" />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-md-6 my-2">
                    <input type="text" />
                  </div>
                  <div className="col-md-6 my-2">
                    <input type="text" />
                  </div>
                </div>
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
