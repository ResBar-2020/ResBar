<template>
  <div>
    <header-dashboard
      title="Resbar Ordenes"
      subtitle="Ordenes"
    ></header-dashboard>
    <v-container fluid>
      <v-row>
        <v-col cols="4" offset="1">
          <v-text-field v-model="search" label="Buscar..."></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="d-flex align-center justify-center">
          <v-switch label="Ordenes Activas" color="indigo"></v-switch>
        </v-col>
        <v-col cols="6" class="d-flex align-center justify-start">
          <router-link
            :to="{ name: 'nuevaOrden' }"
            style="text-decoration: none"
          >
            <v-btn
              color="light-blue darken-4"
              class="utilities"
              @click="showMessage(snackbar)"
            >
              <v-icon>mdi-plus</v-icon> Nueva Orden</v-btn
            >
          </router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex align-center justify-center">
          <table>
            <thead>
              <th scope="col">Id</th>
              <th scope="col">Mesero</th>
              <th scope="col">Cliente</th>
              <th scope="col">Mesa</th>
              <th scope="col">Observacion</th>
              <th scope="col">Total</th>
              <th scope="col">Tipo</th>
              <th scope="col">Tiempo preparacion</th>
              <th scope="col">Acciones</th>
            </thead>
            <!--<tbody v-if="filteredOrdenes != undefined">
              <tr v-for="orden in filteredOrdenes" :key="orden._id">
                <td>{{ String(orden._id.substring(18, 24)) }}</td>
                <td>{{ orden.mesero }}</td>
                <td>{{ orden.cliente.nombreCompleto }}</td>
                <td>{{ orden.mesa ? orden.mesa : "Sin Mesa" }}</td>
                <td>{{ orden.observacion }}</td>
                <td>${{ orden.total }}</td>
                <td>
                  <v-chip
                    dense
                    class="utilities"
                    v-if="orden.tipo === 'DOMICILIO'"
                    color="red"
                    >{{ orden.tipo }}</v-chip
                  >
                  <v-chip
                    dense
                    class="utilities"
                    v-else-if="orden.tipo === 'MESA'"
                    color="light-blue darken-4"
                    >{{ orden.tipo }}</v-chip
                  >
                  <v-chip
                    dense
                    class="utilities"
                    v-else
                    color="green darken-3"
                    >{{ orden.tipo }}</v-chip
                  >
                </td>
                <td>{{ orden.tiempoPreparacion }}</td>
                <td>
                  <nobr>
                  <agregar-productos-orden :orden="orden"/>
                  <modificar-orden :orden="orden"/>
                  <eliminar-orden :orden="orden" />
                  </nobr>
                </td>
              </tr>
            </tbody>-->
            <tbody>
              <tr
                v-for="(orden, index) in allOrdenes"
                :key="index"
                v-show="filtro(index)"
              >
                <td>{{ String(orden._id.substring(18, 24)) }}</td>
                <td>{{ orden.mesero }}</td>
                <td>{{ orden.cliente.nombreCompleto }}</td>
                <td>{{ orden.mesa ? orden.mesa : "Sin Mesa" }}</td>
                <td>{{ orden.observacion }}</td>
                <td>${{ orden.total }}</td>
                <td>
                  <v-chip
                    dense
                    class="utilities"
                    v-if="orden.tipo === 'DOMICILIO'"
                    color="red"
                    >{{ orden.tipo }}</v-chip
                  >
                  <v-chip
                    dense
                    class="utilities"
                    v-else-if="orden.tipo === 'MESA'"
                    color="light-blue darken-4"
                    >{{ orden.tipo }}</v-chip
                  >
                  <v-chip
                    dense
                    class="utilities"
                    v-else
                    color="green darken-3"
                    >{{ orden.tipo }}</v-chip
                  >
                </td>
                <td>{{ orden.tiempoPreparacion }}</td>
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
    ...mapGetters(["allOrdenes", "filteredOrdenes"]),
    /*search:{
      get(){
        return this.$store.state.query;
      },
      set(val){
        this.$store.commit('setQuery', val)
      }
    }*/
  },
  data() {
    return {
      search: "",
      snackbar: {
        message: "desde ordenes",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(["getOrdenes"]),
    filtro(valor_orden) {
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
    },
  },
  created() {
    this.getOrdenes();
  },
};
</script>

<style scoped>
table {
  position: relative;
  text-align: center;
  border-collapse: separate;
  border-spacing: 0 10px;
  margin-top: -10px; /* correct offset on first border spacing if desired */
}
thead {
  background: #00579c;
  color: #fff;
}
th {
  padding: 1em;
}
tbody tr {
  transition: 0.5s;
  cursor: pointer;
  border-radius: 10px;
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
  color: #fff;
}
table tr:hover td:first-child {
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
}
</style>