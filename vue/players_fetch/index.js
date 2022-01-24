"use strict";

const template= `
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
      <div id="player-name">{{selectedPlayer.name}}</div>
      <div id="player-status">
        {{selectedPlayer.isActive ? "active" : "not active"}}
      </div>
    </div>
  </div>
  <div id="request-status">{{reqStatus}}</div>
</div>
`

const App = {
//TODO: template, data and methods missing
  created() {
    this.getPlayers();
  },
};