<template>
  <div >
    <component :is="layout"></component>
    <v-snackbar
    right
    v-model="snackbar.show" 
    :timeout="snackbar.timeout">{{ snackbar.message }}</v-snackbar>
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
      if (rol.includes("ADMIN")) {
        this.layout = "layout-gerente";
      } else {
        this.layout = "layout-mesero";
      }
    }

  },
  computed: {
    ...mapState(["snackbar"])
  }
};
</script>
<style>
.fondoBG{
  background: rgb(244, 247, 246);
}
.fondo{
  background: rgb(216, 208, 196);
}
.action{
  color: #fff;
  transition: 0.5s;
}
.action:hover {
  transform: scale(1.1) rotateZ(360deg);
}
</style>