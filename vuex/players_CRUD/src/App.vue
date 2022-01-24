<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Players />
  <Remove />
  <Status />
</template>

<script>
import Players from "./components/Players.vue";
import Remove from "./components/Remove.vue";
import Status from "./components/Status.vue";

export default {
  name: "App",
  components: {
    Players,
    Remove,
    Status
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
