/** @format THUNK*/

import { ERROR, LOADING, READY } from '../../constants';
import { setPlayers } from '../playersActions';
import { setStatus } from '../statusActions';

/**
 * @description thunk for getting all players.
 * Whenever called, dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - setPlayers-action with response array as param
 * If Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @return {Function} - thunk
 */
export const getPlayers = () => {};
