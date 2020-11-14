<template>
  <div>
    <h1>[Productos]</h1>
    <v-btn color="info" @click="showMessage(snackbar)">mostrar snackbar</v-btn>
    <div>
    <AdministrarProductos></AdministrarProductos>
    </div>
 
  </div>
</template>


<script>


import { mapMutations } from "vuex";
import AdministrarProductos from "../components/administrarProductos/AdministrarProductos"

export default {
  data() {
    return {
      snackbar: {
        message: "desde productos",
        timout: 2000
      }
    };
  },
  components: {
   AdministrarProductos
  },
  methods: {
    ...mapMutations(["showMessage"])
  }
};
</script>