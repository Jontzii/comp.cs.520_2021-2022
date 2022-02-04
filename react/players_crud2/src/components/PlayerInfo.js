export const PlayerInfo = ({ player, handleDelete }) => {
  return (
    <div id="selected-player">
      <div className="player-id">{player.id}</div>
      <div className="player-name">{player.name}</div>
      <div className="player-status">
        {(player.isActive && "active") || "not active"}
      </div>
      <button
        className="delete-btn"
        onClick={(e) => handleDelete(player.id, e)}
      >
        Delete
      </button>
    </div>
  );
};
