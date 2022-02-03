import "./App.css";

import { useEffect, useState } from "react";

import { AddPlayer } from "./components/AddPlayer";
import { PlayerInfo } from "./components/PlayerInfo";
import { PlayersList } from "./components/PlayersList";
import { RequestStatus } from "./components/RequestStatus";

const requestStatus = {
  LOADING: "Loading...",
  READY: "",
  ERROR: "An error has occurred!!!",
};

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [reqStatus, setReqStatus] = useState(requestStatus.READY);

  /**
   * Fetch data from url and return it
   * @param {*} url URL to fetch from
   * @returns
   */
  const fetchData = async (url) => {
    setReqStatus(requestStatus.LOADING);
    try {
      const res = await fetch(url, { headers: { accept: "application/json" } });
      setReqStatus(requestStatus.READY);
      return await res.json();
    } catch {
      return setReqStatus(requestStatus.ERROR);
    }
  };

  /**
   * Add new player
   * @param {*} data Player data
   */
  const addPlayer = (data, e) => {
    e.preventDefault();

    setReqStatus(requestStatus.LOADING);
    fetch(`/api/players`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        const newPlayers = players;
        newPlayers.push(data);
        setPlayers(newPlayers);
        setReqStatus(requestStatus.READY);
      })
      .catch(() => setReqStatus(requestStatus.ERROR));
  };

  /**
   * Get single player
   * @param {*} url Single player url
   * @param {*} e Event
   */
  const getPlayer = async (url, e) => {
    e.preventDefault();
    const data = await fetchData(url);
    if (data) setSelectedPlayer(data);
  };

  /**
   * Get all players
   */
  const getPlayers = async () => {
    const data = await fetchData("/api/players");
    if (data) setPlayers(data);
  };

  /**
   * Delete player
   * @param {*} id ID of the player
   * @param {*} e Event
   */
  const deletePlayer = async (id, e) => {
    e.preventDefault();
    setReqStatus(requestStatus.LOADING);

    try {
      const res = await fetch(`/api/players/${id}`, {
        method: "DELETE",
        headers: { accept: "application/json" },
      });

      if (res.ok) {
        const newPlayers = players.filter((player) => player.id !== id);
        setPlayers(newPlayers);
        setSelectedPlayer(null);
        return setReqStatus(requestStatus.READY);
      }
      setReqStatus(requestStatus.ERROR);
    } catch {
      setReqStatus(requestStatus.ERROR);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div>
      <AddPlayer handleSubmit={addPlayer} />
      <PlayersList players={players} selectPlayer={getPlayer} />
      {selectedPlayer !== null && (
        <PlayerInfo player={selectedPlayer} handleDelete={deletePlayer} />
      )}
      <RequestStatus status={reqStatus} />
    </div>
  );
}

export default App;
