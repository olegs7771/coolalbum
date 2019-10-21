// import React from "react";
import io from "socket.io-client";

const Socket_io = () => {
  let socket;
  if (process.env.NODE_ENV !== "production") {
    socket = io("http://localhost:5000");
  } else {
    socket = io("https://morning-thicket-46114.herokuapp.com");
  }

  return socket;
};
export default Socket_io;
