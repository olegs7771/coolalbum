import React, { Component } from "react";

class InboxItems extends Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <div className="card mx-auto">name:{name}</div>
      </div>
    );
  }
}
export default InboxItems;
