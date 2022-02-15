/** @format THUNK*/

import { ERROR, LOADING, READY } from "../../constants";
import { removePlayer } from "../playersActions";
import { clearSelectedPlayer } from "../selectedPlayerActions";
import { setStatus } from "../statusActions";

/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @return {Function} - thunk
 */
export const deleteSelectedPlayer = () => {
  return async (dispatch, getState) => {
    dispatch(setStatus(LOADING));

    const { id } = getState().selectedPlayer;

    try {
      const res = await fetch(`/api/players/${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch(setStatus(READY));
      dispatch(removePlayer(data.id));
      dispatch(clearSelectedPlayer());
    } catch {
      dispatch(setStatus(ERROR));
    }
  };
};
