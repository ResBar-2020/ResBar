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
        <v-switch v-model="domicilio" label="A domicilio"></v-switch>
        <v-text-field v-if="!domicilio" label="Mesero"></v-text-field>
        <v-text-field
          v-if="!domicilio"
          label="Mesa"
          type="number"
        ></v-text-field>
        <v-textarea
          v-show="domicilio"
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
      domicilio: false,
      search: "",
    };
  },
};
</script>
<style>
#fila1 {
  max-height: 75px;
}
</style>
