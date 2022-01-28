"use strict";

const AuthUserComponent = {
  name: "auth-user",
  props: ["isLoggedIn"],
  data() {
    return {
      registerForm: false,
      username: "",
      password: "",
    };
  },
  template: `
    <div>
      <div v-if="isLoggedIn === false">
        <div v-if="registerForm === true">
          <a
            href="#"
            id="switch-link"
            v-on:event.prevent
            v-on:click="registerForm = false"
          >
            Go to login
          </a>
          <form
            id="auth-form"
            v-on:submit.prevent="$emit('register', {username, password})"
          >
            <input
              type="text"
              id="auth-username"
              name="auth-username"
              v-model="username"
              placeholder="Username"
              required
            >
            <input
              type="password"
              id="auth-password"
              name="auth-password"
              v-model="password"
              placeholder="Password"
              required
            >
            <button type="submit" id="auth-btn">
              register
            </button>
          </form>
        </div>
        <div v-else>
          <a
            href="#"
            id="switch-link"
            v-on:event.prevent
            v-on:click="registerForm = true"
          >
            Go to register
          </a>
          <form
            id="auth-form"
            v-on:submit.prevent="$emit('login', {username, password})"
          >
            <input
              type="text"
              id="auth-username"
              name="auth-username"
              v-model="username"
              placeholder="Username"
              required
            >
            <input
              type="password"
              id="auth-password"
              name="auth-password"
              v-model="password"
              placeholder="Password"
              required
            >
            <button type="submit" id="auth-btn">login</button>
          </form>
        </div>
      </div>
      <div v-else>
        <a v-on:event.prevent href="#" id="switch-link" v-on:click="$emit('logout')">Logout</a>
      </div>
    </div>
  `,
};

const AddPlayerComponent = {
  name: "add-player",
  data() {
    return {
      name: "",
    };
  },
  template: `
    <form id="submit-player" v-on:submit.prevent="$emit('add-player', name)">
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
    <li :id="'player-' + player.id">
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
    <auth-user
      v-bind:isLoggedIn="this.isLoggedIn"
      v-on:login="loginUser"
      v-on:register="registerUser"
      v-on:logout="logoutUser"
    ></auth-user>
    <div v-if="isLoggedIn === true">
      <add-player
        v-on:add-player="addPlayer"
      ></add-player>
      <list-players
        v-bind:players="this.players"
        v-on:player-clicked="getPlayer"
      ></list-players>
      <show-player
        v-bind:player="this.selectedPlayer"
        v-on:delete-player="deletePlayer"
      ></show-player>
    </div>
    <request-status
      v-bind:requestStatus="this.reqStatus"
    ></request-status>
  </div>
  `,
  data() {
    return {
      baseURL: "http://localhost:3001/api/players",
      registerUrl: "http://localhost:3001/api/users",
      players: [],
      selectedPlayer: null,
      reqStatus: "",
      isLoggedIn: false,
      authorization: "",
    };
  },
  methods: {
    registerUser(data) {
      this.reqStatus = "Loading...";
      const encoded = btoa(`${data.username}:${data.password}`);

      fetch(this.registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encoded}`,
        },
      })
        .then((res) => {
          if (res.ok) this.loginUser(data);
          else this.reqStatus = "An error has occured!!!";
        })
        .catch(() => (this.reqStatus = "An error has occured!!!"));
    },
    loginUser(data) {
      this.authorization = btoa(`${data.username}:${data.password}`);
      this.reqStatus = "Loading...";

      fetch(this.baseURL, {
        headers: {
          Authorization: `Basic ${this.authorization}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.reqStatus = "";
          this.players = data;
          this.isLoggedIn = true;
        })
        .catch(() => {
          this.reqStatus = "An error has occured!!!";
          this.isLoggedIn = false;
          this.authorization = "";
        });
    },
    logoutUser() {
      this.authorization = "";
      this.isLoggedIn = false;
      this.players = [];
      this.selectedPlayer = null;
    },
    addPlayer(name) {
      if (!name || name == "") return;

      this.reqStatus = "Loading...";
      fetch(this.baseURL, {
        method: "POST",
        body: JSON.stringify({ name, isActive: false }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${this.authorization}`,
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
      fetch(this.baseURL, {
        headers: {
          Authorization: `Basic ${this.authorization}`,
        },
      })
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
      fetch(this.baseURL + `/${id}`, {
        headers: {
          Authorization: `Basic ${this.authorization}`,
        },
      })
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
      fetch(this.baseURL + `/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${this.authorization}`,
        },
      })
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
