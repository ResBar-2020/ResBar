<template>
  <v-app>
    <v-row justify="center">
      <v-dialog v-model="selectClient" persistent max-width="700" overlay-opacity="0" scrollable>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" class="m-0 p-0"
            ><v-icon right dark class="mx-1">mdi-plus-circle-outline</v-icon
            >Cliente
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Seleccionar Cliente 
          </v-card-title>
          <v-card-text>
            <!-- Inica fila de boton agregar y campo de texto buscar -->
            <v-row id="fila">
              <!-- Btn agregar cliente -->
              <v-col cols="3">
                <v-btn
                  class="my-5"
                  color="primary"
                  @click="limpiarSeleccionado(),modalAgregar = true"
                >
                  Nuevo<v-icon dark> mdi-plus-circle </v-icon>
                </v-btn>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" icon small v-bind="attrs" v-on="on">
                      <v-icon dark>
                        mdi-help-circle
                      </v-icon>
                    </v-btn>
                  </template>
                  <span
                    >Dar clic en NUEVO, si el cliente no está registrado</span
                  >
                </v-tooltip>
              </v-col>
              <!-- Campo de texto Buscar cliente -->
              <v-col cols="6">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Termina fila de boton agregar y campo de texto buscar -->

            <!-- INICIA TABLA DE CLIENTES -->
                  <v-simple-table id="myTable">
        <template v-slot:default>
          <thead class="primary">
            <tr>
              <th id="tituloTabla" class="text-left white--text">Nombre</th>
              <th id="tituloTabla" class="text-left white--text">Celular</th>
              <th id="tituloTabla" class="text-left white--text">WhatsApp</th>
              <th id="tituloTabla" class="text-left white--text">Dirección</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(cliente, index) in clientes"
              v-show="filtrar(index)"

                     @click="seleccionarCliente(cliente)"
                    :key="cliente._id"
                    :class="{'highlight': (cliente == clienteSelected)}"
            >
              <td>{{ cliente.nombreCompleto }}</td>
              <td>{{ cliente.celular }}</td>
              <td>{{ cliente.whatsapp }}</td>
              <td>{{ cliente.direccion }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red" color="white" text @click="selectClient = false">
              Cancelar
            </v-btn>
            <v-btn
              class="green darken-1"
              color="white"
              text
              @click="guardarClienteSeleccionado(),selectClient = false"
            >
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

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
                  <v-form>
                    <v-container>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Nombre completo"
                            v-model="clienteSelected.nombreCompleto"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Teléfono de casa"
                            v-model="clienteSelected.telefonoCasa"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Celular"
                            v-model="clienteSelected.celular"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="WhatsApp"
                            v-model="clienteSelected.whatsapp"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Dirección"
                            v-model="clienteSelected.direccion"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Departamento"
                            v-model="clienteSelected.departamento"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Municipio"
                            v-model="clienteSelected.municipio"
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

  </v-app>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
export default {
  name:"seleccionarCliente",
  computed: {
    ...mapState(["clienteSeleccionado", "cliente"]),
    ...mapGetters(["clientes"]),
  },
  data() {
    return {
      clienteSelected: {},
      selectClient: false,
      modalAgregar: false,
      search: "",
      snackbar: {
        message: "",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage", "seleccionarCliente"]),
    ...mapActions(["getClientes","addCliente","seleccionarClienteAction"]),

    filtrar(valor) {
      if (this.search === "") return true;
      let array = (
        this.clientes[valor].nombreCompleto +
        this.clientes[valor].celular +
        this.clientes[valor].whatsapp +
        this.clientes[valor].direccion 
      ).toUpperCase();
      return array.indexOf(this.search.toUpperCase()) >= 0;
    },
    seleccionarCliente(cliente) {
      this.clienteSelected = cliente;
    },
    showSnackbar(message) {
      this.clienteSelected = {};
      this.snackbar.message = message;
      this.showMessage(this.snackbar);
    },
    createCliente() {
      if (JSON.stringify(this.clienteSelected) != "{}") {
        this.addCliente(this.clienteSelected);
        this.showSnackbar("Agregado con exito");
        console.log("Agregar cliente");
      }
    },
    guardarClienteSeleccionado(){
      this.$store.state.cliente=this.clienteSelected
      this.$store.dispatch('seleccionarClienteAction');
    },
    limpiarSeleccionado(){
      this.clienteSelected = {}
    }
  },
  created() {
    this.getClientes();
  },
};
</script>

<style>
.highlight {
     background-color: #eeeeee;
}
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
