import React from "react";
import chatTypingLoader from "../img/chat_typing.gif";
const ChatTypingLoader = () => {
  return (
    <div>
      <img
        src={chatTypingLoader}
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

export default ChatTypingLoader;
