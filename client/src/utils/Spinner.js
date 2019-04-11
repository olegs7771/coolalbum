import React from "react";
import spinner from "../img/spinner.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="spinner"
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
export default Spinner;
