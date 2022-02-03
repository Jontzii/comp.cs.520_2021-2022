import { PlayerLink } from "./PlayerLink";

export const PlayersList = ({ players, selectPlayer }) => {
  const playerItems = players.map((player) => (
    <li key={player.id}>
      <PlayerLink
        name={player.name}
        url={`/api/players/${player.id}`}
        onClick={selectPlayer}
      />
    </li>
  ));

  return <ol>{playerItems}</ol>;
};
