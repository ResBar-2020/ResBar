<template>
  <div>
    <header-dashboard
        title="RESBAR PRODUCTOS"
        subtitle="TODOS LOS PRODUCTOS"
      ></header-dashboard>
<br>    <v-btn color="info" @click="showMessage(snackbar)">mostrar snackbar</v-btn>
    <div>
    <AdministrarProductos></AdministrarProductos>
    
    </div>
 
  </div>
</template>


<script>


import { mapMutations, mapGetters, mapActions  } from "vuex";
import AdministrarProductos from "../components/administrarProductos/AdministrarProductos";
import HeaderDashboard from "../components/headerDashboard";

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
   AdministrarProductos,
   HeaderDashboard
  },
  methods: {
    ...mapActions(["getOrdenes", "getIdioma"]),
    ...mapMutations(["showMessage"])
  },
  computed:{
          ...mapGetters(["idiomas"]),
  },
  created(){
  }
};
</script>