<template>
  <div>
    <h1>[Bitacoras]</h1>
    <v-btn color="info" @click="showMessage(snackbar)">mostrar snackbar</v-btn>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      snackbar: {
        message: "desde bitacoras",
        timout: 2000
      }
    };
  },
  methods: {
    ...mapMutations(["showMessage"])
  }
};
</script>