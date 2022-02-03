import { PlayerLink } from "./PlayerLink";

export const PlayersList = ({ players, selectPlayer }) => {
  return (
    <ol id="players-list">
      {players &&
        players.map((player) => (
          <li key={player.id} id={`player-${player.id}`}>
            <PlayerLink
              name={player.name}
              url={`/api/players/${player.id}`}
              onClick={selectPlayer}
            />
          </li>
        ))}
    </ol>
  );
};
