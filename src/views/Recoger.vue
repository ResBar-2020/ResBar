<template>
  <div>
    <div v-for="(idioma) in idiomas" :key="idioma._id" >
    <header-dashboard :title="idioma.views[2].labels.title" :subtitle="idioma.views[2].labels.subtitle"></header-dashboard>
    <v-row>
      <v-col cols="4" offset="1" >
        <v-text-field :label="idioma.views[2].labels.search" v-model="searchDisplay"></v-text-field>
      </v-col>
      <v-col cols="4" offset="1">
        <router-link :to="{ name: 'nuevaOrden' }" style="text-decoration:none">
          <v-btn  elevation="13" outlined @click="showMessage(snackbar)" class="primary white--text my-3" >
            <v-icon>mdi-plus-circle-outline </v-icon>
          {{idioma.views[0].labels.new}}</v-btn>
        </router-link>
      </v-col>
      <v-col cols="2">
        <v-switch
            v-model="showComplete"
            :label="idioma.views[2].labels.showAll"
            color="indigo darken-3"
            @change="cambiarLista"
            hide-details
          ></v-switch>
      </v-col>
    </v-row>
    <v-container fluid> 
      <v-row>
        <v-col  v-for="(orden,index) in listaRecoger" :key="index" v-show="filtro(index)">
          <template >
            <v-card  max-width="374" hover height="360" elevation="17">
              <v-banner
                style="color: white;"
                elevation="6"
                single-line
                sticky
                :class="{'primary lighten-3': orden.entregada==false,'primary darken-4':orden.entregada==true}"
              >
                {{orden.entregada==false?idioma.views[2].labels.state.todo:idioma.views[2].labels.state.complete}}
              </v-banner>
              <v-card class="overflow-y-auto pa-2" height="260" >
                <h3>
                  {{String(orden._id.substring(18, 24))}}
                  {{ orden.cliente.nombreCompleto }}
                </h3>
                <div>
                  <v-chip class="ma-2 v-card--hover" color="purple" outlined>
                    <v-icon left> mdi-label </v-icon> {{idioma.views[2].labels.total}}: $ •
                    {{ orden.total}}
                  </v-chip>
                  <div>{{idioma.views[2].labels.timePrep}} :</div>
                  <div> {{orden.tiempoPreparacion}}</div>
                </div>
                <v-divider class="mx-2"></v-divider>
                <h3>{{idioma.views[2].labels.actions.title}}</h3>
                <div v-if="orden.entregada==false">
                  <v-chip-group active-class="deep-purple accent-4 white--text" column>
                   <cobrar-orden :orden="orden" v-if="orden.cobrada==false" />
                    <agregar-productos-orden :orden="orden"/>
                    <modificar-orden :orden="orden"/>
                    <eliminar-orden :orden="orden" />
                  </v-chip-group>
                </div>
                <div v-else>
                  <v-chip-group active-class="deep-purple accent-4 white--text" column>
                     <cobrar-orden :orden="orden" v-if="orden.cobrada==false" />
                    <v-btn :disabled="orden.cobrada" class="mr-2 text-center action" small fab color="deep-purple">
                      <v-icon>mdi-plus</v-icon></v-btn>
                    <v-btn :disabled="orden.cobrada" class="mr-2 text-center action" small fab color="pink">
                      <v-icon>mdi-clipboard</v-icon></v-btn>
                    <eliminar-orden :orden="orden" />
                </v-chip-group>
                </div>
              </v-card>
              <v-divider></v-divider> 
              <v-card-actions>
                <v-footer absolute class="font-weight-medium">
                  <v-chip-group>
                    <v-chip class="ma-2" color="teal" text-color="white" @click="completarEtapa(orden)" :disabled="orden.entregada==true" dark>
                      <v-avatar left>
                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                      {{idioma.views[2].labels.actions.complete}}</v-chip>
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
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
import DetalleRecoger from "../components/recoger/DetalleRecoger";
import EliminarOrden from "../components/ordenes/EliminarOrden";
import ModificarOrden from "../components/ordenes/ModificarOrden";
import AgregarProductosOrden from "../components/ordenes/AgregarProductos";
import { toastAlert } from "../store/modules/utilidades.js";
import CobrarOrden from "../components/ordenes/CobrarOrden";

export default {
  components: {EliminarOrden, ModificarOrden, AgregarProductosOrden, DetalleRecoger, HeaderDashboard,
    CobrarOrden},
  computed: {
    ...mapGetters(['ordenesRecoger', 'ordenesRecogerPendientes','idiomas']),
  },
  data() {
    return {
      dialog: false,
      showComplete: false,
      searchDisplay: "",
      listaRecoger: [],
      snackbar: {
        message: "recoger",
        timout: 2000,
      },

    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(['getOrdenesRecoger','getIdioma','modificarEtapaRecoger']),

    filtro(valor_orden) {
      if (this.searchDisplay === "") return true;
          let array = (
          this.listaRecoger[valor_orden].id + 
          this.listaRecoger[valor_orden].cliente.nombreCompleto
          ).toUpperCase();
          return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;        
    },
  
    async completarEtapa(orden) {
     if(orden.entregada===false && !orden.cobrada){
       this.alerta('error', this.idiomas[0].views[0].alerts.unpaid);
     }else{
       orden.entregada=true; 
       await this.modificarEtapaRecoger(orden);
       this.cambiarLista();
       this.alerta('success',  this.idiomas[0].views[0].alerts.success);
     }
    },

    async cambiarLista(){
        await this.getOrdenesRecoger();
        if(!this.showComplete){
          this.listaRecoger = this.ordenesRecoger.filter(orden => orden.entregada===false);
        }else{
           this.listaRecoger =  this.ordenesRecoger;
        }
    },
      /**
     * Alerta superior (toast)
     * @param icono string del nombre del icono
     * @param titulo mensaje a mostrar en la alerta
     */
    alerta(icono, titulo){
      toastAlert.fire({
        icon: icono,
        title: titulo
      });
    }
  },

  created() {
    this.cambiarLista();
    this.getIdioma();
  },
};
</script>

<style scoped>
.scroll-hide{
  overflow-y: scroll;
}
.scroll-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scroll-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>