/** @format COMPONENTS */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../redux/actionCreators/thunks/PlayersList";

import { PlayerLink } from "./PlayerLink";

export const PlayersList = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  return (
    <ol id="players-list">
      {players &&
        players.map((player) => (
          <li key={player.id} id={`player-${player.id}`}>
            <PlayerLink name={player.name} url={`/api/players/${player.id}`} />
          </li>
        ))}
    </ol>
  );
};
