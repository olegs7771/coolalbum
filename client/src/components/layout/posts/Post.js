import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import FaceBookBtn from "../../../utils/FaceBookBtn";
import { connect } from "react-redux";

class Post extends Component {
  state = {
    showBtn: false,
    isAuthenticated: false
  };
  componentDidMount() {
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      this.setState({
        isAuthenticated: true
      });
    }
  }

  render() {
    console.log("this.props.auth", this.props.auth);

    let btnContent;
    const { showBtn, isAuthenticated } = this.state;
    if (showBtn) {
      if (isAuthenticated) {
        btnContent = (
          <div>
            <button className="btn btn-light mb-2">Send</button>
          </div>
        );
      } else {
        btnContent = (
          <div>
            <FaceBookBtn />
          </div>
        );
      }
    }

    return (
      <div className="row">
        <div className="col-lg-3 d-none d-lg-block  border mt-4 mb-3 ml-2">
          avatar
        </div>

        <div className="col-md-12 col-lg-8 ">
          <form onSubmit={this.sendPost}>
            <TextAreaFormGroup
              onChange={() => {
                this.setState({
                  showBtn: true
                });
              }}
            />
            {btnContent}
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToprops = state => ({
  auth: state.auth
});
export default connect(mapStateToprops)(Post);
