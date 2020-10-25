<template>
  <div>
    <header-dashboard
      title="Resbar Ordenes"
      subtitle="Ordenes"
    ></header-dashboard>
    <v-btn color="info" @click="showMessage(snackbar)">mostrar snackbar</v-btn>
    <v-container fluid class="centered">
      <v-btn color="light-blue darken-4" class="utilities" @click="showMessage(snackbar)"> <v-icon>mdi-plus</v-icon> Nueva Orden</v-btn>
      <v-row>
        <v-col cols="12">
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
            <tbody>
              <tr v-for="orden in allOrdenes" :key="orden._id">
                <td>{{ String(orden._id.substring(18, 24))}}</td>
                <td>{{ orden.mesero }}</td>
                <td>{{ orden.cliente.nombreCompleto }}</td>
                <td>{{ orden.mesa }}</td>
                <td>{{ orden.observacion }}</td>
                <td>${{ orden.total }}</td>
                <td>
                  <v-alert class="utilities"  v-if="orden.tipo=='DOMICILIO'" color="red">{{ orden.tipo }}</v-alert>
                  <v-alert class="utilities"  v-else-if="orden.tipo=='MESA'" color="light-blue darken-4">{{ orden.tipo }}</v-alert>
                  <v-alert class="utilities"  v-else color="green darken-3">{{ orden.tipo }}</v-alert>
                </td>
                <td>{{ orden.tiempoPreparacion }}</td>
                <td class="d-flex">
                  <v-btn
                    class="mr-2 text-center action"
                    small
                    fab
                    color="deep-purple"
                    @click="showMessage(snackbar)"
                    ><v-icon>mdi-plus</v-icon></v-btn
                  >
                  <v-btn
                    class="mr-2 text-center action"
                    small
                    fab
                    color="pink"
                    @click="showMessage(snackbar)"
                    ><v-icon>mdi-clipboard</v-icon></v-btn
                  >
                  <eliminar-orden :orden="orden" />
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
export default {
  components: { HeaderDashboard, EliminarOrden},
  computed: {
    ...mapGetters(["allOrdenes"]),
  },
  data() {
    return {
      snackbar: {
        message: "desde ordenes",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(["getOrdenes"]),
  },
  created() {
    this.getOrdenes();
  },
};
</script>

<style scoped>
.centered {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}
table {
  position: relative;
  text-align: center;
  border-collapse: collapse;
  box-shadow: 15px 15px 35px rgb(46, 70, 0);
}
thead {
  position: relative;
  background: rgb(46, 70, 0);
  color: #fff;
}
tbody{
  position: relative;
}
th{
  padding: 1em;
}
tbody tr{
  position: relative;
  transition: 0.3s;
  cursor: pointer;
}
tr:hover{
  background: #43A047;
  color: #fff;
}
td {
  position: relative;
  padding: 1em;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.action {
  color: #FFF;
  transition: 0.5s;
}
.action:hover {
  transform: scale(1.1) rotateZ(360deg);
}
.utilities{
  font-weight: 700;
  color: #fff;
  transition: 0.3s;
}
.utilities:hover{
  transform: scale(1.1);
}
</style>