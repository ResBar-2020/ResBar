<!-- TODO Agregar el idioma -->
<template>
  <v-app>
    <header-dashboard
      title="Resbar Usuarios"
      subtitle="Usuarios"
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
            label="Buscar"
          ></v-text-field>
        </v-col>
        <!-- Btn agregar usuario -->
        <v-col class="col-md-4 col-8 offset-4">
          <v-btn color="primary" @click="modalAgregar = true">
            Agregar<v-icon dark class="mx-2"> mdi-plus-circle </v-icon>
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
                Nombre completo
              </th>
              <th id="tituloTabla" class="text-left white--text">
                Nombre de usuario
              </th>
              <th id="tituloTabla" class="text-left white--text">Contraseña</th>
              <th id="tituloTabla" class="text-left white--text">Rol</th>
              <th id="tituloTabla" class="text-left white--text">Acciones</th>
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
                  <span>Modificar</span>
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
                  <span>Eliminar</span>
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
              <v-card-title class="headline"> Agregar Usuario </v-card-title>
              <v-card-text>
                <template>
                  <v-form v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Nombre completo"
                            v-model="selectedUser.nombreCompleto"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Nombre de usuario"
                            v-model="selectedUser.loggin"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Contraseña"
                            v-model="selectedUser.clave"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-select
                            label="Rol"
                            :items="Roles"
                            v-model="selectedUser.rol"
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
                  @click="
                    modalAgregar = false;"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  class="green darken-1"
                  color="white"
                  text
                  @click="modalAgregar = false;
                  createUser();"
                >
                  Aceptar
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
          <v-card-title class="headline"> Modificar Usuario </v-card-title>
          <v-card-text>
            <template>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field
                        label="Nombre completo"
                        v-model="selectedUser.nombreCompleto"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field
                        label="Nombre de usuario"
                        v-model="selectedUser.loggin"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field
                        label="Contraseña"
                        required
                        v-model="selectedUser.clave"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-select
                        label="Rol"
                        :items="Roles"
                        v-model="selectedUser.rol"
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
              @click="
                modalEdit = false;
                getUsers();
                showSnackbar('Accion Cancelada')
              "
            >
              Cancelar
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
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Termina modal para editar usuario -->

      <!-- INICIA MODAL PARA ELIMINAR USUARIO -->
      <v-dialog v-model="modalEliminar" width="400">
        <v-card>
          <v-card-title class="red" style="color: #fff"
            >Eliminar Usuario</v-card-title
          >

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="text-center"
                  ><h3>
                    ¿Desea eliminar a
                    <span style="font-weight: 800"
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
              @click="modalEliminar = false;
              removeUser()"
            >
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- TERMINA MODAL PARA ELIMINAR USUARIO -->
    </v-container>
  </v-app>
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
      snackbar: {
        message: "",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(["getUsers", "addUser", "updateUser", "deleteUser"]),
    getSelectedUser(user) {
      this.selectedUser = user;
    },
    showSnackbar(message){
        this.selectedUser = {}
        this.snackbar.message = message;
        this.showMessage(this.snackbar);
    },
    createUser() {
      if (JSON.stringify(this.selectedUser) != '{}') {
        this.addUser(this.selectedUser);
        this.showSnackbar("Agregado con exito")
      }
    },
    modifyUser() {
      if (this.selectedUser !== undefined) {
        this.updateUser(this.selectedUser);
        this.showSnackbar("Editado con exito")
      }
    },
    removeUser() {
      if (this.selectedUser !== undefined) {
        this.deleteUser(this.selectedUser);
        this.showSnackbar("Eliminado con exito")
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
  },
  computed: {
    ...mapGetters(["usuarios"]),
  },
  created() {
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
}
#myTable tbody tr {
  border: none;
}
</style>
