<template>
  <div>
    <div v-for="idioma in idiomas" :key="idioma._id">
      <header-dashboard
        title="Resbar Categorias"
        subtitle="Administracion de Categorias"
      ></header-dashboard>

      <v-container>
        <v-row>
          <v-col cols="4" offset="1">
            <v-text-field
              label="Buscar en Categorias"
              v-model="search"
              append-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="4" offset="1">
            <v-btn
              elevation="13"
              outlined
              @click="modalAgregar = true"
              class="primary white--text my-3"
              ><v-icon>mdi-plus-circle-outline </v-icon> Nueva Categoria</v-btn
            >
          </v-col>
        </v-row>

        <!--Comienza la tabla-->

        <v-row>
          <v-col class="overflow-auto col-12">
            <table class="col-12">
              <thead>
                <th scope="col" class="d-none d-md-table-cell">Id</th>
                <th scope="col">Categoria</th>
                <th scope="col">Acciones</th>
              </thead>
              <tbody>
                <tr
                  v-for="(categoria, index) in allCategorias"
                  :key="index"
                  v-show="filtrar(index)"
                >
                  <td class="d-none d-md-table-cell">
                    {{ String(categoria._id.substring(28)) }}
                  </td>
                  <td>{{ categoria.nombre }}</td>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="
                            modalEdit = true;
                            getSelectedCategoria(categoria);
                          "
                          color="green darken-1"
                          class="mx-2"
                          fab
                          dark
                          small
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark> mdi-pencil-box-outline </v-icon>
                        </v-btn>
                      </template>
                      <span>Editar</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="
                            modalEliminar = true;
                            getSelectedCategoria(categoria);
                          "
                          color="red"
                          class="mx-2"
                          fab
                          dark
                          small
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark> mdi-delete </v-icon>
                        </v-btn>
                      </template>
                      <span> Eliminar </span>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
<!-- Termina tabla -->

<!-- Inicia Dialog para agregar  --> 
        <v-row>
          <v-col cols="12">
             <v-dialog v-model="modalAgregar" persistent max-width="500">
               <v-card>
                  <v-card-title class="headline">
                 Agregar una Categoria
                </v-card-title>
                <v-card-text>
                  <template>
                    <v-form v-model="valid" ref="form" lazy-validation>
                      <v-container>
                        <v-row>
                          <v-col cols="12" class="mx-auto">
                            <v-text-field
                              label="Nombre"
                            
                              v-model="selectedCategoria.nombre"
                              :rules="validRules"
                              required
                            ></v-text-field>
                          </v-col>
                          </v-row>
                            </v-container>
                             </v-form>
                              </template>
                </v-card-text>
                 <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="red"
                    color="white"
                    text
                    @click="modalAgregar = false"
                  >Cancelar</v-btn>
                   <v-btn
                    class="green darken-1"
                    color="white"
                    text
                    @click="
                      modalAgregar = false;
                      createCategoria();
                    "
                  > Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

 <!-- Inicia modal para editar-->
        <v-dialog v-model="modalEdit" width="500">
          <v-card>
            <v-card-title class="headline">
                  Modificar Categoria
                </v-card-title>
                  <v-card-text>
                  <template>
                     <v-form v-model="valid" ref="form" lazy-validation>
                      <v-container>
                         <v-row>
                          <v-col cols="12" class="mx-auto">
                            <v-text-field
                              label="Nombre"
                              v-model="selectedCategoria.nombre"
                              :rules="validRules"
                              required
                            ></v-text-field>
                             </v-col>
                        </v-row>
                         </v-container>
                    </v-form>
                  </template>
                   </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                   <v-btn
                    class="red"
                    color="white"
                    text
                    @click="modalEdit = false"
                  >
                   Cancelar
                  </v-btn>
                  <v-btn
                    class="green darken-1"
                    color="white"
                    text
                    @click="
                      modalEdit = false;
                      modifyCategoria();
                    "
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
        </v-dialog>
         <!-- INICIA MODAL PARA ELIMINAR  -->
          <v-dialog v-model="modalEliminar" width="400">
          <v-card>
            <v-card-title class="red" style="color: #fff">
             Eliminar la Categoria
            </v-card-title>
             <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" class="text-center"
                    ><h3>
                      ¿Desea eliminar a
                      <span style="font-weight: 800; color: red"
                        >{{ selectedCategoria.nombre }}?</span
                      >
                    </h3></v-col>
                     </v-row>
              </v-container></v-card-text
            >
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn
                class="green darken-1"
                color="white"
                text
                @click="modalEliminar = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                class="red"
                color="white"
                text
                @click="
                  modalEliminar = false;
                  removeCategoria();
                "
              >
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
                        






      </v-container>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
export default {
  components: { HeaderDashboard },
  computed: {
    ...mapGetters(["allCategorias", "idiomas"]),
  },
  data() {
    return {
      selectedCategoria: {},

      modalAgregar: false,
      modalEdit: false,
      modalEliminar: false,
      valid: true,
      validRules: [(v) => !!v || "El campo es requerido"],
      search: "",
      snackbar: {
        message: "",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["setCategorias", "showMessage"]),
    ...mapActions([
      "getCategorias",
      "getIdioma",
      "addCategoria",
      "updateCategoria",
      "deleteCategoria",
    ]),
    getSelectedCategoria(categoria) {
      this.selectedCategoria = categoria;
    },
    showSnackbar(message) {
      this.selectedCategoria = {};
      this.snackbar.message = message;
      this.showMessage(this.snackbar);
    },
    createCategoria() {
      if (JSON.stringify(this.selectedCategoria) != "{}") {
        this.addCategoria(this.selectedCategoria);
        this.showSnackbar("Agregado con exito");
      }
    },
    modifyCategoria() {
      if (this.selectedCategoria !== undefined) {
        this.updateCategoria(this.selectedCategoria);
        this.showSnackbar("Editado con exito");
      }
    },
    removeCategoria() {
      if (this.selectedCategoria !== undefined) {
        this.deleteCategoria(this.selectedCategoria);
        this.showSnackbar("Eliminado con exito");
      }
    },
    filtrar(valor) {
      if (this.search === "") return true;
      let array = (
        this.categoria[valor]._id + this.categoria[valor].nombre
      ).toUpperCase();
      return array.indexOf(this.search.toUpperCase()) >= 0;
    },
    validate() {
      this.$refs.form[0].validate();
    },
  },
  created() {
    this.getCategorias();

    this.getIdioma();

    //console.log("xd:" + this.idiomas.nombre);
  },
};
</script>
<style scoped>
table {
  text-align: center;
  border-collapse: collapse;
  margin-top: -10px; /* correct offset on first border spacing if desired */
  max-width: 90vw;
}
thead {
  background: #00579c;
  color: #fff;
}
th {
  text-transform: capitalize;
  padding: 1em;
}
tbody tr {
  transition: 0.5s;
  cursor: pointer;
  /*border-radius: 10px;*/
  box-shadow: 0 0.125rem 0.8rem rgba(0, 0, 0, 0.2);
}
td {
  padding: 1em;
  /*font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;*/
}
.action {
  color: #fff;
  transition: 0.5s;
}
.action:hover {
  transform: scale(1.1) rotateZ(360deg);
}
.utilities {
  font-weight: 700;
  color: #fff;
  transition: 0.3s;
  letter-spacing: 0.1em;
}
.utilities:hover {
  transform: scale(1.1);
}

table tr:hover {
  background: #4c89b8;
  box-shadow: 0 0.125rem 0.8rem #00579c;
  color: #fff;
}
</style>
