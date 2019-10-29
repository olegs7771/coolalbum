import React from "react";

const AlbumItems = props => (
  <div className="card" style={{ width: "18rem" }}>
    <img
      src={props.image}
      style={{ width: "100%" }}
      className="card-img-top"
      alt=""
    />
    <div className="card-body">
      <h5 className="card-title">{props.title}</h5>
      <p className="card-text">{props.desc}</p>
      <a href="#" className="btn btn-primary">
        Go somewhere
      </a>
    </div>
  </div>
);
export default AlbumItems;
