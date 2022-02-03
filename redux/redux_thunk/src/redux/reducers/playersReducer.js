/** @format REDUCERS*/

import { ADD_PLAYER, REMOVE_PLAYER, SET_PLAYERS } from '../constants';

const defaultState = [];

const playersReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_PLAYERS:
			return action.payload;
		case ADD_PLAYER:
			return state.concat(action.payload);
		case REMOVE_PLAYER:
			return state.filter((player) => player.id !== action.payload);
		default:
			return state;
	}
};

export default playersReducer;
