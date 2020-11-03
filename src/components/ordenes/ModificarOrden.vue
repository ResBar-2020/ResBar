<template>
  <div class="text-center" style="display: inline-block">
    <v-dialog v-model="dialog" width="750" scrollable>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-2 text-center action"
          v-bind="attrs"
          v-on="on"
          small
          fab
          color="pink"
          ><v-icon>mdi-clipboard</v-icon></v-btn
        >
      </template>
      <v-card>
        <v-card-title
          class="headline orange darken-4 text--white title text-uppercase"
        >
          Modificar Orden
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <form>
                <label>ID Orden</label>
                <input type="text" v-model="orden.doc._id" disabled />

                <label>Mesa</label>
                <input type="text" v-model="orden.doc.mesa" />

                <label>Mesero</label>
                <input type="text" v-model="orden.doc.mesero" />

                <label>Cliente</label>
                <input type="text" v-model="orden.doc.cliente.nombreCompleto" />
              </form>
            </v-col>
            <v-col cols="6">
            <div id="filaCliente" class="float-left">
              <seleccionar-cliente></seleccionar-cliente>
            </div>
              <v-switch
                label="A Domicilio"
                color="red"
                value="red"
                class="switch"
              ></v-switch>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <table>
                <thead>
                  <th scope="col">Nombre</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Accion</th>
                </thead>
                <tbody>
                  <tr
                    v-for="detalle in orden.doc.detalleOrden"
                    :key="detalle.nombre"
                  >
                    <td>{{ detalle.nombre }}</td>
                    <td>{{ detalle.precio }}</td>
                    <td>
                      <button class="btn">
                        <v-icon>mdi-minus</v-icon>
                      </button>
                      {{ detalle.cantidad }}
                      <button class="btn">
                        <v-icon>mdi-plus</v-icon>
                      </button>
                    </td>
                    <td>{{ detalle.subtotal }}</td>
                    <td>
                      <v-btn
                        class="mr-2 text-center action"
                        small
                        fab
                        color="red"
                        ><v-icon>mdi-delete</v-icon></v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex flex-column">
              <label>Observaciones</label>
              <textarea v-model="orden.doc.observacion"></textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="actions"
            color="indigo darken-4"
            @click="dialog = false"
          >
            Guardar
          </v-btn>
          <v-btn class="actions" color="red" @click="dialog = false">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SeleccionarCliente from "../nuevaOrden/SeleccionarCliente";
export default {
  components: { SeleccionarCliente },
  name: "ModificarOrden",
  props: ["orden"],
  data() {
    return {
      dialog: false,
      tab: null,
    };
  },
};
</script>
<style scoped>
.btn {
  position: relative;
  border: 2px solid rgb(83, 54, 97);
  border-radius: 5px;
  margin: 1px;
  outline: none;
  background: rgb(255, 255, 255);
  transition: 0.3s;
}
.btn:hover {
  background: rgb(83, 54, 97);
}
.v-icon:hover {
  color: rgb(255, 255, 255);
}
.v-icon {
  color: rgb(83, 54, 97);
  font-size: 1.5em;
  line-height: 0;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
tr {
  text-align: center;
}
th {
  color: #fff;
  background: #37474f;
}
tr {
  color: #000;
  transition: 0.3s;
  cursor: pointer;
}
tbody tr:hover {
  color: #fff;
  background: #37474f;
}
td {
  padding-top: 0.2em;
}
.actions {
  color: #fff;
  transition: 0.5s;
  position: relative;
}
.actions:hover {
  transform: scale(1.1);
}
.actions::before {
  content: "";
  position: absolute;
  top: 0;
  padding: 0;
  width: 0%;
  height: 100%;
  background: rgb(156, 9, 224);
  opacity: 0.8;
  transition: 0.5s;
}
.actions:hover::before {
  opacity: 0.8 !important;
  width: 100%;
}
.action {
  color: #fff;
  transition: 0.5s;
}
.action:hover {
  transform: scale(1.1) rotateZ(360deg);
}
.switch {
  margin-left: 5em;
  margin-top: 5em;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  color: #000;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 2px;
}
input,
textarea {
  cursor: pointer;
  margin-bottom: 5px;
  border-bottom: 2px solid #000;
  padding-top: 2px;
  padding-left: 5px;
  transition: 0.5s;
}
input:focus,
textarea:focus {
  outline: none;
  transform: scale(1.05);
  border-color: rgb(156, 9, 224);
}
.title {
  color: #fff;
}
#filaCliente {
  height: 0px;
}
</style>
