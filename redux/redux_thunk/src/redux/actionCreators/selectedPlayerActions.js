/** @format NORMAL ACTION CREATORS */

// SELECTED PLAYER ACTION CREATORS

import { CLEAR_SELECTED_PLAYER, SET_SELECTED_PLAYER } from '../constants';

/**
 * @description normal action creator that returns an action with type SET_SELECTED_PLAYER to the frontends reducers along with the payload that includes player.
 * @param {Object} player - The player that is to be stored in state
 * @return {Object} action
 */
export const setSelectedPlayer = (player) => ({});

/**
 * @description normal action creator that returns an action with type CLEAR_SELECTED_PLAYER to the frontends reducers
 * @param {Object} player - The player that is to be stored in state
 * @return {Object} action
 */
export const clearSelectedPlayer = () => ({});
