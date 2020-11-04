<template>
  <div >
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
body::-webkit-scrollbar{
  width: 1em;
}
body::-webkit-scrollbar-track{
  background: #000;
}
body::-webkit-scrollbar-thumb{
  background: rgb(145, 37, 155);
  border-radius: 5px;
}
body::-webkit-scrollbar-thumb:active{
  background: rgb(145, 37, 155);
}
</style>