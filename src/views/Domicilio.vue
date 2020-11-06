<template>
  <div >
    <div v-for="(idioma) in idiomas" :key="idioma._id" >
    <header-dashboard :title="idioma.views[0].labels.title" :subtitle="idioma.views[0].labels.subtitle"></header-dashboard>
    <v-row>
      <v-col cols="4" offset="1" >
        <v-text-field :label="idioma.views[0].labels.search" v-model="searchDisplay"></v-text-field>
      </v-col>
      <v-col cols="4" offset="1">
        <v-btn  elevation="13" outlined @click="showMessage(snackbar)" class="primary white--text my-3" ><v-icon>mdi-plus-circle-outline </v-icon>
          {{idioma.views[0].labels.new}}</v-btn>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row>
        <v-col  v-for="(orden,index) in ordenes" :key="index" v-show="filtro(index)">
          <template >
            <v-card :loading="loading" max-width="374" hover height="360" elevation="17">
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
                :class="{'red': orden.domicilioEtapa===0,'blue':orden.domicilioEtapa===1,'green':orden.domicilioEtapa===2}"
              >
                {{orden.domicilioEtapa===0?idioma.views[0].labels.state.todo:orden.domicilioEtapa===1?idioma.views[0].labels.state.inprocess:idioma.views[0].labels.state.complete}}
              </v-banner>
              <v-card class="overflow-y-auto pa-2" height="260" >
                <h3>
                  {{ String(orden._id.substring(18, 24)) }}
                  {{ orden.cliente.nombreCompleto }}
                </h3>
                <div>
                  <v-chip class="ma-2 v-card--hover" color="purple" outlined>
                    <v-icon left> mdi-label </v-icon> Costo: $ •
                    {{ orden.total + orden.costoEnvio }}
                  </v-chip>
                  <div>{{idioma.views[0].labels.direction +':'+ orden.cliente.direccion }}</div>
                </div>
                <v-divider class="mx-2"></v-divider>
                <h3>{{idioma.views[0].labels.actions.title}}</h3>
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
                  <v-chip-group class="col">
                    <v-chip class="ma-2 " color="teal" text-color="white" @click="completeEtapa(orden)" :disabled="orden.domicilioEtapa===2" dark>
                      <v-avatar left>
                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                      {{idioma.views[0].labels.actions.complete}}</v-chip>
                    <detalle-domicilio :orden="orden"/>
                  </v-chip-group>
                </v-footer>
              </v-card-actions>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
    </div>
  </div>
</template>


<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
import DetalleDomicilio from "../components/domicilio/DetalleDomicilio";
import EliminarOrden from "../components/ordenes/EliminarOrden";
import AgregarProductosOrden from "../components/ordenes/AgregarProductos";
import ModificarOrden from "../components/ordenes/ModificarOrden";
export default {
  components: {ModificarOrden, AgregarProductosOrden, EliminarOrden, DetalleDomicilio, HeaderDashboard},
  computed: {
    ...mapGetters(['ordenes','idiomas']),
  },
  data() {
    return {
      show: false,
      loading: false,
      dialog: false,
      searchDisplay: "",
      items: [5,10,15],
      snackbar: {
        message: "domicilios",
        timout: 2000,
      },

    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(['getOrdenesDomicilio','getIdioma']),
    filtro(valor_orden) {
       if (this.searchDisplay == "")
                return true;
                var cad = this.ordenes[valor_orden]._id +
                this.ordenes[valor_orden].cliente.nombreCompleto +
                this.ordenes[valor_orden].cliente.direccion 
            cad = cad.toUpperCase();
            if (cad.indexOf(this.searchDisplay.toUpperCase()) >= 0) return true;
            else return false;
    },
    completeEtapa(orden) {
        this.loading = true;
        setTimeout(() => (this.loading = false), 1500);
        switch (orden.domicilioEtapa) {
          case 0:
            orden.domicilioEtapa = 1;
            break;
          case 1:
              orden.domicilioEtapa = 2;
              break;
        }
    },
  },

  created() {
    this.getIdioma();
    this.getOrdenesDomicilio();
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