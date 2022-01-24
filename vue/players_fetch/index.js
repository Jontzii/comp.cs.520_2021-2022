"use strict";

const template = `
<div>
  <div>
    <h3>Players List</h3>
    <ol id="players-list">
      <li
        v-for="player in players"
        :key="player.id"
        :id="'player-'+player.id"
      >
        <a @click.stop.prevent="getPlayer(player.id)" href="#"
          >{{player.name}}</a
        >
      </li>
    </ol>
  </div>
  <div>
    <h3>Selected Player</h3>
    <div v-if="selectedPlayer !== null" id="selected-player">
      <div id="player-id">{{selectedPlayer.id}}</div>
      <div id="player-name">{{selectedPlayer.name}}</div>
      <div id="player-status">
        {{selectedPlayer.isActive ? "active" : "not active"}}
      </div>
    </div>
  </div>
  <div id="request-status">{{reqStatus}}</div>
</div>
`;

const App = {
  //TODO: template, data and methods missing
  template: template,
  created() {
    this.getPlayers();
  },
  data() {
    return {
      players: [],
      selectedPlayer: null,
      reqStatus: "Loading...",
    };
  },
  methods: {
    getPlayers() {
      this.reqStatus = "Loading...";
      fetch("http://localhost:3001/api/players")
        .then((res) => res.json())
        .then((data) => {
          this.reqStatus = "";
          this.players = data;
        })
        .catch(() => (this.reqStatus = "An error has occured!!!"));
    },
    getPlayer(id) {
      this.reqStatus = "Loading...";
      fetch(`http://localhost:3001/api/players/${id}`)
        .then((res) => res.json())
        .then((data) => {
          this.reqStatus = "";
          this.selectedPlayer = data;
        })
        .catch(() => (this.reqStatus = "An error has occured!!!"));
    },
  },
};
