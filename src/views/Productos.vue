<template>
  <div>
    <header-dashboard
      title="RESBAR PRODUCTOS"
      subtitle="TODOS LOS PRODUCTOS"
    ></header-dashboard>
    <v-container elevation="10" outlined>
      <AdministrarProductos></AdministrarProductos>
    </v-container>
  </div>
</template>


<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import AdministrarProductos from "../components/administrarProductos/AdministrarProductos";
import HeaderDashboard from "../components/headerDashboard";

export default {
  data() {
    return {
      snackbar: {
        message: "desde productos",
        timout: 2000,
      },
    };
  },
  components: {
    AdministrarProductos,
    HeaderDashboard,
  },
  methods: {
    ...mapActions(["getIdioma", "addProduct"]),
    ...mapMutations(["showMessage"]),



  },
  computed: {
    ...mapGetters(["idiomas"]),
  },
  created() {},
};
</script>

<style scoped>

</style>