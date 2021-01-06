<template>
  <v-app>
    <header-dashboard
      title="Resbar Clientes"
      subtitle="Clientes"
    ></header-dashboard>
    <v-container>
      <!-- Inica fila de boton agregar y campo de texto buscar -->
      <v-row id="fila">
        <!-- Btn agregar cliente -->
        <v-col cols="2">
          <v-btn class="my-5" color="primary" @click="modalAgregar = true">
            Agregar<v-icon dark class="mx-2"> mdi-plus-circle </v-icon>
          </v-btn>
        </v-col>
        <!-- Campo de texto Buscar cliente -->
        <v-col cols="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- Termina fila de boton agregar y campo de texto buscar -->

      <!-- Tabla de clientes -->
      <v-simple-table id="myTable">
        <template v-slot:default>
          <thead class="primary">
            <tr>
              <th id="tituloTabla" class="text-left white--text">Nombre</th>
              <th id="tituloTabla" class="text-left white--text">Celular</th>
              <th id="tituloTabla" class="text-left white--text">WhatsApp</th>
              <th id="tituloTabla" class="text-left white--text">Dirección</th>
              <th id="tituloTabla" class="text-left white--text">
                Departamento
              </th>
              <th id="tituloTabla" class="text-left white--text">Municipio</th>

              <th id="tituloTabla" class="text-left white--text">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(cliente, index) in clientes"
              :key="index"
              v-show="filtrar(index)"
            >
              <td>{{ cliente.nombreCompleto}}</td>
              <td>{{ cliente.celular }}</td>
              <td>{{ cliente.whatsapp }}</td>
              <td>{{ cliente.direccion }}</td>
              <td>{{ cliente.departamento }}</td>
              <td>{{ cliente.municipio }}</td>

              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="modalEdit = true
                      getSelectedCliente(cliente);"
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
                  <span>Modificar</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="modalEliminar = true
                      getSelectedCliente(cliente);
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
                  <span>Eliminar</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!-- Termina tabla de clientes -->

      <!-- Inicia Dialog para agregar Cliente -->
      <v-row>
        <v-col cols="12">
          <v-dialog
            v-model="modalAgregar"
            persistent
            max-width="500"
            scrollable
          >
            <v-card>
              <v-card-title class="headline"> Agregar Cliente </v-card-title>
              <v-card-text>
                <template>
                  <v-form >
                    <v-container>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Nombre completo"
                            v-model="selectedCliente.nombreCompleto"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field 
                          label="Teléfono de casa"
                          v-model="selectedCliente.telefonoCasa"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field label="Celular" 
                          v-model="selectedCliente.celular"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="WhatsApp"
                            v-model="selectedCliente.whatsapp"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Dirección"
                            v-model="selectedCliente.direccion"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Departamento"
                            v-model="selectedCliente.departamento"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Municipio"
                            v-model="selectedCliente.municipio"
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
                >
                  Cancelar
                </v-btn>
                <v-btn
                  class="green darken-1"
                  color="white"
                  text
                    @click="
                      modalAgregar = false;
                      createCliente();
                    "
                >
                  Aceptar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <!-- Termina Dialog para agregar Cliente -->

      <!-- Inicia Modal para editar Cliente -->
      <v-dialog v-model="modalEdit" width="500" scrollable>
        <v-card>
          <v-card-title class="headline"> Modificar Cliente </v-card-title>
          <v-card-text>
            <template>
              <v-form >
                <v-container>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field
                        label="Nombre completo"
                        v-model="selectedCliente.nombreCompleto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field
                       label="Teléfono de casa"
                       v-model="selectedCliente.telefonoCasa"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field 
                      label="Celular"
                      v-model="selectedCliente.celular"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field 
                      label="WhatsApp"
                      v-model="selectedCliente.whatsapp"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field label="Dirección"
                      v-model="selectedCliente.direccion"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field
                        label="Departamento"
                        v-model="selectedCliente.departamento"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field 
                      label="Municipio" 
                      v-model="selectedCliente.municipio"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red" color="white" text @click="modalEdit = false">
              Cancelar
            </v-btn>
            <v-btn
              class="green darken-1"
              color="white"
              text
              @click="modalEdit = false"
            >
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Termina modal para editar Cliente -->

      <!-- INICIA MODAL PARA ELIMINAR Cliente -->
      <v-dialog v-model="modalEliminar" width="400">
        <v-card>
          <v-card-title>Eliminar Cliente</v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="text-center"
                  ><h3>¿Desea eliminar este Cliente?</h3></v-col
                >
              </v-row>
            </v-container></v-card-text
          >
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="red"
              color="white"
              text
              @click="modalEliminar = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              class="green darken-1"
              color="white"
              text
              @click="modalEliminar = false"
            >
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- TERMINA MODAL PARA ELIMINAR Cliente -->
    </v-container>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
export default {
  components: { HeaderDashboard },
  computed: {
    ...mapGetters(["clientes"]),
  },
  data() {
    return {
      selectedCliente: {},
      modalAgregar: false,
      modalEdit: false,
      modalEliminar: false,
      search: "",
      snackbar: {
        message: "",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(["getClientes", "addCliente"]),

    filtrar(valor) {
      if (this.search === "") return true;
      let array = (
        this.clientes[valor].nombreCompleto +
        this.clientes[valor].celular +
        this.clientes[valor].whatsapp +
        this.clientes[valor].direccion +
        this.clientes[valor].departamento +
        this.clientes[valor].municipio 
      ).toUpperCase();
      return array.indexOf(this.search.toUpperCase()) >= 0;
    },

    getSelectedCliente(cliente) {
      this.selectedCliente = cliente;
    },    

    showSnackbar(message) {
      this.selectedCliente = {};
      this.snackbar.message = message;
      this.showMessage(this.snackbar);
    },

    createCliente() {
      if (JSON.stringify(this.selectedCliente) != "{}") {
        this.addCliente(this.selectedCliente);
        this.showSnackbar("Agregado con exito");
        console.log("Agregar");
      }
    },
  },
  created() {
    this.getClientes();
  },
};
</script>

<style>
#fila {
  text-align: left;
  align-items: center;
}
#tituloTabla {
  font-size: 16px;
}
#myTable {
  border: 1px solid lightgray;
}
</style>
