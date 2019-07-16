import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
class InboxItems extends Component {
  state = {
    showMore: false
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
    const { name, avatar, date, text } = this.props;
    const { showMore } = this.state;

    let inboxContent;
    if (showMore) {
      inboxContent = (
        <div className="card px-3  py-2">
          <i
            className="fas fa-sort-up ml-auto"
            onClick={() => {
              this.setState({
                showMore: !this.state.showMore
              });
            }}
          />
          <div className="row">
            <div className="col-md-4 ">
              <h6 className="card-title"> {name}</h6>
              <div className="card-title">
                <Font>
                  <span className="text-muted">Received on: </span>
                  {moment(date).format("DD/MM/YYYY")}
                </Font>
              </div>
              <img
                src={avatar}
                alt="avatar"
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle"
              />
            </div>
            <Text className="col-md-8 rounded-pill p-4 my-4">
              <TextFont>{text}</TextFont>
            </Text>
          </div>
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
              <h6 className="card-title"> From {name}</h6>
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
        </div>
      );
    }

    return <Card className="  my-1 col-md-7 mr-1 mx-auto">{inboxContent}</Card>;
  }
}
export default InboxItems;
