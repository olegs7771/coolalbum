import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

// const initialState = {};

const middleware = [thunk];
<<<<<<< HEAD
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
=======
// console.log("process.env.NODE_ENV", process.env.NODE_ENV);
>>>>>>> 7849620d1844cfcbc4ed3d011e17ca63871b54d0

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
}
