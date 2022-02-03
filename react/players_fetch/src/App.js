import "./App.css";

import { useEffect, useState } from "react";

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
  const [status, setStatus] = useState(requestStatus.READY);

  const fetchPlayers = () => {
    setStatus(requestStatus.LOADING);

    fetch("/api/players", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        setPlayers(data);
        setStatus(requestStatus.READY);
      })
      .catch(() => setStatus(requestStatus.ERROR));
  };

  const fetchPlayer = (url, e) => {
    setStatus(requestStatus.LOADING);
    e.preventDefault();

    fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        setSelectedPlayer(data);
        setStatus(requestStatus.READY);
      })
      .catch(() => setStatus(requestStatus.ERROR));
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div>
      <PlayersList players={players} selectPlayer={fetchPlayer} />
      {selectedPlayer !== null && <PlayerInfo player={selectedPlayer} />}
      <RequestStatus status={status} />
    </div>
  );
}

export default App;
