/** @format REDUCERS*/

import { SET_STATUS } from "../constants";

export const requestStatus = {
  LOADING: "Loading...",
  READY: "",
  ERROR: "An error has occurred!!!",
};

// This is the default state
const defaultState = requestStatus.LOADING;

const statusReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_STATUS:
      try {
        return requestStatus[action.payload];
      } catch {
        return state;
      }
    default:
      return state;
  }
};

export default statusReducer;
