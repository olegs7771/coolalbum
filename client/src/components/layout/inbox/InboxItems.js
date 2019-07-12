import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
class InboxItems extends Component {
  render() {
    const { name, avatar, date, text } = this.props;

    //style
    const Card = styled.section`
      background: rgb(0, 0, 0, 0);
    `;
    const Text = styled.section`
      background: rgb(240, 241, 242, 0.61);
    `;
    const Font = styled.span`
      font-size: 14px;
    `;
    return (
      <Card className="card my-4 col-md-7 mr-1 p-4 mx-auto">
        <div className="row">
          <div className="col-md-4 ">
            <h5 className="card-title">{name}</h5>
            <div className="card-title">
              <Font>
                <span className="text-muted">Received on: </span>
              </Font>

              {moment(date).format("DD/MM/YYYY")}
            </div>
            <img
              src={avatar}
              alt="avatar"
              style={{ width: "100px", height: "100px" }}
              className="rounded-circle"
            />
          </div>
          <Text className="col-md-8 rounded-pill p-4 my-4">
            <span>{text}</span>
          </Text>
        </div>
      </Card>
    );
  }
}
export default InboxItems;
