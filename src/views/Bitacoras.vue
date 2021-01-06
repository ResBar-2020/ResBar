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
          :items="allBitacoras"
          :items-per-page="5"
          :search="search"
          class="mytable"
        >
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
import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderDashboard from "../components/headerDashboard";

export default {
  components: { HeaderDashboard },
  computed: {
    ...mapGetters(["allBitacoras"]),
  },
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
        {
          text: "Fecha",
          value: "fecha",
          class: "primary white--text",
          align: "center",
          sortable: false,
        },
        {
          text: "Acción",
          value: "accion",
          class: "primary white--text",
          align: "center",
          sortable: false,
        },
        {
          text: "Nombre Completo",
          value: "nombreCompleto",
          class: "primary white--text",
          align: "center",
          sortable: false,
        },
        {
          text: "Loggin",
          value: "loggin",
          class: "primary white--text",
          align: "center",
          sortable: false,
        },
        {
          text: "Descripción",
          value: "descripcion",
          class: "primary white--text",
          align: "center",
          sortable: false,
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
    ...mapActions(["getBitacoras"]),
  },
  created() {
    this.getBitacoras();
  },
};
</script>

<style scoped>
.mytable {
  border-collapse: collapse;
  max-width: 90vw;
  box-shadow: 0 0.135rem 0.8rem rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  font-size: 100px !important;
  padding: 1px;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th,
.v-data-table > .v-data-table__wrapper > table > header > tr > th {
    font-size: 100px;
}
</style>