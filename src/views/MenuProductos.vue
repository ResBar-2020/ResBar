<template>
  <v-app>
  <v-container class="lighten-5 my-2">
    <template>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar..."
          single-line
          hide-details
        ></v-text-field>
    </template>
  </v-container>

    <v-container>
    <template>
      <v-card>
        <v-tabs v-model="catSelected" background-color="primary" dark>
          <v-tab v-for="categoria in allCategorias" :key="categoria.nombre">
            {{ categoria.nombre }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="catSelected">
          <v-tab-item
            v-for="categoria in allCategorias"
            :key="categoria.nombre"
          >
            <v-card flat>
              <v-simple-table id="myTable">
                <template v-slot:default>
                  <thead class="primary">
                    <tr>
                      <th id="tituloTabla" class="text-center white--text">
                        Nombre
                      </th>
                      <th id="tituloTabla" class="text-center white--text">
                        Precio
                      </th>
                      <th id="tituloTabla" class="text-center white--text">
                        Categoria
                      </th>
                      <th id="tituloTabla" class="text-center white--text">
                        Preparado
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-center" v-if="productos">
                    <tr
                      v-for="(producto, index) in allProductos"
                      :key="index"
                      @click="productoSelected = producto"
                      v-show="
                        filtroCategoria(producto.categoria.nombre) &&
                        buscar(index)
                      "
                    >
                      <td>{{ producto.nombre }}</td>
                      <td>$ {{ producto.precio }}</td>
                      <td>{{ producto.categoria.nombre }}</td>
                      <td>{{ producto.preparado ? "si" : "no" }}</td>

                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
   </v-container>
  </v-app>
</template>

 <!-- </v-container> -->


<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "AdministrarProductos",
  data() {
    return {
      search: "",
      modalEditarProducto: false,
      modalEliminarProducto: false,
      // categorias: ["Entrada", "Plato", "Bebida", "Postre"],
      productoSelected: {},
      nuevoProducto: {},
      categoriaSelected: "",
      modalNuevoProducto: false,
      esPreparado: false,
      listaDeCategorias: [],
      catSelected: "TODOS",
      snackbar: {
        message: "",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(["getProductos", "getCategorias"]),

    showSnackbar(message) {
      this.selectedUser = {};
      this.snackbar.message = message;
      this.showMessage(this.snackbar);
    },

    buscar: function (x) {
      return this.search.trim() != ""
        ? (this.allProductos[x].nombre + this.allProductos[x].precio)
            .toUpperCase()
            .indexOf(this.search.toUpperCase()) >= 0
          ? true
          : false
        : true;
    },
    filtroCategoria: function (nombreCategoria) {
      if (nombreCategoria === this.allCategorias[this.catSelected].nombre) {
        return true;
      } else {
        return false;
      }
    },
  },

  created() {
    this.getProductos();
    this.getCategorias();
    console.log(this.$vuetify.theme.dark);
  },
  computed: {
    ...mapState(["productos", "categorias"]),
    ...mapGetters(["allProductos", "allCategorias"]),
  },
  watch: {
    //Probando el dark mode para aplicar distinto css
    status(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue === "success") {
        this.complex = {
          deep: "some deep object",
        };
      }
    },
  },
};
</script>

<style scoped>
.prevDrag {
  -webkit-user-drag: none;
  -webkit-app-region: no-drag;
  cursor: pointer;
}
</style>