<template>
  <v-app>
    <template>
      <v-container class="lighten-5 my-2">
        <v-row no-gutters>
          <v-col cols="11" >
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
          <v-col class="mt-2" cols="1" >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="blue darken-4" dark v-bind="attrs" v-on="on" @click="modalNuevoProducto=true">
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
    <div app dark class="primary text-lg-center rounded-t-xl my-2">
      <v-btn text rounded color="white">Entradas</v-btn>
      <v-btn text rounded color="white">Platos</v-btn>
      <v-btn text rounded color="white">Bebidas</v-btn>
      <v-btn text rounded color="white">Postres</v-btn>
    </div>

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
          <tr v-for="(producto,index) in allProductos" :key="index">
            <td>{{producto.nombre}}</td>
            <td>$ {{producto.precio}}</td>
            <td>{{producto.categoria.nombre}}</td>
            <td>{{producto.preparado?"si":"no"}}</td>

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
                  >
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
                    <v-select
                      :items="['Entrada', 'Plato', 'Bebida', 'Postre']"
                      label="Categoría"
                    ></v-select>
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
              <v-btn
                color="red"
                dark
                @click="modalNuevoProducto = false"
              >
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
  </v-app>
</template>

<script>
import { mapState,mapActions, mapGetters } from "vuex";
export default {
  name: "AdministrarProductos",
  data() {
    return {
      search: "",
      modalNuevoProducto: false,
      esPreparado: false,
    };
  },
  methods: {
        ...mapActions(["getProductos"]),
  },

  created() {
    this.getProductos();
  },
  computed:{
        ...mapState(['productos']),
        ...mapGetters(['allProductos'])
  }
};
</script>