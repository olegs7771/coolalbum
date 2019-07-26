import { CHAT_MESSAGE, CHAT_TYPING_LOADER } from "./types";
import Axios from "axios";

//Get All Online Users
export const getOnlineUsers = () => dispatch => {
  Axios.get("/api/chat/online")
    .then(res => {
      res.status(200).json({ msg: "All online" });
    })
    .catch(err => {
      console.log("err", err.response.data);
    });
};

//send chatMsg
export const chatMessage = data => dispatch => {
  // console.log("data", data);
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
  Axios.get("/api/chat/get_all")
    .then(res => {
      console.log("all chat fetched", res.data);
    })
    .catch(err => {
      console.log("err", err.response.data);
    });
};

//Delete Chat Message by ID
export const deleteChatMessage = data => dispatch => {
  Axios.post("/api/chat/delete", data)
    .then(res => {
      console.log("res.data", res.data);
    })
    .catch(err => {
      console.log("err.response.data", err.response.data);
    });
};

//chat typing loader image
export const chatLoader = () => dispatch => {
  dispatch({
    type: CHAT_TYPING_LOADER
  });
};
