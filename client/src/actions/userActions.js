import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  LOGOUT_USER,
  GET_MESSAGE,
  CLEAR_MESSAGE
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register New User
export const registerUser = (userData, history) => dispatch => {
  console.log("userData", userData);
  dispatch(deleteErrors());
  axios
    .post("api/users/register", userData)
    .then(res => {
      console.log("res.data", res.data);
    })
    .then(() => {
      history.push("/success_msg");
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Register New User
export const confirmRegister = (userData, history) => dispatch => {
  //userData --> {token,id} from url params mail
  axios
    .post("api/users/confirmRegistration", userData)

    .then(res => {
      const { token, _id } = res.data;
      //Set token to localStorage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header (we crerate it in separate file)
      setAuthToken(token);
      // set the user (using user creds from token. but first we must to decode token with jwt-decode module)
      const decoded = jwt_decode(token);

      const headData = {
        ...decoded,
        _id
      };

      //set current user (we create separate function here)
      dispatch(setCurrentUser(headData));
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      // Save to localStorage token
      const { token } = res.data;
      //Set token to localStorage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header (we crerate it in separate file)
      setAuthToken(token);
      // set the user (using user creds from token. but first we must to decode token with jwt-decode module)
      const decoded = jwt_decode(token);
      console.log("decoded", decoded);

      //set current user (we create separate function here)
      dispatch(setCurrentUser(decoded));
      history.push("/");
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Logout
export const logoutUser = history => dispatch => {
  // Remove jwtToken from localStorage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future request
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch({
    type: LOGOUT_USER,
    payload: {}
  });
};

//set logged user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Register with password-facebook-token
export const authFacebook = (userData, history) => dispatch => {
  console.log("userData", userData);

  axios
    .post("/api/users/auth/facebook", { access_token: userData })
    .then(res => {
      console.log("res.data", res.data);

      const { token } = res.data;
      //Save to localStorage recieved token
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header (we crerate it in separate file)
      setAuthToken(token);
      // set the user (using user creds from token. but first we must to decode token with jwt-decode module)
      const decoded = jwt_decode(token);
      console.log("decoded facebook", decoded);
      //set current user (we create separate function here)
      dispatch(setCurrentUser(decoded));
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Update Registered User with new data

export const updateUser = (upUserCreds, history, userData) => dispatch => {
  console.log("userData", userData);

  axios
    .post("/api/users/update", upUserCreds)
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
    })
    .then(() => {
      setTimeout(() => {
        dispatch(clearMessages());

        // Remove jwtToken from localStorage
        localStorage.removeItem("jwtToken");
        //Remove auth header for future request
        setAuthToken(false);
        //Set current user to {} which will set isAuthenticated to false
        dispatch({
          type: LOGOUT_USER,
          payload: {}
        });

        //relogin update user
        axios.post("api/users/login", userData).then(res => {
          // Save to localStorage token
          const { token } = res.data;
          //Set token to localStorage
          localStorage.setItem("jwtToken", token);
          //Set token to Auth header (we crerate it in separate file)
          setAuthToken(token);
          // set the user (using user creds from token. but first we must to decode token with jwt-decode module)
          const decoded = jwt_decode(token);
          console.log("decoded", decoded);

          //set current user (we create separate function here)
          dispatch(setCurrentUser(decoded));
          history.push("/");
        });

        history.push("/login");
      }, 5000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};

//login check if user exists
export const isEmailExists = data => dispatch => {
  console.log("email", data);
  dispatch(clearErrors());
  dispatch(clearMessages());

  axios
    .post("/api/users/email", data)
    .then(res => {
      console.log("res.data", res.data);
      dispatch(clearErrors());
      dispatch({
        type: GET_MESSAGE,
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
//register check if email already exists
export const isUserEmailExists = data => dispatch => {
  dispatch(clearErrors());
  dispatch(clearMessages());

  axios
    .post("/api/users/email_register", data)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: GET_MESSAGE,
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

//sending user instructions on recovering password
export const recoverPass = (data, history) => dispatch => {
  console.log("data", data);
  axios
    .post("/api/users/recover", data)
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
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

//password recovery onChange

export const isPassValid = data => dispatch => {
  dispatch(clearErrors());
  dispatch(clearMessages());
  console.log("data", data);
  axios
    .post("/api/users/password", data)
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
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

//match pawwords isMatched
export const isMatchedPass = (data, history) => dispatch => {
  console.log("data", data);
  axios
    .post("/api/users/match", data)
    .then(res => {
      console.log("res.data", res.data);

      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
      setTimeout(() => {
        history.push("/login");
      }, 5000);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Clear Errors
export const clearErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_ERRORS
  });
};
// Clear Messages
export const clearMessages = () => dispatch => {
  return dispatch({
    type: CLEAR_MESSAGE
  });
};
