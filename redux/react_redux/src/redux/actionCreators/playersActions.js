/** @format NORMAL ACTION CREATORS*/

import { ADD_PLAYER, REMOVE_PLAYER} from '../constants';


/**
 * @description normal action creator that returns an action with type ADD_PLAYER to the frontends reducers along with the payload that includes player.
 * @param {Object} player - The player with id and name that is to be included in store.
 * @return {Object} action
 */
export const addPlayer = (player) => ({
	type: ADD_PLAYER,
	payload: player,
});

/**
 * @description normal action creator that returns an action with type REMOVE_PLAYER to the frontends reducers along with the payload of playerId.
 * @param {String} playerId - The players id.
 * @return {Object} action
 */
export const removePlayer = (playerId) => ({
	type: REMOVE_PLAYER,
	payload: playerId,
});


