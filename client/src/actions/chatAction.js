import { CHAT_MESSAGE } from "./types";
import Axios from "axios";
//send chatMsg
export const chatMessage = data => dispatch => {
  console.log("data", data);
  Axios.post("/api/chat/message", data)
    .then(res => {
      console.log("res.data", res.data);
    })
    .catch(err => {
      console.log("err.response.data", err.response.data);
    });
};

//load all chatMessages
export const loadChatMessages = () => dispatch => {
  Axios.post("/api/chat/all")
    .then(res => {
      console.log("all chat fetched", res.data);
    })
    .catch(err => {
      console.log("err", err.response.data);
    });
};
