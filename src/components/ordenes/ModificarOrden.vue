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
        <v-card-title class="primary headline text-uppercase white--text">
          Modificar Orden
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <form>
                <v-text-field
                  v-model="ordenLocal._id"
                  label="ID Orden"
                  disabled
                ></v-text-field>

                <v-text-field
                  v-model="ordenLocal.mesa"
                  label="Mesa"
                  required
                  v-if="mesa"
                ></v-text-field>

                <v-text-field
                  v-model="ordenLocal.mesero"
                  label="Mesero"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="ordenLocal.cliente.nombreCompleto"
                  label="Cliente"
                  required
                ></v-text-field>
              </form>
            </v-col>
            <v-col cols="6">
              <v-row class="filaCliente">
                <seleccionar-cliente></seleccionar-cliente>
              </v-row>
              <v-row class="filaCliente">
                <v-radio-group
                  v-model="ordenLocal.tipo"
                  mandatory
                  @change="asignarTipo()"
                >
                  <v-radio label="Mesa" value="MESA"></v-radio>
                  <v-radio label="Domicilio" value="DOMICILIO"></v-radio>
                  <v-radio label="Recoger" value="RECOGER"></v-radio>
                </v-radio-group>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th class="text-center" scope="col">Nombre</th>
                    <th class="text-center" scope="col">Precio</th>
                    <th class="text-center" scope="col">Cantidad</th>
                    <th class="text-center" scope="col">Subtotal</th>
                    <th class="text-center" scope="col">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="detalle in ordenLocal.detalleOrden"
                    :key="detalle.nombre"
                  >
                    <td>{{ detalle.nombre }}</td>
                    <td>{{ detalle.precio }}</td>
                    <td class="td-cant">
                      <v-row>
                        <v-col cols="2">
                          <v-btn icon small @click="decProducto(detalle)">
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="5">
                          <div class="inp">
                            <v-text-field
                              class="centered-input"
                              readonly
                              type="number"
                              dense
                              v-model.lazy.number="detalle.cantidad"
                            ></v-text-field>
                          </div>
                        </v-col>

                        <v-col cols="2">
                          <v-btn icon small @click="incProducto(detalle)">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </td>
                    <td>{{ detalle.subtotal }}</td>
                    <td>
                      <v-btn fab color="red" class="mx-2 action" x-small
                        ><v-icon dark>mdi-delete</v-icon></v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex flex-column">
              <v-textarea
                prepend-inner-icon="mdi-comment"
                v-model="ordenLocal.observacion"
                label="Observaciones"
                class="mx-2"
                rows="1"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="actions"
            color="indigo darken-4"
            @click="(dialog = false), guardarCambios()"
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
import { mapActions } from "vuex";
import SeleccionarCliente from "../nuevaOrden/SeleccionarCliente";
export default {
  components: { SeleccionarCliente },
  name: "ModificarOrden",
  props: ["orden"],
  data() {
    return {
      ordenLocal: { ...this.orden },
      dialog: false,
      tab: null,
      mesa: false,
    };
  },
  created: function () {
    this.asignarTipo();
  },
  methods: {
    //asigna un valor booleano a la variable mesa que nos sirve para mostrar o no mostrar el input para mesa
    asignarTipo() {
      switch (this.ordenLocal.tipo) {
        case "DOMICILIO":
          this.mesa = false;
          break;
        case "MESA":
          this.mesa = true;
          break;
        case "RECOGER":
          this.mesa = false;
          break;
        default:
          console.log("tipo desconocido");
          this.mesa = false;
      }
    },
    //decrementar cantidad del producto a valores no negativos
    decProducto(produ) {
      if (produ.cantidad > 1) {
        produ.cantidad--;
      } else {
        produ.cantidad = 0;
      }
    },
    //incrementar cantidad del producto
    incProducto(produ) {
      produ.cantidad++;
    },
    // lanzar peticion axios para cambiar el valor en la base
    async guardarCambios() {
      await this.updateOrden(this.ordenLocal);
      //alerta
    },
    ...mapActions(["updateOrden", "getOrdenes"]),
  },
};
</script>
<style scoped>
.centered-input >>> input {
  text-align: center;
  cursor: pointer;
  margin-left: 1em;
}
.inp {
  width: 4em;
}

.td-cant {
  width: 9em;
}

th,
td {
  text-align: center;
}

tr:hover {
  cursor: pointer;
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
  box-shadow: none;
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

.filaCliente {
  height: 0px;
  margin-bottom: 50px;
  padding: 10px 30px 0px 30px;
}
</style>
