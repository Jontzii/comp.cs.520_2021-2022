/** @format NORMAL ACTION CREATORS*/

import { ADD_PLAYER, REMOVE_PLAYER, SET_PLAYERS } from '../constants';
/**
 * @description normal action creator that returns an action with type SET_PLAYERS to the frontends reducers along with the payload that includes players.
 * @param {Array} players - The players ids and names in an array.
 * @return {Object} action
 */
export const setPlayers = (players) => ({});

/**
 * @description normal action creator that returns an action with type ADD_PLAYER to the frontends reducers along with the payload that includes player.
 * @param {Object} player - The player with id and name that is to be included in store.
 * @return {Object} action
 */
export const addPlayer = (player) => ({});

/**
 * @description normal action creator that returns an action with type REMOVE_PLAYER to the frontends reducers along with the payload of playerId.
 * @param {String} playerId - The players id.
 * @return {Object} action
 */
export const removePlayer = (playerId) => ({});
