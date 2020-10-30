<template>
  <div>
    <header-dashboard
      title="Resbar Bitacoras"
      subtitle="Bitacoras"
    ></header-dashboard>
    <br />

    <v-container align-start>
      <v-flex>
        <v-toolbar flat color="white">
          <v-row>
            <v-col cols="8" sm="5" md="4">
              <v-text-field
                class="text-xs-center"
                v-model="search"
                append-icon="mdi-magnify"
                label="Búsqueda"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="8" sm="5" md="3">
              <v-menu
                ref="menuDesde"
                v-model="menuDesde"
                :close-on-content-click="false"
                :return-value.sync="dateDesde"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateDesde"
                    label="DESDE"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateDesde" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuDesde = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menuDesde.save(dateDesde)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="8" sm="5" md="3">
              <v-menu
                ref="menuHasta"
                v-model="menuHasta"
                :close-on-content-click="false"
                :return-value.sync="dateHasta"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateHasta"
                    label="HASTA"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateHasta" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuHasta = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menuHasta.save(dateHasta)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="8" sm="5" md="2">
              <v-btn color="primary"> BORRAR </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="bitacoras"
          :items-per-page="5"
          :search="search"
          class="mytable"
          ><template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.fecha }}</td>
            <td>{{ props.item.accion }}</td>
            <td>{{ props.item.nombreCompleto }}</td>
            <td>{{ props.item.loggin }}</td>
            <td>{{ props.item.descripcion }}</td>
          </template>
        </v-data-table>

        <br />
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on">
                Eliminar Bitacoras
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="primary white--text justify-center">
                Ingrese rango de Bitacoras a eliminar
              </v-card-title>

              <v-card-text>
                <br />
                <br />

                <v-toolbar flat color="white">
                  <v-row justify="space-around">
                    <v-col md="4">
                      <v-menu
                        ref="menuDesdeDelete"
                        v-model="menuDesdeDelete"
                        :close-on-content-click="false"
                        :return-value.sync="dateDesdeDelete"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateDesdeDelete"
                            label="DESDE"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateDesdeDelete"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menuDesdeDelete = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menuDesdeDelete.save(dateDesdeDelete)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col md="4">
                      <v-menu
                        ref="menuHastaDelete"
                        v-model="menuHastaDelete"
                        :close-on-content-click="false"
                        :return-value.sync="dateHastaDelete"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateHastaDelete"
                            label="HASTA"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateHastaDelete"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menuHastaDelete = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menuHastaDelete.save(dateHastaDelete)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-toolbar>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="red" color="white" text @click="dialog = false">
                  Cancelar
                </v-btn>
                <v-btn class="green" color="white" text @click="dialog = false">
                  Aceptar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import HeaderDashboard from "../components/headerDashboard";

export default {
  components: { HeaderDashboard },
  data() {
    return {
      //para el primer Date Picker (DESDE)
      dateDesde: new Date().toISOString().substr(0, 10),
      menuDesde: false,
      //para el segundo Date Picker (HASTA)
      dateHasta: new Date().toISOString().substr(0, 10),
      menuHasta: false,

      //para el primer Date Picker (DESDE DELETE)
      dateDesdeDelete: new Date().toISOString().substr(0, 10),
      menuDesdeDelete: false,
      //para el segundo Date Picker (HASTA DELETE)
      dateHastaDelete: new Date().toISOString().substr(0, 10),
      menuHastaDelete: false,

      modal: false,
      dialog: false,

      search: "",
      headers: [
        { text: "ID", value: "id", class: "primary white--text" },
        { text: "Fecha", value: "fecha", class: "primary white--text" },
        { text: "Acción", value: "accion", class: "primary white--text" },
        {
          text: "Nombre Completo",
          value: "nombreCompleto",
          class: "primary white--text",
        },
        { text: "Loggin", value: "loggin", class: "primary white--text" },
        {
          text: "Descripción",
          value: "descripcion",
          class: "primary white--text",
        },
      ],
      bitacoras: [
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
        {
          id: 552,
          fecha: "2020 - 08 - 01",
          accion: "Inicio de Sesión",
          nombreCompleto: "Administrador",
          loggin: "admin",
          descripcion: "Se inicio sesión usando su loggin y clave.",
        },
      ],
      snackbar: {
        message: "desde bitacoras",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
  },
};
</script>

<style scoped>
.mytable {
  position: relative;
  text-align: center;
  border-collapse: collapse;
  box-shadow: 5px 5px 15px rgb(36, 50, 0);
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.myth {
  background: rgb(46, 70, 0);
  color: #fff;
}
</style>