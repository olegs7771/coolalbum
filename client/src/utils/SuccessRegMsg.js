import React, { Component } from "react";
import { connect } from "react-redux";

class SuccessRegMsg extends Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <div className="row ">
          <div className="mx-auto">
            <div className="col-md-12 my-4">
              <div className=" text-center ">
                Thank You for Registering on CoolAlbum Site. In order to
                complete your Registration, please check your Email and follow
                the instraction. Hope to See You Soon...
              </div>
            </div>
          </div>
        </div>
        <a href="/">Go Back To Main</a>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors.errors
});
export default connect(
  mapStateToProps,
  {}
)(SuccessRegMsg);
