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

    <template>
  <v-card>
    <v-tabs
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
            v-show="filtroCategoria(producto.categoria.nombre) && buscar(index)"
          >
          
            <td>{{ producto.nombre }}</td>
            <td>$ {{ producto.precio }}</td>
            <td>{{ producto.categoria.nombre }}</td>
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
    </v-simple-table>        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>



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
                      v-model="nuevoProducto.nombre"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-switch
                      :label="`Es Preparado`"
                      v-model="nuevoProducto.preparado"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="nuevoProducto.categoria"
                      :items="allCategorias"
                      item-text="nombre"
                      item-value="_id"
                      return-object
                      label="Categoría"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Precio $"
                      type="number"
                      min="0"
                      step="0.01"
                      v-model="nuevoProducto.precio"
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
                @click="
                  modalNuevoProducto = false;
                  createProduct();
                "
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
                    <v-select
                      v-model="productoSelected.categoria"
                      :items="allCategorias"
                      item-text="nombre"
                      item-value="_id"
                      return-object
                      label="Categoría"
                    >
                    </v-select>
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
                @click="
                  modalEditarProducto = false;
                  editProduct();
                "
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
                @click="
                  modalEliminarProducto = false;
                  removeProduct();
                "
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
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "AdministrarProductos",
  data() {
    return {
      search: "",
      modalEditarProducto: false,
      modalEliminarProducto: false,
      productoSelected: {},
      nuevoProducto: {},
      categoriaSelected: "",
      modalNuevoProducto: false,
      esPreparado: false,
      listaDeCategorias: [],
      catSelected: 'TODOS', 
      snackbar: {
        message: "",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions([
      "getProductos",
      "getCategorias",
      "addProduct",
      "updateProduct",
      "deleteProduct",
    ]),

    showSnackbar(message) {
      this.selectedUser = {};
      this.snackbar.message = message;
      this.showMessage(this.snackbar);
    },

    createProduct() {
      if (JSON.stringify(this.nuevoProducto) != "{}") {
        this.addProduct(this.nuevoProducto);
        this.nuevoProducto={};
        this.showSnackbar("Agregado con exito");
      }
    },

    editProduct() {
      if (this.productoSelected !== undefined) {
        this.updateProduct(this.productoSelected);
        this.showSnackbar("Editado con exito");
      }
    },

    removeProduct() {

      try {
        this.deleteProduct(this.productoSelected);
        this.showSnackbar("Eliminado con exito");
      } catch (error) {
        this.showSnackbar("Error al eliminar")
      }
    },
    buscar: function (x) {
      //(this.search!=null || this.search != undefined)?((this.search.trim() === "") ? true: false):true;

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
    }

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