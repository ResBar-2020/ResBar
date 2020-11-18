<template>
  <v-app>
    <template>
      <v-container class="grey lighten-5 my-2">
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="11">
            <div mr-3>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="6" md="1">
            <v-btn depressed color="primary"> Agregar </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!-- <v-container> -->
    <v-div app dark class="primary text-lg-center rounded-t-xl my-2">
      <v-btn text rounded color="white">Entradas</v-btn>
      <v-btn text rounded color="white">Platos</v-btn>
      <v-btn text rounded color="white">Bebidas</v-btn>
      <v-btn text rounded color="white">Postres</v-btn>
    </v-div>

    <v-simple-table id="myTable">
      <template v-slot:default>
        <thead class="primary">
          <tr>
            <th id="tituloTabla" class="text-center white--text">Id</th>
            <th id="tituloTabla" class="text-center white--text">Nombre</th>
            <th id="tituloTabla" class="text-center white--text">Precio</th>
            <th id="tituloTabla" class="text-center white--text">Categoria</th>
            <th id="tituloTabla" class="text-center white--text">Acciones</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <td>1</td>
            <td>Deditos de Queso</td>
            <td>$ 1.5</td>
            <td>Entradas</td>
            <td class="mx-2">
                <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }" >
                  <v-btn color="blue" dark v-bind="attrs" v-on="on" class="mr-2" small>
                    <v-icon dark> mdi-pencil </v-icon>
                  </v-btn>
                </template>
                <span>Modificar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="red" dark v-bind="attrs" v-on="on" small>
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>
                </template>
                <span>Borrar</span>
              </v-tooltip>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Nachos</td>
            <td>$ 2.0</td>
            <td>Entradas</td>

            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="blue" dark v-bind="attrs" v-on="on" class="mr-2" small>
                    <v-icon dark> mdi-pencil </v-icon>
                  </v-btn>
                </template>
                <span>Modificar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="red" dark v-bind="attrs" v-on="on" small>
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>
                </template>
                <span>Borrar</span>
              </v-tooltip>
            </td>
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
  name:"AdministrarProductos",
  data() {
    return {
      search:""
    };
  },
  methods: {},
};
</script>