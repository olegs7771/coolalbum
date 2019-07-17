import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import { connect } from "react-redux";
import { deletePost } from "../../../actions/postAction";
class InboxItems extends Component {
  state = {
    showMore: false
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
    //style
    const Card = styled.section`
      background: rgb(0, 0, 0, 0);
    `;
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
        className="fas fa-trash-alt ml-auto my-2"
        onClick={this.delPostHandle.bind(this, id)}
      />
    );

    let inboxContent;
    if (showMore) {
      inboxContent = (
        <div className="card px-4  py-2">
          <i
            className="fas fa-sort-up ml-auto"
            onClick={() => {
              this.setState({
                showMore: !this.state.showMore
              });
            }}
          />
          <div>
            <span className="card-title"> From {name} </span>

            <Font>
              <span className="text-muted">Received on: </span>
              {moment(date).format("DD/MM/YYYY")}
            </Font>
            <div className="row">
              <div className="col-md-4 ">
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ width: "80px", height: "80px" }}
                  className="rounded-circle mt-3"
                />
              </div>
              <Text className="col-md-8 rounded-pill p-5 my-4 ">
                <TextFont>{text}</TextFont>
              </Text>
            </div>
          </div>
          {deleteBtnContent}
        </div>
      );
    } else {
      inboxContent = (
        <div className="card px-3 ">
          <i
            className="fas fa-sort-down ml-auto"
            onClick={() => {
              this.setState({
                showMore: !this.state.showMore
              });
            }}
          />
          <div className="row">
            <div className="col-md-4 ">
              <span className="card-title"> From {name}</span>
            </div>
            <div className="col-md-8 ">
              <div className="card-title">
                <Font>
                  <span className="text-muted">Received on: </span>
                  {moment(date).format("DD/MM/YYYY")}
                </Font>
              </div>
            </div>
          </div>
          {deleteBtnContent}
        </div>
      );
    }

    return <Card className="  my-1 col-md-7 mr-1 mx-auto">{inboxContent}</Card>;
  }
}
export default connect(
  null,
  { deletePost }
)(InboxItems);
