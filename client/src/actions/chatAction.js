import Axios from "axios";

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
//load chatMessages by Date
export const loadChatMessagesByDate = data => dispatch => {
  console.log("data", data);

  Axios.post("/api/chat/date", data)
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
