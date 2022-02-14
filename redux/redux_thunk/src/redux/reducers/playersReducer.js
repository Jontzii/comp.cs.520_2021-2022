/** @format REDUCERS*/

import { ADD_PLAYER, REMOVE_PLAYER, SET_PLAYERS } from "../constants";

const defaultState = [];

const playersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return [...state, action.payload];
    case REMOVE_PLAYER:
      const index = state.findIndex((val) => val.id === action.payload);

      if (index === -1) {
        return state;
      }

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length + 1),
      ];
    case SET_PLAYERS:
      return [...action.payload];
    default:
      return state;
  }
};

export default playersReducer;
