import "./App.css";

import { useState } from "react";

import { AddPlayer } from "./components/AddPlayer";
import { AuthForm } from "./components/AuthForm";
import { Logout } from "./components/Logout";
import { PlayerInfo } from "./components/PlayerInfo";
import { PlayersList } from "./components/PlayersList";
import { RequestStatus } from "./components/RequestStatus";

const requestStatus = {
  LOADING: "Loading...",
  READY: "",
  ERROR: "An error has occurred!!!",
};

function App() {
  const [auth, setAuth] = useState(null);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [reqStatus, setReqStatus] = useState(requestStatus.READY);

  /**
   * Handle user registration/login
   * @param {*} isLogin
   * @param {*} e
   */
  const handleAuth = async (isLogin, username, password, e) => {
    e.preventDefault();
    setReqStatus(requestStatus.LOADING);

    // Login user
    if (isLogin) return handleLogin(username, password);

    // Register user
    return handleRegister(username, password);
  };

  /**
   * Handle usen login
   * @param {*} username
   * @param {*} password
   * @returns
   */
  const handleLogin = (username, password) => {
    const encoded = btoa(`${username}:${password}`);

    setAuth(encoded);
    setReqStatus(requestStatus.LOADING);

    fetch("/api/players", {
      headers: {
        accept: "application/json",
        authorization: `Basic ${encoded}`,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Not OK");
      })
      .then((data) => {
        setPlayers(data);
        setReqStatus(requestStatus.READY);
      })
      .catch(() => {
        setAuth(null);
        setReqStatus(requestStatus.ERROR);
      });
  };

  /**
   * Handle user registration
   * @param {*} username
   * @param {*} password
   */
  const handleRegister = async (username, password) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        return setReqStatus(requestStatus.ERROR);
      }

      return handleLogin(username, password);
    } catch {
      return setReqStatus(requestStatus.ERROR);
    }
  };

  /**
   * Handle user logout
   * @param {*} e
   */
  const handleLogout = (e) => {
    e.preventDefault();
    setAuth(null);
    setPlayers([]);
    setSelectedPlayer(null);
  };

  /**
   * Fetch data from url and return it
   * @param {*} url URL to fetch from
   * @returns
   */
  const fetchData = async (url) => {
    setReqStatus(requestStatus.LOADING);

    try {
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          authorization: `Basic ${auth}`,
        },
      });

      if (!res.ok) return setReqStatus(requestStatus.ERROR);

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
        authorization: `Basic ${auth}`,
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
    if (data && Array.isArray(data)) return setPlayers(data);
    throw new Error();
  };

  /**
   * Delete player
   * @param {*} id ID of the player
   * @param {*} e Event
   */
  const deletePlayer = (id, e) => {
    e.preventDefault();
    setReqStatus(requestStatus.LOADING);

    fetch(`/api/players/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        authorization: `Basic ${auth}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          setReqStatus(requestStatus.ERROR);
          return;
        }

        const newPlayers = players.filter((player) => player.id !== id);
        setPlayers(newPlayers);
        setSelectedPlayer(null);
        setReqStatus(requestStatus.READY);
      })
      .catch(() => setReqStatus(requestStatus.ERROR));
  };

  if (!auth) {
    return (
      <div>
        <AuthForm handleSubmit={handleAuth} />
        <RequestStatus status={reqStatus} />
      </div>
    );
  } else {
    return (
      <div>
        <Logout handleLogout={handleLogout} />
        <AddPlayer handleSubmit={addPlayer} />
        <PlayersList players={players} selectPlayer={getPlayer} />
        {selectedPlayer !== null && (
          <PlayerInfo player={selectedPlayer} handleDelete={deletePlayer} />
        )}
        <RequestStatus status={reqStatus} />
      </div>
    );
  }
}

export default App;
