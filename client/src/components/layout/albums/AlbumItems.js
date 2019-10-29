import React from "react";

const AlbumItems = props => (
  <div className="card card-body ">
    Title : {props.title}
    <img src={props.image} style={{ width: "100%" }} alt="" />
  </div>
);
export default AlbumItems;
