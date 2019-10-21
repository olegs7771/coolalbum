import React from "react";
import bg from "../img/bike.jpg";

const BgColor = () => {
  return (
    <div>
      <img
        src={bg}
        alt="bg"
        style={{
          width: "200px",
          margin: "auto",
          display: "block",
          backgroundColor: "#f8f9fa"
        }}
      />
    </div>
  );
};
export default BgColor;
