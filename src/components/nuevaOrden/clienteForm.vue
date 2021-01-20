<template>
  <div>
    <v-container>
      <section>
        <v-container id="fila1" class="row align-baseline">
          <v-row>
            <v-col cols="8">
              <v-text-field label="Cliente" disabled></v-text-field>
            </v-col>
            <v-col cols="2" class="ml-8">
              <seleccionar-cliente></seleccionar-cliente>
            </v-col>
          </v-row>
        </v-container>
        <v-row>
        <v-radio-group
                        v-model="ordenLocal"
                        mandatory
                        @change="asignarTipo()"
                        class="ml-3" row>
                        <v-radio label="Mesa" value="MESA"></v-radio>
                        <v-radio label="Domicilio" value="DOMICILIO"></v-radio>
                        <v-radio label="Recoger" value="RECOGER"></v-radio>
                      </v-radio-group>
                    </v-row>
        <v-text-field v-if="!domicilio&&!recoger" label="Mesero"></v-text-field>
        <v-text-field
          v-if="!domicilio&&!recoger"
          label="Mesa"
          type="number"
        ></v-text-field>
        <v-textarea
          v-show="domicilio||!recoger"
          outlined
          name="input-7-4"
          label="Dirección"
          value=""
        ></v-textarea>
        <v-textarea
          outlined
          name="input-7-4"
          label="Observaciones"
          value=""
        ></v-textarea>
        <v-row>
          <v-col>
            <v-btn class="white--text" block color="grey"> Cancelar </v-btn>
          </v-col>
          <v-col>
            <v-btn class="white--text" block color="indigo">
              Verificar
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
import SeleccionarCliente from "../nuevaOrden/SeleccionarCliente";
export default {
  components: { SeleccionarCliente },
  name: "clienteForm",
  props: {},
  data() {
    return {
      ordenLocal: {},
      domicilio: false,
      recoger: false,
      search: "",
    };
  },
  created: function () {
    this.asignarTipo();
  },
  methods: {
    //asigna un valor booleano a la variable mesa que nos sirve para mostrar o no mostrar el input para mesa
    asignarTipo() {
      switch (this.ordenLocal) {
        case "DOMICILIO":
          this.domicilio= true;
          this.recoger= false;
          break;
        case "MESA":
          this.domicilio = false;
          this.recoger= false;
          break;
        case "RECOGER":
          this.domicilio= false;
          this.recoger= true;
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
  max-height: 75px;
}
</style>
