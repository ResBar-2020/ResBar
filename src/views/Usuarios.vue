<template>
  <v-app>
    <header-dashboard
      title="Resbar Usuarios"
      subtitle="Usuarios"
    ></header-dashboard>
    <v-container>
      <!-- Inica fila de boton agregar y campo de texto buscar -->
      <v-row id="fila">
        <!-- Btn agregar usuario -->
        <v-col cols="2">
          <v-btn class="my-5" color="primary" @click="modalAgregar = true">
            Agregar<v-icon dark class="mx-2"> mdi-plus-circle </v-icon>
          </v-btn>
        </v-col>
        <!-- Campo de texto Buscar usuario -->
        <v-col cols="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- Termina fila de boton agregar y campo de texto buscar -->

      <!-- Inicia tabla de usuarios -->
      <v-simple-table id="myTable">
        <template v-slot:default>
          <thead class="primary">
            <tr>
              <th id="tituloTabla" class="text-left white--text" text>
                ID
              </th>
              <th id="tituloTabla" class="text-left white--text">
                Nombre completo
              </th>
              <th id="tituloTabla" class="text-left white--text">
                Nombre de usuario
              </th>
              <th id="tituloTabla" class="text-left white--text">
                Contraseña
              </th>
              <th id="tituloTabla" class="text-left white--text">
                Rol
              </th>
              <th id="tituloTabla" class="text-left white--text">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in datos" :key="item.name">
              <td>{{ item.id }}</td>
              <td>{{ item.nombreCompleto }}</td>
              <td>{{ item.login }}</td>
              <td>{{ item.clave }}</td>
              <td>{{ item.rol }}</td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="modalEdit = true"
                      color="green darken-1"
                      class="mx-2"
                      fab
                      dark
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark>
                        mdi-pencil-box-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Modificar</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="modalEliminar = true"
                      color="red"
                      class="mx-2"
                      fab
                      dark
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark>
                        mdi-delete
                      </v-icon>
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
              <v-card-title class="headline">
                Agregar Usuario
              </v-card-title>
              <v-card-text>
                <template>
                  <v-form v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Nombre completo"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Nombre de usuario"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-text-field
                            label="Contraseña"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="mx-auto">
                          <v-select label="Rol" required></v-select>
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
                  @click="modalAgregar = false"
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
          <v-card-title class="headline">
            Modificar Usuario
          </v-card-title>
          <v-card-text>
            <template>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field
                        label="Nombre completo"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field
                        label="Nombre de usuario"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-text-field label="Contraseña" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="mx-auto">
                      <v-select label="Rol" required></v-select>
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
      <!-- Termina modal para editar usuario -->

      <!-- INICIA MODAL PARA ELIMINAR USUARIO -->
      <v-dialog v-model="modalEliminar" width="400">
        <v-card>
          <v-card-title>Eliminar Usuario</v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="text-center"
                  ><h3>¿Desea eliminar esta usuario?</h3></v-col
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
      <!-- TERMINA MODAL PARA ELIMINAR USUARIO -->
    </v-container>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
export default {
  components: { HeaderDashboard },
  data() {
    return {
      modalAgregar: false,
      modalEdit: false,
      modalEliminar: false,
      datos: [
        {
          id: 1,
          nombreCompleto: "Jon Jairo",
          login: "jon_user",
          clave: 159,
          rol: "Administrador",
        },
        {
          id: 1,
          nombreCompleto: "Mario Moreno",
          login: "mario_user",
          clave: "estaEsUnaContra",
          rol: "Administrador",
        },
        {
          id: 1,
          nombreCompleto: "Karina Restrepo",
          login: "kari_user",
          clave: 1234,
          rol: "Administrador",
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
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
