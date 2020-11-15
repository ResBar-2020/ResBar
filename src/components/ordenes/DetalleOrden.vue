<template>
  <div class="text-center" style="display: inline-block">
    <v-dialog v-model="dialog" :retain-focus="false" max-width="900">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-2 text-center action"
          v-bind="attrs"
          v-on="on"
          small
          fab
          color="cyan darken-4"
          ><v-icon>mdi-format-list-bulleted-square</v-icon></v-btn
        >
      </template>
      <v-card>
        <v-card-title class="headline primary">
          <v-row>
            <v-col>
              <h3 class="text-white">Detalle de la Orden</h3>
            </v-col>
            <v-col>
              <h4 class="text-white">Tipo: {{ orden.tipo }}</h4>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row class="text-center">
            <v-col cols="6">
              <label class="identifier">Id Orden: </label
              ><span class="information">{{ orden._id }}</span>
            </v-col>
            <v-col cols="6">
              <label class="identifier">Fecha: </label
              ><span class="information">{{ orden.fecha }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="d-flex flex-column">
              <label class="identifier">Cliente:</label
              ><span class="information">{{
                orden.cliente.nombreCompleto
              }}</span>
              <label class="identifier">Mesero:</label
              ><span class="information">{{ orden.mesero }}</span>
              <label class="identifier" v-if="orden.mesa">Mesa:</label
              ><span class="information" v-if="orden.mesa">{{
                orden.mesa
              }}</span>
              <label class="identifier" v-if="orden.observacion"
                >Observacion:</label
              ><span class="information" v-if="orden.observacion">{{
                orden.observacion
              }}</span>
            </v-col>
            <v-col cols="8">
              <table class="col-12">
                <thead class="text-white">
                  <th scope="col">Cantidad</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Subtotal</th>
                </thead>
                <tbody
                  v-for="producto in orden.detalleOrden"
                  :key="producto.nombre"
                >
                  <tr>
                    <td>{{ producto.cantidad }}</td>
                    <td>{{ producto.nombre }}</td>
                    <td>$ {{ producto.precio }}</td>
                    <td>$ {{ producto.subtotal }}</td>
                  </tr>
                </tbody>
              </table>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex flex-row">
              <div class="col-6 bg">
                <label class="identifier">Subtotal: </label>
                <span class="information">${{ orden.subtotal }}</span>
              </div>
              <div class="col-6 bg">
                <label class="identifier">Propina: </label>
                <span class="information">${{ orden.propina }}</span>
              </div>
            </v-col>

              <div class="col-12 bg">
                <label class="identifier">Total: </label>
                <span class="information">${{ orden.total }}</span>
              </div>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-4" class="text-white" @click="dialog = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DetalleOrden",
  props: ["orden"],

  data() {
    return {
      dialog: false,
    };
  },
};
</script>
<style scoped>
.action {
  color: #fff;
  transition: 0.5s;
}
.action:hover {
  transform: scale(1.1) rotateZ(360deg);
}
.text-white {
  color: #fff;
}
.identifier {
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 1rem;
  font-size: 1.2em;
  padding: 0.2em;
  padding-left: 0.5em;
  border-radius: 25px;
  text-decoration: underline;
}
.information {
  padding: 0.4rem;
  font-size: 1.1em;
  font-weight: 800;
}
table {
  border-collapse: collapse;
  font-weight: 500;
}
table thead,
table tbody tr{
  background: linear-gradient(90deg, #161736 20%, #171ECF );
  transition: 0.6s;
}
table thead th{
  padding: 10px;
}
table tbody tr td {
  color: #fff;
  padding: 5px 10px;
  text-align: center;
}
.bg{
    color: #fff;
    background: linear-gradient(90deg, #161736 30%, #171ECF );
    text-align: center;
    border-radius: 25px;
    margin: 0.2em;
    transition: 0.5s;
}
.price {
  position: relative;
  font-weight: 700;
}
table tbody tr:hover,
.bg:hover{
  filter: hue-rotate(90deg);
}
</style>