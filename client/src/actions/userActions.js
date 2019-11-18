import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  LOGOUT_USER,
  GET_MESSAGE,
  CLEAR_MESSAGE,
  GET_ALL_USERS,
  LOADING_ALL_USERS
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
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
    })
    .then(() => {
      setTimeout(() => {
        history.push("/login");
      }, 5000);
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

//get user
export const getUser = () => dispatch => {
  axios
    .post("/api/users/get_user")
    .then(res => {
      console.log("res.data", res.data);
    })
    .catch(err => {
      console.log("err", err);
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

// Create new or Update Profile Avatar
export const updateAvatar = (fd, history, userData) => dispatch => {
  axios
    .post("/api/uploads/update", fd)
    .then(res => {
      console.log("res.data", res.data);

      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
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
        //login updated user
        // store.dispatch(loginUser(userData, history));
        console.log("ready to login again");
        console.log("userData before login", userData);

        if (userData.password === undefined) {
          return history.push("/");
        }

        axios.post("api/users/login", userData).then(res => {
          console.log("userData", userData);

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
      }, 6000);
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
//Delete Avatar
//Private Route

export const deleteAvatar = (history, userData) => dispatch => {
  console.log("delete in action");
  axios
    .post("/api/uploads/delete")
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
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
        //login updated user
        // store.dispatch(loginUser(userData, history));
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
      }, 4000);
    })
    .catch(err => {
      console.log(err);
    });
};

//Delete Profile
//@Private Route

export const deleteProfile = history => dispatch => {
  axios
    .post("/api/users/delete_profile")
    .then(res => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data
      });
      setTimeout(() => {
        // Remove jwtToken from localStorage
        localStorage.removeItem("jwtToken");
        //Remove auth header for future request
        setAuthToken(false);
        //Set current user to {} which will set isAuthenticated to false
        dispatch({
          type: LOGOUT_USER,
          payload: {}
        });
        history.push("/");
      }, 3000);
    })
    .catch(err => {
      console.log("error to delete :", err.response.data);
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
//Get ALL Users
export const getAllUsers = data => dispatch => {
  dispatch(loadingAllUsers());
  axios
    .post("api/users/all", data)
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
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
//Loading All Users
export const loadingAllUsers = () => dispatch => {
  return dispatch({
    type: LOADING_ALL_USERS
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
