/** @format THUNK*/

import { ERROR, LOADING, READY } from "../../constants";
import { addPlayer } from "../playersActions";
import { clearSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

/**
 * @description thunk for posting a new player.
 * Upon starting, Dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - addPlayer-action with returned player-object
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @param {Object} newPlayer -  The player to be added
 * @return {Function} - thunk
 */
export const postPlayer = (newPlayer) => {
  return async (dispatch) => {
    dispatch(setStatus(LOADING));

    try {
      const res = await fetch("/api/players", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: newPlayer,
      });
      const data = await res.json();
      dispatch(setStatus(READY));
      dispatch(addPlayer(data));
      dispatch(clearSelectedPlayer());
    } catch {
      dispatch(setStatus(ERROR));
    }
  };
};
