<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div id="fila1">
          <seleccionar-cliente></seleccionar-cliente>
        </div>
          <v-text-field label="Cliente" v-model="clienteSeleccionadoNombre" disabled></v-text-field>
          <v-radio-group
                    v-model="ordenLocal"
                    mandatory
                    @change="asignarTipo()"
                    class="ml-3" row>
                    <v-radio label="Mesa" value="MESA"></v-radio>
                    <v-radio label="Domicilio" value="DOMICILIO"></v-radio>
                    <v-radio label="Recoger" value="RECOGER"></v-radio>
                    </v-radio-group>
        <v-text-field v-if="!domicilio&&!recoger" label="Mesero" v-model="newOrden.mesero"></v-text-field>
        <v-text-field
          v-if="!domicilio&&!recoger"
          label="Mesa"
          type="number"
          v-model="newOrden.mesa"
        ></v-text-field>
        <v-textarea
        disabled
        rows="1"
          v-show="domicilio"
          outlined
          name="input-7-4"
          label="Dirección"
          v-model="clienteSeleccionadoDireccion"
        ></v-textarea>
        <v-textarea
        rows="1"
          outlined
          name="input-7-4"
          label="Observaciones"
          value=""
          v-model="newOrden.observacion"
        ></v-textarea>
        <v-row>
          <v-col>
            <v-btn class="white--text" block color="grey"
            @click="redireccionarAOrdenes()"
            > Cancelar </v-btn>
          </v-col>
          <v-col>
            <v-btn class="white--text" block color="indigo" @click="guardarOrden()" >
              Crear Orden
            </v-btn>
          </v-col>
        </v-row>   
      </v-col>
      <v-col>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import SeleccionarCliente from "../nuevaOrden/SeleccionarCliente";
export default {
  components: { SeleccionarCliente },
  name: "clienteForm",
  props: {},
  data() {
    return {
      selectedOrden:{},
      newOrden:{
            fecha: null,
            mesero: '',
            tipo: '',
            domicilioEtapa: 0,
            mesa: '',
            cliente: {},
            cobrada: 'false',
            entregada: 'false',
            observacion: '',
            tiempoPreparacion: null,
            detalleOrden: {},
            subtotal: null,
            propina: null,
            costoEnvio: 0,
            total: null
      },
      ordenLocal: {},
      domicilio: false,
      recoger: false,
      search: "",
      snackbar: {
        message: "",
        timout: 2000,
      },
    };
  },
  created: function () {
    this.getParametros();
    this.asignarTipo();
  },
  computed: {
    ...mapGetters(["parametros"]),
    ...mapState(["nuevaOrden"]),
    clienteSeleccionadoNombre: {
      get() {
        return this.$store.state.clienteSeleccionado.nombreCompleto;
      },
      set(value) {
        this.$store.commit('seleccionarClienteAction', value);
      },
    },
    clienteSeleccionadoDireccion: {
      get() {
        return this.$store.state.clienteSeleccionado.direccion;
      },
      set(value) {
        this.$store.commit('seleccionarClienteAction', value);
      },
    },
  },
  methods: {
     ...mapMutations(["setOrdenes", "showMessage","crearNuevaOrden"]),
    ...mapActions(["getOrdenes","addOrden", "crearNuevaOrdenAction", "getParametros"]),
    
    redireccionarAOrdenes() {
            window.location.href = '../../views/Ordenes';
        },

    getSelectedOrden(orden) {
      this.selectedOrden = orden;
    },

    guardarOrden() {
            this.newOrden.fecha = new Date().toISOString();
            this.newOrden.tiempoPreparacion = new Date().toISOString();
            this.newOrden.cliente = this.$store.state.clienteSeleccionado;
            this.newOrden.detalleOrden = this.$store.state.detalleOrden;
            this.newOrden.subtotal = this.$store.state.subtotal;
            this.newOrden.propina=parseFloat((this.$store.state.subtotal * this.factorPropina()).toFixed(2));            
            if (this.newOrden.tipo=="MESA" || this.newOrden.tipo=="RECOGER") {
                this.newOrden.total=this.$store.state.subtotal + this.newOrden.propina;              
            } else {
                        this.newOrden.total=this.$store.state.subtotal + this.newOrden.propina + this.parametros[10].valor;
            }
             this.$store.state.nuevaOrden=this.newOrden;
             if (JSON.stringify(this.newOrden.detalleOrden) != "{}") {
               this.addOrden(this.newOrden);
               this.showSnackbar("Orden creada con éxito");
               this.redireccionarAOrdenes();
      }else{
        this.showSnackbar("La orden no contiene productos");
      }
    },
    showSnackbar(message) {
      this.selectedCategoria = {};
      this.snackbar.message = message;
      this.showMessage(this.snackbar);
    },
     factorPropina() {
            let valor = this.parametros[8].valor;
            try {
                valor = valor / 100;
                return parseFloat(valor);
            } catch (error) {
                console.error(error);
            }
        },
    //asigna un valor booleano a la variable mesa que nos sirve para mostrar o no mostrar el input para mesa
    asignarTipo() {
      switch (this.ordenLocal) {
        case "DOMICILIO":
          this.domicilio= true;
          this.recoger= false;
          this.newOrden.tipo="DOMICILIO"
          this.newOrden.costoEnvio= this.parametros[10].valor
          break;
        case "MESA":
          this.domicilio = false;
          this.recoger= false;
          this.newOrden.tipo="MESA"
          break;
        case "RECOGER":
          this.domicilio= false;
          this.recoger= true;
          this.newOrden.tipo="RECOGER"
          break;
        default:
          console.log("tipo desconocido");
      }
    },
  },  
};
</script>
<style>
#fila1 {
  max-height: 50px;
}
</style>