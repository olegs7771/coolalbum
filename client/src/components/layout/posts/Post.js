import React, { Component } from "react";
import TextAreaFormGroup from "../../textFormGroup/TextAreaFormGroup";
import FaceBookBtn from "../../../utils/FaceBookBtn";

class Post extends Component {
  state = {
    showBtn: false
  };

  prompAuthFacebook = e => {
    console.log("login");
  };

  render() {
    let btnContent;
    const { showBtn } = this.state;
    if (showBtn) {
      btnContent = (
        <div>
          <FaceBookBtn />
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-2 d-none d-md-block  border mt-4 mb-3 ml-2">
          avatar
        </div>

        <div className="col-md-9">
          <form onSubmit={this.showLogitToPost}>
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
export default Post;
