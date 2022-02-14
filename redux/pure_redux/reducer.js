import * as actions from "./actionTypes.js";

export default (state = [], action) => {
  try {
    switch (action.type) {
      case actions.ADD_PLAYER:
        // Find the largest id from store
        let nextId = 1;

        if (state.length > 0) {
          const largestId = state.reduce((prev, curr) => {
            if (prev.id >= curr.id) return prev;
            else return curr;
          });

          nextId = largestId.id + 1;
        }

        state.push({
          id: nextId,
          name: action.payload.name,
          isActive: action.payload.isActive,
        });

        return state;
      case actions.REMOVE_PLAYER:
        const rm_index = state.findIndex((val) => val.id === action.payload.id);

        if (rm_index === -1) return state;

        state.splice(rm_index, 1);
        return state;
      case actions.TOGGLE_PLAYER_STATUS:
        const toggle_index = state.findIndex(
          (val) => val.id === action.payload.id
        );

        if (toggle_index === -1) return state;

        state[toggle_index].isActive = !state[toggle_index].isActive;
        return state;
      default:
        return state;
    }
  } catch (e) {
    return state;
  }
};
