<template>
  <div>
    <v-container>
      <h1>Crear Nueva Orden</h1>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <ClienteForm />
        </v-col>

        <v-col cols="12" sm="8">
          <p>
           Aqui debe ir componente productos
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import ClienteForm from "../components/nuevaOrden/clienteForm.vue";

export default {
  name: "nuevaOrden",

  components: {
    ClienteForm,
  },
};
</script>