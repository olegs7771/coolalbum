import React, { Component } from "react";

class SuccessRegMsg extends Component {
  render() {
    return (
      <div>
        <div className="row ">
          <div className="mx-auto">
            <div className="col-md-12 my-4">
              <div className="h3 text-center ">
                You Have Been Successfully Registered!
              </div>
            </div>
          </div>
        </div>
        <a href="/">Go Back To Main</a>
      </div>
    );
  }
}
export default SuccessRegMsg;
