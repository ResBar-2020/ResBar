<template>
  <div>
    <v-container>
        <h1>Crear Nueva Orden</h1>
    </v-container>
    <v-container>
      <section>
        <v-container class="row align-baseline">
          <v-text-field label="Cliente" disabled></v-text-field>
          <v-btn class="ml-3" depressed small color="primary">+</v-btn>
        </v-container>
        <v-text-field label="Mesero"></v-text-field>
        <v-switch label="A domicilio"></v-switch>
        <v-text-field label="Mesa" type="number"></v-text-field>
        <v-textarea
          outlined
          name="input-7-4"
          label="Observaciones"
          value=""
        ></v-textarea>
      </section>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "nuevaOrden",
  props: {},
};
</script>
<style scoped>
</style>