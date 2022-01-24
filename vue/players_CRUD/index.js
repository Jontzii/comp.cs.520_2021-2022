"use strict";

const AddPlayerComponent = {
  name: "add-player",
  data() {
    return {
      name: "",
    };
  },
  template: `
    <form id="submit-player">
      <input
        type="text"
        id="input-player"
        name="player-name"
        v-model="name"
        placeholder="Enter player name"
        required
      >
      <button
        type="submit"
        id="add-btn"
        v-on:click="$emit('add-player', name)"
      >
        Add
      </button>
    </form>
  `,
};

const ListPlayersComponent = {
  name: "list-players",
  props: ["players"],
  template: `
    <div>
      <h3>Players List</h3>
      <ol id="players-list">
        <list-player
          v-for="player in players"
          v-bind:player="player"
          v-bind:key="player.id"
          v-bind:id="'player-' + player.id"
          v-on:player-clicked="$emit('player-clicked', $event)"
        ></list-player>
      </ol>
    </div>
  `,
};

const ListPlayerComponent = {
  name: "list-player",
  props: ["player"],
  template: `
    <li>
      <a v-on:click="$emit('player-clicked', player.id)" href="#">{{player.name}}</a>
    </li>
  `,
};

const ShowPlayerComponent = {
  name: "show-player",
  props: ["player"],
  template: `
    <div v-if="player !== null" id="selected-player">
        <div class="player-id">{{player.id}}</div>
        <div class="player-name">{{player.name}}</div>
        <div class="player-status">
          {{player.isActive ? "active" : "not active"}}
        </div>
        <button
          class="delete-btn"
          v-on:click="$emit('delete-player', player.id)"
        >
          Delete
        </button>
    </div>
  `,
};

const RequestStatusComponent = {
  name: "request-status",
  props: ["requestStatus"],
  template: `
    <div id="request-status">{{requestStatus}}</div>
  `,
};

const App = {
  template: `
    <div>
      <add-player v-on:add-player="addPlayer"></add-player>
      <list-players v-bind:players="this.players" v-on:player-clicked="getPlayer"></list-players>
      <show-player v-bind:player="this.selectedPlayer" v-on:delete-player="deletePlayer"></show-player>
      <request-status v-bind:requestStatus="this.reqStatus"></request-status>
    </div>
  `,
  created() {
    this.getPlayers();
  },
  data() {
    return {
      baseURL: "http://localhost:3001/api/players",
      players: [],
      selectedPlayer: null,
      reqStatus: "",
    };
  },
  methods: {
    addPlayer(name) {
      if (!name || name == "") return;

      this.reqStatus = "Loading...";
      fetch(this.baseURL, {
        method: "POST",
        body: JSON.stringify({ name, isActive: false }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.reqStatus = "";
          this.players.push(data);
        })
        .catch(() => {
          this.reqStatus = "An error has occured!!!";
        });
    },
    getPlayers() {
      this.reqStatus = "Loading...";
      fetch(this.baseURL)
        .then((res) => res.json())
        .then((data) => {
          this.reqStatus = "";
          this.players = data;
        })
        .catch(() => {
          this.reqStatus = "An error has occured!!!";
        });
    },
    getPlayer(id) {
      this.reqStatus = "Loading...";
      fetch(this.baseURL + `/${id}`)
        .then((res) => res.json())
        .then((data) => {
          this.reqStatus = "";
          this.selectedPlayer = data;
        })
        .catch(() => {
          this.reqStatus = "An error has occured!!!";
        });
    },
    deletePlayer(id) {
      this.reqStatus = "Loading...";
      fetch(this.baseURL + `/${id}`, { method: "DELETE" })
        .then(() => {
          this.reqStatus = "";
          this.players = this.players.filter((player) => player.id !== id);
          this.selectedPlayer = null;
        })
        .catch(() => {
          this.reqStatus = "An error has occured!!!";
        });
    },
  },
};
