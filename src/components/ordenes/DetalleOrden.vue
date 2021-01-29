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
        <v-card-title class="headline primary text-center">
          <v-row>
            <v-col class="col-12 col-md-6">
              <h3 class="text-white">Detalle de la Orden</h3>
            </v-col>
            <v-col class="col-12 col-md-6">
              <h4 class="text-white">Tipo: {{ orden.tipo }}</h4>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row class="text-center">
            <v-col class="col-12 col-md-6">
              <label class="identifier">Id Orden: </label
              ><span class="information">{{ orden._id }}</span>
            </v-col>
            <v-col class="col-12 col-md-6">
              <label class="identifier">Fecha: </label
              ><span class="information">{{
                `${new Date(orden.fecha).getDay()} / ${new Date(
                  orden.fecha
                ).getMonth()} / ${new Date(orden.fecha).getFullYear()}`
              }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex flex-column col-12 col-md-4">
              <label class="identifier">Cliente:</label
              ><span class="information">{{
                orden.cliente.nombreCompleto
              }}</span>
              <label v-show="orden.tipo!=&quot;DOMICILIO&quot;" class="identifier">Mesero:</label
              ><span v-show="orden.tipo!=&quot;DOMICILIO&quot;" class="information">{{ orden.mesero }}</span>
              <label v-show="orden.tipo==&quot;DOMICILIO&quot;" class="identifier">Direccion:</label
              ><span v-show="orden.tipo==&quot;DOMICILIO&quot;" class="information">{{ orden.cliente.direccion }}</span>
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
            <v-col class="col-12 col-md-8 overflow-auto">
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
              <div class="col-4 bg">
                <label class="identifier">Subtotal: </label>
                <span class="price">${{ orden.subtotal }}</span>
              </div>
              <div class="col-4 bg">
                <label class="identifier">Propina: </label>
                <span class="price">${{ parseFloat(orden.propina).toFixed(2) }}</span>
              </div>
              <div class="col-4 bg" v-show="orden.tipo==&quot;DOMICILIO&quot;">
                <label class="identifier">Costo de envio: </label>
                <span class="price">${{ orden.costoEnvio }}</span>
              </div>
            </v-col>

            <div class="col-12 bg total">
              <label class="identifier">Total: </label>
              <span class="totalPrice">${{ orden.total }}</span>
            </div>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="text-white"
            @click="dialog = false"
          >
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
}
.information {
  line-height: 15px;
  text-align: center;
  padding: 0.6rem;
  font-size: 1.1em;
  font-weight: 600;
  box-shadow: -15px -15px 15px rgba(255,255,255,0.2),
              15px 15px 15px rgba(0,0,0,0.1),
              inset -5px -5px 5px rgba(255,255,255,0.2),
              inset 5px 5px 5px rgba(0,0,0,0.1);
  border-radius: 12px;
}
table {
  border-collapse: collapse;
  font-weight: 500;
}
table thead {
  background: linear-gradient(90deg, #4969be 40%, #009ac9 50%);
  transition: 0.6s;
  border-radius: 12px;
}
table thead th {
  padding: 10px;
}
table thead th:first-child {
  border-radius: 12px 0 0 12px;
}

table thead th:last-child {
  border-radius: 0 12px 12px 0;
}
table tbody tr {
  box-shadow: -15px -15px 15px rgba(255,255,255,0.2),
              15px 15px 15px rgba(0,0,0,0.1),
              inset -5px -5px 5px rgba(255,255,255,0.2),
              inset 5px 5px 5px rgba(0,0,0,0.1);
  border-radius: 12px;
}
table tbody tr td {
  padding: 0.5rem 1rem;
  text-align: center;
}
.bg {
  text-align: center;
  border-radius: 25px;
  margin: 0.2em;
  cursor: pointer;
  transition: 0.5s;
}
.price {
  padding: 1rem;
  font-size: 1.1em;
  font-weight: 800;
  box-shadow: -15px -15px 15px rgba(255,255,255,0.2),
              15px 15px 15px rgba(0,0,0,0.1),
              inset -5px -5px 5px rgba(255,255,255,0.2),
              inset 5px 5px 5px rgba(0,0,0,0.1);
  border-radius: 12px;
}
.totalPrice{
  padding: 0.4rem;
  font-size: 1.1em;
  font-weight: 800;
}

.total {
  color: #fff;
  font-size: 30px;
  background: linear-gradient(90deg, #4969be 10%, #009ac9 50%);
  transition: 1.5s;
}
.total:hover {
  filter: hue-rotate(180deg);
}
</style>