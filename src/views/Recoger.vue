<template>
  <div>
    <header-dashboard 
      title="Resbar Recoger"
      subtitle="Ordenes a Recoger">
    </header-dashboard>
    <v-row>
      <v-col cols="4" offset="1">
        <v-text-field label="Buscar" v-model="searchDisplay"></v-text-field>
      </v-col>
      <v-col cols="4" offset="1">
          <router-link :to="{ name: 'nuevaOrden' }" style="text-decoration:none">
            <v-btn
              class="primary white--text my-3"
            >
              <v-icon>mdi-plus-circle-outline </v-icon> Nueva Orden</v-btn
            >
          </router-link>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row>
        <v-col  v-for="(orden,index) in ordenesRecoger" :key="index" v-show="filtro(index)">
          <template >
            <v-card :loading="loading"  max-width="374" hover height="360" elevation="17">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-banner
                style="color: white;"
                elevation="6"
                single-line
                sticky
                :class="{'red': orden.entregada==false,'green':orden.entregada==true}"
              >
                {{orden.entregada==false?'PENDIENTE':'ENTREGADA'}}
              </v-banner>
              <v-card class="overflow-y-auto pa-2" height="260" >
                <h3>
                  {{String(orden._id.substring(18, 24))}}
                  {{ orden.cliente.nombreCompleto }}
                </h3>
                <div>
                  <v-chip class="ma-2 v-card--hover" color="purple" outlined>
                    <v-icon left> mdi-label </v-icon> Costo: $ •
                    {{ orden.total}}
                  </v-chip>
                  <div>Tiempo de preparacion:</div>
                  <div> {{ orden.cliente.tiempoPreparacion }}</div>
                </div>
                <v-divider class="mx-2"></v-divider>
                <h3>Acciones</h3>
                <div>
                  <v-chip-group active-class="deep-purple accent-4 white--text" column>
                    <v-btn class="mr-2 text-center action" small fab color="deep-purple" @click="showMessage(snackbar)"><v-icon> mdi-coin</v-icon></v-btn>
                    <agregar-productos-orden :orden="orden"/>
                    <modificar-orden :orden="orden"/>
                    <eliminar-orden :orden="orden" />
                  </v-chip-group>
                </div>
              </v-card>
              <v-divider></v-divider> 
              <v-card-actions>
                <v-footer absolute class="font-weight-medium">
                  <v-chip-group>
                    <v-chip class="ma-2" color="teal" text-color="white" @click="completeEtapa(orden)" :disabled="orden.entregada==true" dark>
                      <v-avatar left>
                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                      Completar</v-chip>
                    <detalle-recoger :orden="orden"/>
                  </v-chip-group>
                </v-footer>
              </v-card-actions>           
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
import DetalleRecoger from "../components/recoger/DetalleRecoger";
import EliminarOrden from "../components/ordenes/EliminarOrden";
import ModificarOrden from "../components/ordenes/ModificarOrden";
import AgregarProductosOrden from "../components/ordenes/AgregarProductos";
export default {
  components: {EliminarOrden, ModificarOrden, AgregarProductosOrden, DetalleRecoger, HeaderDashboard},
  computed: {
    ...mapGetters(['ordenesRecoger']),
  },
  data() {
    return {
      show: false,
      loading: false,
      dialog: false,
      searchDisplay: "",
      items: [5,10,15],
      snackbar: {
        message: "recoger",
        timout: 2000,
      },

    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(['getOrdenesRecoger']),
    filtro(valor_orden) {
      if (this.searchDisplay === "") return true;
      let array = (this.ordenes[valor_orden].id + this.ordenes[valor_orden].cliente.nombreCompleto).toUpperCase();
      return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
    },
    completeEtapa(orden) {
        this.loading = true;
        setTimeout(() => (this.loading = false), 1500);
          orden.entregada=true;
    },
  },

  created() {
    this.getOrdenesRecoger();
  },
};
</script>

<style scoped>
  .action {
    color: #fff;
    transition: 0.5s;
  }
  .action:hover {
    transform: scale(1.1) rotateZ(360deg);
  }
</style>