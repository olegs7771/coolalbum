import React, { Component } from "react";
import { connect } from "react-redux";

class SuccessRegMsg extends Component {
  state = {
    errors: {}
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        errors: this.props.errors
      });
    }
  }

  render() {
    console.log(this.state.errors);
    const { errors } = this.state;
    let errorContent;
    if (errors.error) {
      errorContent = (
        <div className="mx-auto my-4">
          <div className="text-danger">{errors.error}</div>
        </div>
      );
    } else {
      errorContent = (
        <div className="row ">
          <div className="mx-auto">
            <div className="col-md-12 my-4">
              <div className=" text-center ">
                Thank You for Registering on CoolAlbum Site. In order to
                complete your Registration, please check your Email and follow
                the instruction. Hope to See You Soon...
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {errorContent}
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
