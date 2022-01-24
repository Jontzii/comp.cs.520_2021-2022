<template>
  <form @submit.prevent="add">
    <input
      id="input_player"
      type="text"
      placeholder="name-of-the-player"
      :value="current_player"
    />
    <button id="add_btn">Add Player</button>
  </form>

  <ul id="playerlist">
    <li v-for="(player, index) in state.playerlist" :key="index">
      {{ player.name }}
      <button @click="remove(index)">🗑️</button>
    </li>
  </ul>
</template>
<script>
import Constant from "../Constant";
import { reactive, computed } from "vue";
import { mapActions } from "vuex";
import { useStore } from "vuex";

export default {
  setup() {
    //TODO
  },
  methods: {
    //TODO
  },
};
</script>
