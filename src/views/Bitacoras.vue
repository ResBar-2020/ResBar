<template>
  <div>
    <header-dashboard
      title="Resbar Bitacoras"
      subtitle="Bitacoras"
    ></header-dashboard>
    <br />

    <v-container align-start>
      <v-flex>
        <v-toolbar flat>
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

            <v-col cols="8" sm="5" md="2" v-if="botonBuscar">
              <v-btn class="primary" @click="buscarPorFechas()">
                BUSCAR POR FECHAS
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="8" sm="5" md="2" v-if="botonBorrar">
              <v-btn class="red" color="white" text @click="borrarFiltros()">
                BORRAR FILTROS
              </v-btn>
            </v-col>
          </v-row>
        </v-toolbar>

        <div v-if="sinFiltrarRango">
          <v-data-table
            :headers="headers"
            :items="allBitacoras"
            :items-per-page="5"
            :search="search"
            class="mytable"
          >
          </v-data-table>
        </div>

        <div v-else>
          <v-data-table
            :headers="headersFiltrado"
            :items="allBitacoras"
            :items-per-page="5"
            :search="search"
            class="mytable"
          >
          </v-data-table>
        </div>

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

                <v-toolbar flat>
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
                <v-btn
                  class="red"
                  color="white"
                  text
                  @click="
                    dialog = false;
                    cancelarEliminar();
                  "
                >
                  Cancelar
                </v-btn>
                <v-btn
                  class="green"
                  color="white"
                  text
                  @click="
                    dialog = false;
                    eliminarBitacoras();
                  "
                >
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
      dateDesde: null,
      menuDesde: false,
      //para el segundo Date Picker (HASTA)
      dateHasta: null,
      menuHasta: false,
      //para el primer Date Picker (DESDE DELETE)
      dateDesdeDelete: null,
      menuDesdeDelete: false,
      //para el segundo Date Picker (HASTA DELETE)
      dateHastaDelete: null,
      menuHastaDelete: false,
      //modal eliminar bitacoras
      modal: false,
      dialog: false,
      //buscar de la tabla
      search: "",
      //juego de botones
      botonBuscar: true,
      botonBorrar: false,
      //para la tabla (true muestra la tabla sin filtrar, false nuestra la filtrada por rango de fechas)
      sinFiltrarRango: true,
      //arreglos donde se guardan las fechas (inicio y desde)
      fechasSelec: [],
      fechasSelecDelete: [],

      //headers de tabla normal (sin filtrar por fechas)
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

      //headers de tabla filtrada por rango de fechas
      headersFiltrado: [
        {
          text: "Fecha",
          value: "value.fecha",
          class: "primary white--text",
          align: "center",
          sortable: false,
        },
        {
          text: "Acción",
          value: "value.accion",
          class: "primary white--text",
          align: "center",
          sortable: false,
        },
        {
          text: "Nombre Completo",
          value: "value.nombreCompleto",
          class: "primary white--text",
          align: "center",
          sortable: false,
        },
        {
          text: "Loggin",
          value: "value.loggin",
          class: "primary white--text",
          align: "center",
          sortable: false,
        },
        {
          text: "Descripción",
          value: "value.descripcion",
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
    ...mapActions([
      "getBitacoras",
      "getBitacorasRango",
      "deleteBitacorasRango",
    ]),
    /*
    metodo para mostrar mensajes
    */
    showSnackbar(message) {
      this.snackbar.message = message;
      this.showMessage(this.snackbar);
    },
    /*
    metodo para borrar los datos del buscador por fechas y buscador por texto 
    */
    borrarFiltros() {
      this.search = "";
      this.dateDesde = null;
      this.dateHasta = null;
      this.botonBuscar = true;
      this.botonBorrar = false;
      this.sinFiltrarRango = true;
      this.getBitacoras();
      this.showSnackbar("BORRANDO FILTROS DE BUSQUEDA");
    },
    /*
    metodo para buscar por fechas (cada fecha validada)
    */
    buscarPorFechas() {
      if (this.dateDesde === null) {
        this.showSnackbar("ERROR, Falta la fecha DESDE");
      }
      if (this.dateHasta === null) {
        this.showSnackbar("ERROR, Falta la fecha HASTA");
      }
      if (this.dateDesde > this.dateHasta) {
        this.showSnackbar(
          "ERROR, La fecha HASTA no puede ser mayor a la fecha DESDE"
        );
      }
      if (this.dateDesde <= this.dateHasta) {
        if (this.dateDesde === null && this.dateHasta === null) {
          this.showSnackbar("ERROR, INGRESE LAS FECHAS");
        } else {
          this.fechasSelec.push(this.dateDesde);
          this.fechasSelec.push(this.dateHasta);
          this.getBitacorasRango(this.fechasSelec);
          this.sinFiltrarRango = false;
          this.showSnackbar(
            "Buscando bitacoras desde la fecha " +
              this.dateDesde +
              " hasta la fecha " +
              this.dateHasta +
              "."
          );
          this.botonBuscar = false;
          this.botonBorrar = true;
        }
      }
    },
    /*
    metodo para eliminar bitacoras por rango de fechas (cada fecha validada)
    */
    eliminarBitacoras() {
      this.search = "";
      this.dateDesde = null;
      this.dateHasta = null;
      this.botonBuscar = true;
      this.botonBorrar = false;

      if (this.dateDesdeDelete === null) {
        this.showSnackbar("ERROR AL ELIMINAR, Falta la fecha DESDE");
      }
      if (this.dateHastaDelete === null) {
        this.showSnackbar("ERROR AL ELIMINAR, Falta la fecha HASTA");
      }
      if (this.dateDesdeDelete > this.dateHastaDelete) {
        this.showSnackbar(
          "ERROR AL ELIMINAR, La fecha HASTA no puede ser mayor a la fecha DESDE"
        );
      }
      if (this.dateDesdeDelete <= this.dateHastaDelete) {
        if (this.dateDesdeDelete === null && this.dateHastaDelete === null) {
          this.showSnackbar("ERROR AL ELIMINAR, INGRESE LAS FECHAS");
        } else {
          this.fechasSelecDelete.push(this.dateDesdeDelete);
          this.fechasSelecDelete.push(this.dateHastaDelete);
          this.deleteBitacorasRango(this.fechasSelecDelete);
          this.sinFiltrarRango = true;
          this.getBitacoras();
          this.showSnackbar(
            "ELIMINANDO BITACORAS DESDE " +
              this.dateDesdeDelete +
              " HASTA " +
              this.dateHastaDelete +
              "."
          );
        }
      }
      this.dateDesdeDelete = null;
      this.dateHastaDelete = null;
    },
    /*
    metodo para cancelar eliminar por fechas, reinicia las fechas para que no se guarden
    */
    cancelarEliminar() {
      this.dateDesdeDelete = null;
      this.dateHastaDelete = null;
    },
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
</style>