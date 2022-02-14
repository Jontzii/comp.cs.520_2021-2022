/** @format COMPONENTS */

import { useSelector } from "react-redux";
import { Player } from "./Player";

export const PlayersList = () => {
  const players = useSelector((state) => state.players.players);
  console.log("Players:", players);

  return (
    <div>
      <h2>Player list</h2>
      <ol id="players-list">
        {players &&
          players.map((player) => (
            <li key={player.id} id={`player-${player.id}`}>
              <Player
                name={player.name}
                id={player.id}
                isActive={player.isActive}
              />
            </li>
          ))}
      </ol>
    </div>
  );
};
