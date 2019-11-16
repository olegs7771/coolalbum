import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import { connect } from "react-redux";
import { deletePost } from "../../../actions/postAction";
class InboxItems extends Component {
  state = {
    showMore: false,
    rotation: ""
  };

  //delete post
  delPostHandle = id => {
    console.log("delete id post", id);
    const data = {
      id
    };
    this.props.deletePost(data);
  };

  render() {
    console.log("this.props.message", this.props.message);
    console.log("windowsize", window.innerWidth);

    //style
    // const Card = styled.section`
    //   background: rgb(0, 0, 0, 0);
    // `;
    const Text = styled.section`
      background: rgb(240, 241, 242, 0.61);
    `;
    const Font = styled.span`
      font-size: 12px;
    `;
    const TextFont = styled.span`
      font-size: 14px;
    `;
    const { name, avatar, date, text, id } = this.props;
    const { showMore } = this.state;

    //Delete Btn
    let deleteBtnContent;
    deleteBtnContent = (
      <i
        className="fas fa-trash-alt ml-auto "
        onClick={this.delPostHandle.bind(this, id)}
      />
    );

    let inboxContent;
    if (showMore) {
      inboxContent = (
        <div className="card  p-4">
          <i
            className="fas fa-sort-up ml-auto"
            onClick={() => {
              this.setState({
                showMore: !this.state.showMore
              });
            }}
          />
          <div className="">
            <div className="border py-3 bg-dark rounded">
              <span className="card-title text-white"> From {name} </span>
              <Font>
                <span className="text-muted">Received on: </span>
                <span className="text-success">
                  {moment(date).format("DD/MM/YYYY")}
                </span>
              </Font>
            </div>
            <div className="row  mx-1">
              <div
                className="col-md-4   "
                style={{
                  paddingTop:
                    window.innerWidth < 500 && this.props.rotation > 0
                      ? "8%"
                      : "3%",
                  paddingBottom:
                    window.innerWidth < 500 && this.props.rotation > 0
                      ? "5%"
                      : "3%"
                }}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  style={{
                    width: "100%",
                    transform: `rotate(${this.props.rotation}deg)`
                  }}
                  className=" rounded mt-2 "
                />
              </div>
              <Text className="col-md-8 rounded p-2 my-4 ">
                <TextFont>{text}</TextFont>
              </Text>
            </div>
          </div>

          {deleteBtnContent}
        </div>
      );
    } else {
      inboxContent = (
        <a
          href="#!"
          onClick={() => {
            this.setState({
              showMore: !this.state.showMore
            });
          }}
        >
          <div
            className="card  px-4 "
            style={{ backgroundColor: "rgb(192, 187, 196,0.7)" }}
          >
            <div className="row">
              <div className="col-10 ">
                <span className="text-center text-white"> From {name}</span>
                <div className="text-center">
                  <Font>
                    <span className="text-white">Received on </span>
                    {moment(date).format("DD/MM/YYYY")}
                  </Font>
                </div>
              </div>
              <div className="col-2">
                <br />
                {deleteBtnContent}
              </div>
            </div>
          </div>
        </a>
      );
    }

    return <div className=" col-md-6 my-1">{inboxContent}</div>;
  }
}
const mapStateToProps = state => ({
  message: state.message.message
});
export default connect(mapStateToProps, { deletePost })(InboxItems);
