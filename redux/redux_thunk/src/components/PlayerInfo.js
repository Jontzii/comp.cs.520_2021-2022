/** @format COMPONENTS */

import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedPlayer } from "../redux/actionCreators/thunks/PlayerInfo";

export const PlayerInfo = () => {
  const selectedPlayer = useSelector((state) => state.selectedPlayer);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSelectedPlayer());
  };

  if (selectedPlayer === {}) {
    <div id="selected-player"></div>;
  }

  return (
    <div id="selected-player">
      <div className="player-id">{selectedPlayer.id}</div>
      <div className="player-name">{selectedPlayer.name}</div>
      <div className="player-status">
        {(selectedPlayer.isActive && "active") || "not active"}
      </div>
      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
