<template>
  <v-app>
    <template>
      <v-container class="lighten-5 my-2">
        <v-row no-gutters>
          <v-col cols="11">
            <div mr-3>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar..."
                single-line
                hide-details
              ></v-text-field>
            </div>
          </v-col>
          <v-col class="mt-2" cols="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="blue darken-4"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="modalNuevoProducto = true"
                >
                  Agregar
                </v-btn>
              </template>
              <span>Nuevo Producto</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!-- <v-container> -->

    <v-card>
      <v-tabs
        background-color="primary accent-4 rounded-t-xl"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>


        <div>
        <v-tab 
          href="#tab-2"
          @click="categoria = 'Entradas'"
          class="flex-grow-1 prevDrag"
        >
          Entradas
          <v-icon>mdi-baguette</v-icon>
        </v-tab>
        </div>

        <v-tab
          href="#tab-3"
          @click="categoria = 'Platos'"
          class="flex-grow-1 prevDrag"
        >
          Platos
          <v-icon>mdi-food-croissant</v-icon>
        </v-tab>

        <v-tab
          href="#tab-4"
          @click="categoria = 'Bebidas'"
          class="flex-grow-1 prevDrag"
        >
          Bebidas
          <v-icon>mdi-beer</v-icon>
        </v-tab>

        <v-tab
          href="#tab-1"
          @click="categoria = 'Postres'"
          class="flex-grow-1 prevDrag"
        >
          Postres
          <v-icon>mdi-ice-cream</v-icon>
        </v-tab>
      </v-tabs>
    </v-card>

    <v-simple-table id="myTable">
      <template v-slot:default>
        <thead class="primary">
          <tr>
            <th id="tituloTabla" class="text-center white--text">Nombre</th>
            <th id="tituloTabla" class="text-center white--text">Precio</th>
            <th id="tituloTabla" class="text-center white--text">Categoria</th>
            <th id="tituloTabla" class="text-center white--text">Preparado</th>
            <th id="tituloTabla" class="text-center white--text">Acciones</th>
          </tr>
        </thead>
        <tbody class="text-center" v-if="productos">
          <tr
            v-for="(producto, index) in allProductos"
            :key="index"
            @click="productoSelected = producto"
          >
            <td>{{ producto.nombre }}</td>
            <td>$ {{ producto.precio }}</td>
            <td>{{producto.categoria.nombre}}</td>
            <td>{{ producto.preparado ? "si" : "no" }}</td>

            <td class="mx-2">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="blue"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="mr-2"
                    small
                    @click="modalEditarProducto = true"
                  >
                    <v-icon dark> mdi-pencil </v-icon>
                  </v-btn>
                </template>
                <span>Modificar</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="red"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="modalEliminarProducto = true"
                  >
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

    <!-- inicia dialogo modal para agregar nuevo producto -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="modalNuevoProducto" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Nuevo Producto</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre del producto"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-switch
                      :label="`Es Preparado`"
                      v-model="esPreparado"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12">
                    <v-select :items="categorias" label="Categoría"></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Precio $"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" dark @click="modalNuevoProducto = false">
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-4"
                dark
                @click="modalNuevoProducto = false"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <!-- inicia modal editar -->
    <template>
      <v-row justcategoriaSelectedify="center">
        <v-dialog v-model="modalEditarProducto" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Editar Producto</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre del producto"
                      required
                      v-model="productoSelected.nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-switch
                      :label="`Es Preparado`"
                      v-model="productoSelected.preparado"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12">
                    <v-select :items="categorias" label="Categoría"></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Precio $"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      v-model="productoSelected.precio"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" dark @click="modalEditarProducto = false">
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-4"
                dark
                @click="modalEditarProducto = false"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- termina modal editar -->

    <!-- inicia modal borrar -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="modalEliminarProducto" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Eliminar Producto</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    ¿Desea eliminar el producto:<strong>
                      {{ productoSelected.nombre }}?
                    </strong>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" dark @click="modalEliminarProducto = false">
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-4"
                dark
                @click="modalEliminarProducto = false"
              >
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- Termina modal borrar -->
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "AdministrarProductos",
  data() {
    return {
      search: "",
      modalEditarProducto: false,
      modalEliminarProducto: false,
      categorias: ["Entrada", "Plato", "Bebida", "Postre"],
      productoSelected: {},
      categoriaSelected: "",
      modalNuevoProducto: false,
      esPreparado: false,
      categoria: "Entradas",

    };
  },
  methods: {
    ...mapActions(["getProductos", "getCategorias"]),

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