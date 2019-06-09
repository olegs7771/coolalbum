import {
  GET_CURRENT_WEATHER,
  GET_ERRORS,
  LOADING_CURRENT_WEATHER
} from "./types";
import axios from "axios";

//Get Geo from Ip
export const getWeather = () => dispatch => {
  dispatch(setWeatherLoading());
  axios
    .post("/api/weather/weather")
    .then(res => {
      dispatch({
        type: GET_CURRENT_WEATHER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Weather Loading
export const setWeatherLoading = () => {
  return {
    type: LOADING_CURRENT_WEATHER
  };
};
