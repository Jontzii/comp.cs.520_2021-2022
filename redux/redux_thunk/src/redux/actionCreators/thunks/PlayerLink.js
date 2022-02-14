/** @format THUNK*/

import { ERROR, LOADING, READY } from "../../constants";
import { setSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

/**
 * @description thunk for getting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - setSelectedPlayer-action with player-object as param
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @param {String} url -  url of the player to be selected
 * @return {Function} - thunk
 */
export const getSelectedPlayer = (url) => {
  return async (dispatch) => {
    dispatch(setStatus(LOADING));

    try {
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(setStatus(READY));
      dispatch(setSelectedPlayer(data));
    } catch {
      dispatch(setStatus(ERROR));
    }
  };
};
