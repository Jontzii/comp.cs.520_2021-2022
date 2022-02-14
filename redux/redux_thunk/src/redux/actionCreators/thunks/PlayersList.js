/** @format THUNK*/

import { ERROR, LOADING, READY } from "../../constants";
import { setPlayers } from "../playersActions";
import { setStatus } from "../statusActions";

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
export const getPlayers = () => {
  return async (dispatch) => {
    dispatch(setStatus(LOADING));

    try {
      const res = await fetch("/api/players", {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(setStatus(READY));
      dispatch(setPlayers(data));
    } catch {
      dispatch(setStatus(ERROR));
    }
  };
};
