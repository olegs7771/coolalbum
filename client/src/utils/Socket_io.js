// import React from "react";
import io from "socket.io-client";

const Socket_io = () => {
  // const socket = io("https://infinite-everglades-47869.herokuapp.com");
  const socket = io("http://localhost:5000");
  return socket;
};
export default Socket_io;
