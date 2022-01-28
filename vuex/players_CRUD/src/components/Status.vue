<template>
  <div id="status" class="status">
    <span v-if="state.notifications.length === 0"></span>
    <h2 v-else>Alert</h2>
    <div
      class="notification"
      v-for="(info, key) in state.notifications"
      :key="key"
    >
      {{ info }}
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const state = reactive(store.state);
    return { state };
  }
};
</script>
