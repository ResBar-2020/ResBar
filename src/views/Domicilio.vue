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
      <v-col cols="2">
        <v-switch
                v-model="showComplete"
                :label="idioma.views[0].labels.showAll"
                color="indigo darken-3"
                @change="changeLista"
                hide-details
        ></v-switch>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row>
        <v-col  v-for="(orden,index) in listaDomicilios" :key="index" v-show="filtro(index)">
          <template >
            <v-card  max-width="374" hover height="360" elevation="17">
              <v-banner
                elevation="6"
                single-line
                color="white--text"
                sticky
                :class="{'primary lighten-3': orden.domicilioEtapa===0,'primary':orden.domicilioEtapa===1,'primary darken-4':orden.domicilioEtapa===2}"
              >
                {{orden.domicilioEtapa===0?idioma.views[0].labels.state.todo:orden.domicilioEtapa===1?idioma.views[0].labels.state.inprocess:idioma.views[0].labels.state.complete}}
              </v-banner>
              <v-card class="overflow-y-auto pa-2 scroll-hide" height="260" >
                <h3>
                  {{ String(orden._id.substring(18, 24)) }}
                  {{ orden.cliente.nombreCompleto }}
                </h3>
                <div>
                  <v-chip class="ma-2 v-card--hover"  color="purple" outlined>
                    <v-icon left> mdi-label </v-icon> Costo: $ •
                    {{ orden.total + orden.costoEnvio  }}
                  </v-chip>
                  <div>{{idioma.views[0].labels.direction +':'+ orden.cliente.direccion }}</div>
                </div>
                <v-divider class="mx-2"></v-divider>
                <h3>{{idioma.views[0].labels.actions.title}}</h3>
                <div>
                  <v-chip-group active-class="deep-purple accent-4 white--text"  column>
                    <cobrar-orden :orden="orden" v-if="orden.cobrada==false" />
                    <agregar-productos-orden :orden="orden"/>
                    <modificar-orden :orden="orden"/>
                    <eliminar-orden :orden="orden"  />
                  </v-chip-group>
                </div>
              </v-card>
              <v-divider></v-divider>
              <v-card-actions>
                <v-footer absolute class="font-weight-medium">
                  <v-chip-group class="col">
                    <v-chip class="ma-2 " color="teal" text-color="white" @click="completarEtapa(orden)" :disabled="orden.domicilioEtapa===2" dark>
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
import { toastAlert } from "../store/modules/utilidades.js";
import CobrarOrden from "../components/ordenes/CobrarOrden";

export default {
  components: {ModificarOrden, AgregarProductosOrden, EliminarOrden, DetalleDomicilio, HeaderDashboard, CobrarOrden, },
  computed: {
    ...mapGetters(['ordenes','idiomas']),
  },
  data() {
    return {
      dialog: false,
      showComplete: false,
      searchDisplay: "",
      listaDomicilios: [],
      snackbar: {
        message: "domicilios",
        timout: 2000,
      },

    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(['getOrdenesDomicilio','getIdioma','modificarEtapaDomicilio']),
    /**
     * Buscar coincidencias acorde el filtro.
     * */
    filtro(valor_orden) {
      if (this.searchDisplay === "") return true;
      let cad = this.listaDomicilios[valor_orden]._id + this.listaDomicilios[valor_orden].cliente.nombreCompleto + this.listaDomicilios[valor_orden].cliente.direccion
            return cad.toUpperCase().indexOf(this.searchDisplay.toUpperCase()) >= 0;
    },
    /*  modificar el progreso de la orden a domicilio
    * (code smell detected xd)
    **/
   async completarEtapa(orden) {
     if(orden.domicilioEtapa===1 && !orden.cobrada){
       this.alerta('error', this.idiomas[0].views[0].alerts.unpaid);
     }else{
       orden.domicilioEtapa +=1; await this.modificarEtapaDomicilio(orden);
       this.changeLista();
       this.alerta('success',  this.idiomas[0].views[0].alerts.success);
     }
   },
    /*
    llenado de lista para filtrar las ordenes entregadas y las pendientes
     */
    async changeLista(){
         await this.getOrdenesDomicilio();
        if(!this.showComplete){
          this.listaDomicilios = this.ordenes.filter(orden => orden.domicilioEtapa!==2);
        }else{
           this.listaDomicilios =  this.ordenes;
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
    this.changeLista();
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