<template>
  <div>

    <div v-for="(idioma) in idiomas" :key="idioma._id" >
      <header-dashboard
        :title="idioma.views[1].labels.title"
        :subtitle="idioma.views[1].labels.subtitle"
      ></header-dashboard>
      <v-container fluid>
        <v-row>
          <v-col class="col-md-4 offset-md-1 col-12">
            <v-text-field v-model="search" :label="idioma.views[1].labels.search"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex align-center justify-center col-md-6 col-12">
            <router-link
              :to="{ name: 'nuevaOrden' }"
              style="text-decoration: none"
            >
              <v-btn
                color="light-blue darken-4"
                class="utilities"
                @click="showMessage(snackbar)"
              >
                <v-icon>mdi-plus</v-icon> {{idioma.views[1].labels.new}}</v-btn
              >
            </router-link>
          </v-col>
          <v-col class="d-flex align-center justify-start  col-md-6 col-12">
            <v-switch
              :label="idioma.views[1].labels.toggle"
              color="primary"
              v-model="todas"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="overflow-auto col-12">
            <table class="col-12">
              <thead>
                <th scope="col" class="d-none d-md-table-cell">Id</th>
                <th scope="col">{{idioma.views[1].labels.table.waiter}}</th>
                <th scope="col">{{idioma.views[1].labels.table.client}}</th>
                <th scope="col" class="d-none d-md-table-cell">{{idioma.views[1].labels.table.table}}</th>
                <th scope="col" class="d-none d-md-table-cell">{{idioma.views[1].labels.table.observation}}</th>
                <th scope="col">{{idioma.views[1].labels.table.total}}</th>
                <th scope="col" class="d-none d-md-table-cell">{{idioma.views[1].labels.table.orderType}}</th>
                <!--<th scope="col">Tiempo preparacion</th>-->
                <th scope="col">{{idioma.views[1].labels.table.options}}</th>
              </thead>
              <tbody v-if="todas">
                <tr
                  v-for="(orden, index) in allOrdenes"
                  :key="index"
                  v-show="filtrar(index)"
                >
                  <td class="d-none d-md-table-cell">
                    {{ String(orden._id.substring(18, 24)) }}
                  </td>
                  <td>{{ orden.mesero }}</td>
                  <td>{{ orden.cliente.nombreCompleto }}</td>
                  <td class="d-none d-md-table-cell">{{ orden.mesa ? orden.mesa : idioma.views[1].labels.table.noTable }}</td>
                  <td class="d-none d-md-table-cell">{{ orden.observacion }}</td>
                  <td>${{ orden.total }}</td>
                  <td class="d-none d-md-table-cell">
                    <v-chip
                      dense
                      :class="{
                        red: orden.tipo === 'DOMICILIO',
                        'light-blue darken-4': orden.tipo === 'MESA',
                        'green darken-3': orden.tipo === 'RECOGER',
                      }"
                      style="color: #fff; font-weight: 500"
                      >{{ orden.tipo }}</v-chip
                    >
                  </td>
                  <!--<td>{{ orden.tiempoPreparacion }}</td>-->
                  <td>
                    <nobr>
                      <agregar-productos-orden :orden="orden" />
                      <modificar-orden :orden="orden" />
                      <eliminar-orden :orden="orden" />
                    </nobr>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr
                  v-for="(orden, index) in noEntregadas"
                  :key="index"
                  v-show="filtrar(index)"
                >
                  <td class="d-none d-md-table-cell">
                    {{ String(orden._id.substring(18, 24)) }}
                  </td>
                  <td>{{ orden.mesero }}</td>
                  <td>{{ orden.cliente.nombreCompleto }}</td>
                  <td class="d-none d-md-table-cell">{{ orden.mesa ? orden.mesa : idioma.views[1].labels.table.noTable }}</td>
                  <td class="d-none d-md-table-cell">{{ orden.observacion }}</td>
                  <td>${{ orden.total }}</td>
                  <td class="d-none d-md-table-cell">
                    <v-chip
                      dense
                      :class="{
                        red: orden.tipo === 'DOMICILIO',
                        'light-blue darken-4': orden.tipo === 'MESA',
                        'green darken-3': orden.tipo === 'RECOGER',
                      }"
                      style="color: #fff; font-weight: 500"
                      >{{ orden.tipo }}</v-chip
                    >
                  </td>
                  <!--<td>{{ orden.tiempoPreparacion }}</td>-->
                  <td>
                    <nobr>
                      <agregar-productos-orden :orden="orden" />
                      <modificar-orden :orden="orden" />
                      <eliminar-orden :orden="orden" />
                    </nobr>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>


<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
import EliminarOrden from "../components/ordenes/EliminarOrden";
import ModificarOrden from "../components/ordenes/ModificarOrden";
import AgregarProductosOrden from "../components/ordenes/AgregarProductos";
export default {
  components: {
    HeaderDashboard,
    EliminarOrden,
    ModificarOrden,
    AgregarProductosOrden,
  },
  computed: {
    ...mapGetters(["allOrdenes", "noEntregadas", "idiomas"]),
  },
  data() {
    return {
      todas: false,
      search: "",
      snackbar: {
        message: "desde ordenes",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(["getOrdenes", "getIdioma"]),
    filtrar(valor_orden) {
      if (this.todas) {
        if (this.search === "") return true;
        let array = (
          this.allOrdenes[valor_orden]._id +
          this.allOrdenes[valor_orden].mesero +
          this.allOrdenes[valor_orden].cliente.nombreCompleto +
          this.allOrdenes[valor_orden].mesa +
          this.allOrdenes[valor_orden].observacion +
          this.allOrdenes[valor_orden].total +
          this.allOrdenes[valor_orden].tipo
        ).toUpperCase();
        return array.indexOf(this.search.toUpperCase()) >= 0;
      } else {
        if (this.search === "") return true;
        let array = (
          this.noEntregadas[valor_orden]._id +
          this.noEntregadas[valor_orden].mesero +
          this.noEntregadas[valor_orden].cliente.nombreCompleto +
          this.noEntregadas[valor_orden].mesa +
          this.noEntregadas[valor_orden].observacion +
          this.noEntregadas[valor_orden].total +
          this.noEntregadas[valor_orden].tipo
        ).toUpperCase();
        return array.indexOf(this.search.toUpperCase()) >= 0;
      }
    },
  },
  created() {
    this.getIdioma();
    this.getOrdenes();
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
/*table tr:hover td:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
table tr:hover td:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

table thead th:first-child {
  border-radius: 10px 0 0 0;
}
table thead th:last-child {
  border-radius: 0 10px 0 0;
}*/
</style>