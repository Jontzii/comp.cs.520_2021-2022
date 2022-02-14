import * as actions from "./actionTypes.js";

export const addPlayer = (name, isActive = false) => {
  return {
    type: actions.ADD_PLAYER,
    payload: {
      name,
      isActive,
    },
  };
};

export const removePlayer = (id) => {
  return {
    type: actions.REMOVE_PLAYER,
    payload: {
      id,
    },
  };
};

export const togglePlayerStatus = (id) => {
  return {
    type: actions.TOGGLE_PLAYER_STATUS,
    payload: {
      id,
    },
  };
};
