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

      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step editable step="1"> Datos</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step editable step="2"> Productos </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-12">
              <v-card-text>
                <!--observaciones-->
                <v-row>
                  <v-col cols="12" class="d-flex flex-column">
                    <v-textarea
                      prepend-inner-icon="mdi-comment"
                      v-model="editedOrden.observacion"
                      label="Observaciones"
                      rows="1"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <!--/observaciones-->

                <!--datos personales-->
                <v-row>
                  <v-col cols="6">
                    <form>
                      <v-row>
                        <v-col>
                          Cliente:
                          <v-input
                            v-model="clienteSeleccionado"
                            @change="editedOrden.cliente = clienteSeleccionado"
                            v-if="clienteSeleccionado != null"
                            required
                            disabled
                          >
                            {{ clienteSeleccionado.nombreCompleto }}
                          </v-input>

                          <v-input
                            v-else
                            v-model="orden.cliente"
                            required
                            disabled
                          >
                            {{ orden.cliente.nombreCompleto }}
                          </v-input>
                        </v-col>
                      </v-row>

                      <v-text-field
                        v-model="editedOrden.mesero"
                        label="Mesero"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="editedOrden.mesa"
                        label="Mesa"
                        required
                        v-if="mesa"
                      ></v-text-field>
                    </form>
                  </v-col>
                  <v-col cols="6">
                    <v-row>
                      <seleccionar-cliente class="selectorCliente ml-4 mt-2">
                      </seleccionar-cliente>
                    </v-row>
                    <v-row>
                      <v-radio-group
                        v-model="editedOrden.tipo"
                        mandatory
                        @change="asignarTipo()"
                        class="ml-3"
                      >
                        <v-radio label="Mesa" value="MESA"></v-radio>
                        <v-radio label="Domicilio" value="DOMICILIO"></v-radio>
                        <v-radio label="Recoger" value="RECOGER"></v-radio>
                      </v-radio-group>
                    </v-row>
                  </v-col>
                </v-row>
                <!--/datos personales-->
              </v-card-text>
            </v-card>

            <v-btn color="primary" @click="e1 = 2"> Continuar </v-btn>
            <v-btn text @click="dialog = false"> Cancelar </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12">
              <v-card-text class="pa-0">
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
                          v-for="detalle in editedOrden.detalleOrden"
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
                            <!--<v-btn fab color="red" class="mx-2 action" x-small
                              ><v-icon dark>mdi-delete</v-icon></v-btn
                            >-->
                            <v-btn fab small
                              ><v-icon dark>mdi-delete</v-icon></v-btn
                            >
                          </td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-btn color="primary" @click="(dialog = false), guardarCambios()">
              Guardar
            </v-btn>
            <v-btn text @click="dialog = false"> Cancelar </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SeleccionarCliente from "../nuevaOrden/SeleccionarCliente";

export default {
  components: { SeleccionarCliente },
  name: "ModificarOrden",
  props: ["orden"],
  data() {
    return {
      e1: 1,
      dialog: false,
      tab: null,
      mesa: false,
      editedOrden: null,
      subtotal: 0,
    };
  },
  created() {
    this.editedOrden = Object.assign({}, this.orden);
    this.asignarTipo();
  },

  methods: {
    //asigna un valor booleano a la variable mesa que nos sirve para mostrar o no mostrar el input para mesa
    asignarTipo() {
      switch (this.editedOrden.tipo) {
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
      this.calcularSubtotal(produ);
    },
    //incrementar cantidad del producto
    incProducto(produ) {
      produ.cantidad++;
      this.calcularSubtotal(produ);
    },
    calcularSubtotal(produ) {
      produ.subtotal = produ.precio * produ.cantidad;
    },
    // lanzar peticion axios para cambiar el valor en la base
    async guardarCambios() {
      if (this.clienteSeleccionado!=null) {
        this.editedOrden.cliente = this.clienteSeleccionado;
      }else{
        this.editedOrden.cliente = this.orden.cliente;
      }
      
      await this.updateOrden(this.editedOrden);
      //alerta
    },
    ...mapActions(["updateOrden", "getOrdenes"]),
  },
  computed: {
    ...mapGetters(["clienteSeleccionado"]),
  },
  watch:{
    "editedOrden.detalleOrden":{
      deep:true,
      handler(newVal){
        let sum =0;
        newVal.forEach(detalle => {
          sum +=detalle.subtotal;
        });
        this.editedOrden.subtotal = sum;
        this.editedOrden.propina = this.editedOrden.subtotal*0.05;
        this.editedOrden.total = this.editedOrden.propina + this.editedOrden.subtotal +this.editedOrden.costoEnvio;

      }
    }
  }
};
</script>
<style scoped>
/*cantidad input*/
.centered-input >>> input {
  text-align: center;
  cursor: pointer;
  margin-left: 1em;
}
.inp {
  width: 4em;
  height: 0;
}
.td-cant {
  width: 9em;
}
/* /cantidad input*/

th,
td {
  text-align: center;
}

tr:hover {
  cursor: pointer;
}

.action {
  color: #fff;
  transition: 0.5s;
  box-shadow: none;
}

.selectorCliente {
  height: 0px;
  margin-bottom: 50px;
}
</style>
