<template>
  <v-app>
      <v-container class="lighten-5 my-2">
        <v-row no-gutters justify="center">
          <v-col cols="5">
            <div mr-3>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar producto"
                single-line
                hide-details
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-container>
<v-container>
<v-card elevation="0">
    <v-tabs
    class="mb-1 rounded-t-xl"
      hide-slider
      active-class="border"
      centered
      v-model="catSelected"
      background-color="primary"
      dark
      >
     <v-tab
        v-for="categoria in allCategorias"
        :key="categoria.nombre"
        >
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
            <th id="tituloTabla" class="text-center white--text">Nombre</th>
            <th id="tituloTabla" class="text-center white--text">Precio</th>
            <th id="tituloTabla" class="text-center white--text">Cantidad</th>
          </tr>
        </thead>
        <tbody class="text-center" v-if="productos">
          <tr
            v-for="(producto, index) in allProductos"
            :key="index"
            @click="productoSelected = producto"
            v-show="filtroCategoria(producto.categoria.nombre) && buscar(index)"
          >
            <td>{{ producto.nombre }}</td>
            <td>$ {{ producto.precio }}</td>
            <td>
                  <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="primary">
              <v-icon dark>mdi-minus</v-icon>
              </v-btn>
              <input class="inputN" type="number" value="0" min="0" max="99" step="1">
              <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="primary">
              <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </td>            
          </tr>
        </tbody>
      </template>
    </v-simple-table>        
    </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</v-container>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "AdministrarProductos",
  data() {
    return {
      search: "",
      productoSelected: {},
      producto:{

      },
      catSelected: 'TODOS', 
    };
  },
  methods: {
    ...mapActions([
      "getProductos",
      "getCategorias",
    ]),
    buscar: function (x) {
      return this.search.trim() != ""
        ? (this.allProductos[x].nombre + this.allProductos[x].precio)
            .toUpperCase()
            .indexOf(this.search.toUpperCase()) >= 0
          ? true
          : false
        : true;
    },
    filtroCategoria: function(nombreCategoria){
      if(nombreCategoria === this.allCategorias[this.catSelected].nombre){
        return true
      }else{
        return false
      }
    },
  },
  created() {
    this.getProductos();
    this.getCategorias();
  },
  computed: {
    ...mapState(["productos", "categorias"]),
    ...mapGetters(["allProductos", "allCategorias"]),
  },
};
</script>

<style scoped>
.border {
  background-color: #1565C0;
}
.inputN{
  width: 40px;
  text-align:center;
  border: 1px solid lightgray;
  border-radius:50px ;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>