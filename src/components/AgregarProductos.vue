<template>
  <v-app>
    <!-- <v-container> -->
    <v-div app dark class="primary text-lg-center rounded-t-xl my-2">
      <v-btn text rounded color="white">Entradas</v-btn>
      <v-btn text rounded color="white">Platos</v-btn>
      <v-btn text rounded color="white">Bebidas</v-btn>
      <v-btn text rounded color="white">Postres</v-btn>
    </v-div>

    <v-simple-table id="myTable">
      <template v-slot:default>
        <thead class="primary ">
          <tr>
            <th id="tituloTabla" class="text-center white--text">
              Nombre
            </th>
            <th id="tituloTabla" class="text-center white--text">
              Precio
            </th>
            <th id="tituloTabla" class="text-center white--text">
              Cantidad
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <td>Deditos de Queso</td>
            <td>$ 1.5</td>
            <td>
              <v-btn class="mx-2" fab dark small color="primary">
                <v-icon dark>
                  mdi-minus
                </v-icon>
              </v-btn>
              5
              <v-btn class="mx-2" fab dark small color="primary">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </td>
          </tr>
          <tr>
            <td>Nachos</td>
            <td>$ 2.0</td>
            <td><v-btn class="mx-2" fab dark small color="primary">
                <v-icon dark>
                  mdi-minus
                </v-icon>
              </v-btn>
              5
              <v-btn class="mx-2" fab dark small color="primary">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- </v-container> -->
  </v-app>
</template>

<script>
// import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
