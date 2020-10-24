<template>
  <div>
    <header-dashboard title="Resbar Domicilios" subtitle="Ordenes a Domicilio"></header-dashboard>
    <v-container fluid>
      <v-row>
        <v-col  v-for="orden in ordenes" :key="orden.id">
          <template>
            <v-card :loading="loading" max-width="374" hover height="360">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-banner
                v-if="orden.domicilioEtapa===0"
                elevation="6"
                single-line
                sticky
                color="red"
              >
                Pendiente
              </v-banner>
              <v-banner
                      v-if="orden.domicilioEtapa===1"
                      elevation="6"
                      single-line
                      sticky
                      color="blue"
              >
                En proceso
              </v-banner>
              <v-banner
                      v-if="orden.domicilioEtapa===2"
                      elevation="6"
                      single-line
                      sticky
                      color="green"
              >
                Entregada
              </v-banner>

              <v-card class="overflow-y-auto pa-2" height="260">
                <h3>
                  {{ String(orden.id.substring(18, 24)) }}
                  {{ orden.cliente.nombreCompleto }}
                </h3>
                <div>
                  <v-chip class="ma-2 v-card--hover" color="purple" outlined>
                    <v-icon left> mdi-label </v-icon> Costo: $ •
                    {{ orden.total + orden.costoEnvio }}
                  </v-chip>
                  <div>Dirección: {{ orden.cliente.direccion }}</div>
                </div>
                <v-divider class="mx-2"></v-divider>
                <h3>Acciones</h3>
                <div>
                  <v-chip-group
                    active-class="deep-purple accent-4 white--text"
                    column
                  >
                    <v-chip> <v-icon> mdi-coin</v-icon>Cobrar</v-chip>
                    <v-chip> <v-icon> mdi-minus-circle-outline</v-icon>Eliminar</v-chip>
                    <v-chip><v-icon> mdi-pencil-circle-outline</v-icon>Modificar</v-chip>
                    <v-chip><v-icon>mdi-plus-circle-outline</v-icon>Agregar</v-chip>
                  </v-chip-group>
                </div>
              </v-card>
              <v-divider></v-divider>
              <v-card-actions>
                <v-footer absolute class="font-weight-medium">
                  <v-chip-group>
                    <v-chip
                      class="ma-2"
                      color="teal"
                      text-color="white"
                      @click="completeEtapa(orden)"
                    >
                      <v-avatar left>
                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                      Completar</v-chip
                    >
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
</template>


<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
import DetalleDomicilio from "../components/domicilio/DetalleDomicilio";
export default {
  components: {DetalleDomicilio, HeaderDashboard},
  computed: {
    ...mapGetters(["ordenes"]),
  },
  data() {
    return {
      show: false,
      loading: false,
      dialog: false,

    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(["getOrdenesDomicilio"]),
    completeEtapa(orden) {
        this.loading = true;
        setTimeout(() => (this.loading = false), 1500);
        switch (orden.domicilioEtapa) {
          case 0:
            orden.domicilioEtapa =1;
            break;
          case 1:
              orden.domicilioEtapa =2;
              break;
        }
    },
  },

  created() {
    this.getOrdenesDomicilio();
  },
};
</script>