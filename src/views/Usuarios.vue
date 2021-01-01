<template>
  <div>
    <div v-for="idioma in idiomas" :key="idioma._id">
      <header-dashboard
        :title="idioma.views[3].labels.title"
        :subtitle="idioma.views[3].labels.subtitle"
      ></header-dashboard>
      <v-container>
        <!-- Inica fila de boton agregar y campo de texto buscar -->
        <v-row id="fila">
          <!-- Campo de texto Buscar usuario -->
          <v-col class="col-md-6 col-12">
            <v-text-field
              class="col-12"
              v-model="search"
              append-icon="mdi-magnify"
              :label="idioma.views[3].labels.search"
            ></v-text-field>
          </v-col>
          <!-- Btn agregar usuario -->
          <v-col class="col-md-4 col-8 offset-4">
            <v-btn color="primary" @click="modalAgregar = true">
              {{idioma.views[3].labels.new}}
              <v-icon dark class="mx-2"> mdi-plus-circle </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <!-- Termina fila de boton agregar y campo de texto buscar -->

        <!-- Inicia tabla de usuarios -->
        <v-simple-table id="myTable">
          <template v-slot:default>
            <thead class="primary">
              <tr>
                <th id="tituloTabla" class="text-left white--text">
                  {{idioma.views[3].labels.table.name}}
                </th>
                <th id="tituloTabla" class="text-left white--text">
                  {{idioma.views[3].labels.table.user}}
                </th>
                <th id="tituloTabla" class="text-left white--text">
                  {{idioma.views[3].labels.table.password}}
                </th>
                <th id="tituloTabla" class="text-left white--text">
                  {{idioma.views[3].labels.table.rol}}
                </th>
                <th id="tituloTabla" class="text-left white--text">
                  {{idioma.views[3].labels.table.actions}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(usuario, index) in usuarios"
                :key="index"
                v-show="filtrar(index)"
              >
                <td>{{ usuario.nombreCompleto }}</td>
                <td>{{ usuario.loggin }}</td>
                <td>{{ usuario.clave }}</td>
                <td>{{ usuario.rol }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        @click="
                          modalEdit = true;
                          getSelectedUser(usuario);
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
                    <span>
                      {{idioma.views[3].labels.table.actionButton.edit}}
                    </span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-show="usuario.rol !== 'ADMIN'"
                        @click="
                          modalEliminar = true;
                          getSelectedUser(usuario);
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
                    <span>
                      {{idioma.views[3].labels.table.actionButton.delete}}
                    </span>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!-- Termina tabla de usuarios -->

        <!-- Inicia Dialog para agregar usuario -->
        <v-row>
          <v-col cols="12">
            <v-dialog v-model="modalAgregar" persistent max-width="500">
              <v-card>
                <v-card-title class="headline">
                  {{idioma.views[3].labels.modal.add}}
                </v-card-title>
                <v-card-text>
                  <template>
                    <v-form v-model="valid" ref="form" lazy-validation>
                      <v-container>
                        <v-row>
                          <v-col cols="12" class="mx-auto">
                            <v-text-field
                              :label="idioma.views[3].labels.modal.generic.name"
                              v-model="selectedUser.nombreCompleto"
                              :rules="validRules"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" class="mx-auto">
                            <v-text-field
                              :label="idioma.views[3].labels.modal.generic.user"
                              v-model="selectedUser.loggin"
                              :rules="validRules"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" class="mx-auto">
                            <v-text-field
                              :label="idioma.views[3].labels.modal.generic.password"
                              v-model="selectedUser.clave"
                              :rules="validRules"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" class="mx-auto">
                            <v-select
                              :label="idioma.views[3].labels.modal.generic.rol"
                              :items="Roles"
                              v-model="selectedUser.rol"
                              :rules="validRules"
                              required
                            ></v-select>
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
                    {{idioma.views[3].labels.modal.generic.button.cancel}}
                  </v-btn>
                  <v-btn
                    class="green darken-1"
                    color="white"
                    text
                    @click="
                      modalAgregar = false;
                      createUser();
                    "
                  >
                    {{idioma.views[3].labels.modal.generic.button.ok}}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <!-- Termina Dialog para agregar usuario -->

        <!-- Inicia modal para editar usuario -->
        <v-dialog v-model="modalEdit" width="500">
          <v-card>
                <v-card-title class="headline">
                  {{idioma.views[3].labels.modal.add}}
                </v-card-title>
                <v-card-text>
                  <template>
                    <v-form v-model="valid" ref="form" lazy-validation>
                      <v-container>
                        <v-row>
                          <v-col cols="12" class="mx-auto">
                            <v-text-field
                              :label="idioma.views[3].labels.modal.generic.name"
                              v-model="selectedUser.nombreCompleto"
                              :rules="validRules"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" class="mx-auto">
                            <v-text-field
                              :label="idioma.views[3].labels.modal.generic.user"
                              v-model="selectedUser.loggin"
                              :rules="validRules"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" class="mx-auto">
                            <v-text-field
                              :label="idioma.views[3].labels.modal.generic.password"
                              v-model="selectedUser.clave"
                              :rules="validRules"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" class="mx-auto">
                            <v-select
                              :label="idioma.views[3].labels.modal.generic.rol"
                              :items="Roles"
                              v-model="selectedUser.rol"
                              :rules="validRules"
                              required
                            ></v-select>
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
                    {{idioma.views[3].labels.modal.generic.button.cancel}}
                  </v-btn>
                  <v-btn
                    class="green darken-1"
                    color="white"
                    text
                    @click="
                      modalEdit = false;
                      modifyUser();
                    "
                  >
                    {{idioma.views[3].labels.modal.generic.button.ok}}
                  </v-btn>
                </v-card-actions>
              </v-card>
        </v-dialog>
        <!-- Termina modal para editar usuario -->

        <!-- INICIA MODAL PARA ELIMINAR USUARIO -->
        <v-dialog v-model="modalEliminar" width="400">
          <v-card>
            <v-card-title class="red" style="color: #fff">
              {{idioma.views[3].labels.modal.delete}}
            </v-card-title
            >

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" class="text-center"
                    ><h3>
                      ¿Desea eliminar a
                      <span style="font-weight: 800; color: red"
                        >{{ selectedUser.nombreCompleto }}?</span
                      >
                    </h3></v-col
                  >
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
                {{idioma.views[3].labels.modal.generic.button.cancel}}
              </v-btn>
              <v-btn
                class="red"
                color="white"
                text
                @click="
                  modalEliminar = false;
                  removeUser();
                "
              >
                {{idioma.views[3].labels.modal.generic.button.ok}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- TERMINA MODAL PARA ELIMINAR USUARIO -->
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderDashboard from "../components/headerDashboard";

export default {
  components: { HeaderDashboard },
  data() {
    return {
      selectedUser: {},
      Roles: ["ADMIN", "MESERO"],
      modalAgregar: false,
      modalEdit: false,
      modalEliminar: false,
      search: "",
      valid: true,
      validRules: [(v) => !!v || "El campo es requerido"],
      snackbar: {
        message: "",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions([
      "getUsers",
      "addUser",
      "updateUser",
      "deleteUser",
      "getIdioma",
    ]),
    getSelectedUser(user) {
      this.selectedUser = user;
    },
    showSnackbar(message) {
      this.selectedUser = {};
      this.snackbar.message = message;
      this.showMessage(this.snackbar);
    },
    createUser() {
      if (JSON.stringify(this.selectedUser) != "{}") {
        this.addUser(this.selectedUser);
        this.showSnackbar("Agregado con exito");
      }
    },
    modifyUser() {
      if (this.selectedUser !== undefined) {
        this.updateUser(this.selectedUser);
        this.showSnackbar("Editado con exito");
      }
    },
    removeUser() {
      if (this.selectedUser !== undefined) {
        this.deleteUser(this.selectedUser);
        this.showSnackbar("Eliminado con exito");
      }
    },
    filtrar(valor) {
      if (this.search === "") return true;
      let array = (
        this.usuarios[valor].nombreCompleto +
        this.usuarios[valor].loggin +
        this.usuarios[valor].clave +
        this.usuarios[valor].rol
      ).toUpperCase();
      return array.indexOf(this.search.toUpperCase()) >= 0;
    },
    validate() {
      this.$refs.form[0].validate();
    },
  },
  computed: {
    ...mapGetters(["usuarios", "idiomas"]),
  },
  created() {
    this.getIdioma();
    this.getUsers();
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
  border: none;
  border-collapse: collapse;
}
#myTable tbody tr {
  transition: 0.5s;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.8rem rgba(0, 0, 0, 0.2);
}
#myTable tbody tr:hover {
  background: #4c89b8;
  color: #fff;
  box-shadow: 0 0.125rem 0.8rem #00579c;
}
#myTable tbody tr td {
  padding: 0.8em;
  font-weight: 600;
}
</style>
