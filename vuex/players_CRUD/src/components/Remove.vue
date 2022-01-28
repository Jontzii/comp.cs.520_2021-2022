<template>
  <div>
    <button id="rm_last" @click="rmLast">Remove the Last</button>
    <button id="rm_delay" @click="rmDelay">Remove with Delay</button>
  </div>
</template>

<script>
import Constant from "../Constant";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      rmLast: Constant.REMOVE_LAST,
      rmDelay: Constant.REMOVE_DELAY
    })
  }
};
</script>
