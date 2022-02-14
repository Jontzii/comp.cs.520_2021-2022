/** @format REDUCERS*/

import { ADD_PLAYER, REMOVE_PLAYER } from "../constants";

export const initialState = {
  players: [],
};

export function playersReducer(state = initialState, action) {
  try {
    switch (action.type) {
      case ADD_PLAYER:
        // Find the largest id from store
        let nextId = 0;

        if (state.players.length > 0) {
          const largestId = state.players.reduce((prev, curr) => {
            if (prev.id >= curr.id) return prev;
            else return curr;
          });

          nextId = largestId.id + 1;
        }

        const player = {
          id: nextId,
          name: action.payload.name,
          isActive: action.payload.isActive,
        };

        return {
          ...state,
          players: [...state.players, player],
        };
      case REMOVE_PLAYER:
        const index = state.players.findIndex(
          (val) => val.id === action.payload
        );

        if (index === -1) {
          return state;
        }

        return {
          ...state,
          players: [
            ...state.players.slice(0, index),
            ...state.players.slice(index + 1, state.players.length + 1),
          ],
        };
      default:
        return state;
    }
  } catch {
    return state;
  }
}
