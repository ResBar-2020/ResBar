<template>
  <div>
    <component :is="layout"></component>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">{{ snackbar.message }}</v-snackbar>
  </div>
</template>

<script>
import LayoutLogin from "./components/layouts/Layout-login";
import LayoutGerente from "./components/layouts/Layout-gerente";
import LayoutMesero from "./components/layouts/Layout-mesero";
import { mapState } from "vuex";

export default {
  components: { LayoutLogin, LayoutGerente, LayoutMesero },

  data: () => ({
    layout: "layout-login"
  }),
  created() {
    let rol = localStorage.getItem("rol");
    if (rol) {
      if (rol.includes("admin")) {
        this.layout = "layout-gerente";
      } else {
        this.layout = "layout-mesero";
      }
      this.layout = "layout-mesero";
    }

  },
  computed: {
    ...mapState(["snackbar"])
  }
};
</script>