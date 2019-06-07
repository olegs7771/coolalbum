import { GET_GEO, GET_CURRENT_WEATHER } from "./types";
import axios from "axios";

//Get Geo from Ip
export const getGeoFromIp = data => dispatch => {
  console.log("data", data);
  axios.post("/api/weather/geo", data).then(res => {
    console.log("res.data", res.data);
  });
};
