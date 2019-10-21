import React from "react";
import avatar from "../img/avatar.png";

const Avatar = () => {
  return (
    <div>
      <img
        src={avatar}
        alt="avatar"
        style={{
          width: "50px",
          margin: "auto",
          display: "block",
          backgroundColor: "#f8f9fa"
        }}
      />
    </div>
  );
};
export default Avatar;
