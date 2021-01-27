<template>
  <div>

    <div class="oculto" v-for="idioma in idiomas" :key="idioma._id">
      <header-dashboard
        :title="idioma.views[1].labels.title"
        :subtitle="idioma.views[1].labels.subtitle"
      ></header-dashboard>
      <v-container fluid>
        <v-row>
          <v-col class="col-md-4 offset-md-1 col-12">
            <v-text-field
              v-model="search"
              :label="idioma.views[1].labels.search"
            ></v-text-field>
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
              >
                <v-icon>mdi-plus</v-icon>
                {{ idioma.views[1].labels.new }}</v-btn
              >
            </router-link>
          </v-col>
          <v-col class="d-flex align-center justify-start col-md-6 col-12">
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
                <th scope="col">{{ idioma.views[1].labels.table.waiter }}</th>
                <th scope="col">{{ idioma.views[1].labels.table.client }}</th>
                <th scope="col" class="d-none d-md-table-cell">
                  {{ idioma.views[1].labels.table.table }}
                </th>
               
                <th scope="col">{{ idioma.views[1].labels.table.total }}</th>
                <th scope="col" class="d-none d-md-table-cell">
                  {{ idioma.views[1].labels.table.orderType }}
                </th>
                <!--<th scope="col">Tiempo preparacion</th>-->
                <th scope="col">{{ idioma.views[1].labels.table.options }}</th>
                 <th scope="col" class="d-none d-md-table-cell">
                  Tiempo
                </th>
              </thead>
              <tbody v-if="todas">
                <tr
                  v-for="(orden, index) in allOrdenes"
                  :key="index"
                  v-show="filtrar(index)"
                  @click="OrdenSelected = orden"
                >
                  <td class="d-none d-md-table-cell">
                    {{ String(orden._id.substring(26)) }}
                  </td>
                  <td>{{ orden.mesero }}</td>
                  <td>{{ orden.cliente.nombreCompleto }}</td>
                  <td class="d-none d-md-table-cell">
                    {{
                      orden.mesa
                        ? orden.mesa
                        : idioma.views[1].labels.table.noTable
                    }}
                  </td>
                  
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
                  <td @click="OrdenSelected = orden;">
                    <nobr>
                      <detalle-orden :orden="orden" />
                      <agregar-productos-orden :orden="orden" />
                      <modificar-orden :orden="orden" />
                      <eliminar-orden :orden="orden" />
                      <cobrar-orden
                        :orden="orden"
                        v-if="orden.cobrada == false"
                      />
                      <v-btn class="mx-2" @click="imprimirElemento()" fab dark small color="purple">
                        <v-icon @click="OrdenSelected = orden;" dark > mdi-printer </v-icon>
                      </v-btn>
                    </nobr>

                  </td>
                   <td class="d-none d-md-table-cell">
                    <nobr>

                    <semaforo :orden="orden" />

                    </nobr>

                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr
                  v-for="(orden, index) in noEntregadas"
                  :key="index"
                  v-show="filtrar(index)"
                  @click="OrdenSelected = orden"
                >
                  <td class="d-none d-md-table-cell">
                    {{ String(orden._id.substring(26)) }}
                  </td>
                  <td>{{ orden.mesero }}</td>
                  <td>{{ orden.cliente.nombreCompleto }}</td>
                  <td class="d-none d-md-table-cell">
                    {{
                      orden.mesa
                        ? orden.mesa
                        : idioma.views[1].labels.table.noTable
                    }}
                  </td>
                  
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
                      <detalle-orden :orden="orden" />
                      <agregar-productos-orden :orden="orden" />
                      <modificar-orden :orden="orden" />
                      <eliminar-orden :orden="orden" />
                      <cobrar-orden
                        :orden="orden"
                        v-if="orden.cobrada == false"
                      />
                    <v-btn class="mx-2" @click="imprimirElemento()" fab dark small color="purple">
                      <v-icon @click="OrdenSelected = orden;" dark > mdi-printer </v-icon>
                    </v-btn>
                    </nobr>

                  </td>
                   <td class="d-none d-md-table-cell">
                    <nobr>

                    <semaforo :orden="orden"/>
                    
                    </nobr>

                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
      </v-container>
    </div>
            <!-- Ticket cobrar -->
    <div id="ticket"
      v-show="OrdenSelected.tipo == 'MESA'"
      class="tickets mostrar-impresion"
    >
      <div class="ticketcliente mostrar-impresion">
        <p v-if="this.parametros.length>0" class="centrado mostrar-impresion">
          <br />
          {{ this.parametros[0].valor }}
          <br />
          Telefono: {{ this.parametros[2].valor }}
          <br />
          Nit: {{ this.parametros[3].valor }}
          <br />
          Giro: {{ this.parametros[4].valor }}
          <br />
          Direccion: {{ this.parametros[5].valor }}
        </p>
        <p class="izquierda"></p>
        <hr class="hr1" />
        {{ new Date().toLocaleString() }}
        <br />
        Cuenta: {{ OrdenSelected._id }}
        <br />
        Mesa: {{ OrdenSelected.mesa }}
        <br />
        Mesero:{{ OrdenSelected.mesero }}
        <br />
        <hr class="" />
        <p></p>

        <table class="ticketcliente">
          <thead>
            <tr>
              <th class="producto">Nombre</th>
              <th class="cantidad">Ct</th>
              <th class="precio">c/u</th>
              <th class="total">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(producto, index) in OrdenSelected.detalleOrden"
              :key="index"
            >
              <td class="producto">{{ producto.nombre }}</td>
              <td class="cantidad">{{ producto.cantidad }}</td>
              <td class="precio">{{ producto.precio }}</td>
              <td class="precio">${{ producto.cantidad * producto.precio }}</td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          <div class="izquierda">
            <hr class="hr1" />
            Subtotal: $ {{ parseFloat(OrdenSelected.subtotal).toFixed(2) }}
            <br />
            Propina: $ {{ parseFloat(OrdenSelected.propina).toFixed(2) }}
            <br />
            Total: $ {{ parseFloat(OrdenSelected.total).toFixed(2) }}
            <br />
            <hr class="hr1" />
            <p v-if="this.parametros.length>0" class="centrado">
            {{this.parametros[1].valor}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin Ticket cobrar -->

    <!-- Ticket llevar domicilio  -->
    <div id="ticket"
      v-show="OrdenSelected.tipo == 'RECOGER'"
      class="tickets2 mostrar-impresion"
    >
      <div class="ticketcliente mostrar-impresion">
        <p v-if="this.parametros.length>0" class="centrado mostrar-impresion">
          <br />
          {{ this.parametros[0].valor }}
          <br />
          Telefono: {{ this.parametros[2].valor }}
          <br />
          Nit: {{ this.parametros[3].valor }}
          <br />
          Giro: {{ this.parametros[4].valor }}
          <br />
          Direccion: {{ this.parametros[5].valor }}
        </p>
        <p class="izquierda"></p>
        <hr class="hr1" />
        {{ new Date().toLocaleString() }}
        <br />
        <div v-if="OrdenSelected.tipo == 'RECOGER'">
          Cuenta: {{ trunkId(OrdenSelected._id)}}
          <br />
          Tipo: ORDEN PARA LLEVAR
          <br />
          Cliente: {{ OrdenSelected.cliente.nombreCompleto }}
          <br />
          <hr class="" />
          <p></p>
        </div>

        <div v-if="OrdenSelected.tipo == 'DOMICILIO'">
            Cuenta: {{ trunkId(OrdenSelected._id)}}
          <br />
          Tipo: DOMICILIO
          <br />
          Cliente: {{ OrdenSelected.cliente.nombreCompleto }}
          <br />
          Telefono Casa: {{ OrdenSelected.cliente.telefonoCasa }}
          <br/>
          Celular: {{ OrdenSelected.cliente.celular }}
          <br/>
          Whatsapp: {{ OrdenSelected.cliente.whatsapp }}
          <br/>
          Dirección: {{ OrdenSelected.cliente.direccion }} , {{OrdenSelected.cliente.municipio}} , 
          {{OrdenSelected.cliente.departamento}}
          <br/>

          <hr class="" />
          <p></p>
        </div>

        <table class="ticketcliente">
          <thead>
            <tr>
              <th class="producto">Nombre</th>
              <th class="cantidad">Ct</th>
              <th class="precio">c/u</th>
              <th class="total">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(producto, index) in OrdenSelected.detalleOrden"
              :key="index"
            >
              <td class="producto">{{ producto.nombre }}</td>
              <td class="cantidad">{{ producto.cantidad }}</td>
              <td class="precio">{{ producto.precio }}</td>
              <td class="precio">${{ producto.cantidad * producto.precio }}</td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          <div class="izquierda">
            <hr class="hr1" />
            Subtotal: $ {{ parseFloat(OrdenSelected.subtotal).toFixed(2) }}
            <br />
            <div v-if="OrdenSelected.tipo == 'DOMICILIO'">
            Costo de Envio: {{OrdenSelected.costoEnvio}}
            </div>

            Propina: $ {{ parseFloat(OrdenSelected.propina).toFixed(2) }}
            <br />
            Total: $ {{ parseFloat(OrdenSelected.total).toFixed(2)}}
            <br />
            <hr class="hr1" />
            <p v-if="this.parametros.length>0" class="centrado">
            {{this.parametros[1].valor}}
            </p>
          
          
            <hr class="hr1" />
            <p v-if="OrdenSelected.tipo == 'DOMICILIO'">
              DESPRENDIBLE <br>
              Orden: {{ trunkId(OrdenSelected._id)}}<br>
              Total:  {{ parseFloat(OrdenSelected.total).toFixed(2)}}
            </p>

          </div>
        </div>
      </div>
    </div>
    <!-- Fin Ticket llevar -->
  </div>
</template>


<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
import EliminarOrden from "../components/ordenes/EliminarOrden";
import ModificarOrden from "../components/ordenes/ModificarOrden";
import AgregarProductosOrden from "../components/ordenes/AgregarProductos";
import DetalleOrden from "../components/ordenes/DetalleOrden";
import CobrarOrden from "../components/ordenes/CobrarOrden";
import Semaforo from "../components/ordenes/Semaforo"
export default {
  components: {
    HeaderDashboard,
    EliminarOrden,
    ModificarOrden,
    AgregarProductosOrden,
    DetalleOrden,
    CobrarOrden,
    Semaforo
  },
  computed: {
    ...mapGetters(["allOrdenes", "noEntregadas", "idiomas", "parametros"]),
  },
  data() {
    return {
      todas: false,
      search: "",
      OrdenSelected: "",
      snackbar: {
        message: "desde ordenes",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
    ...mapActions(["getOrdenes", "getIdioma", "getParametros"]),
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

    imprimirElemento() {
      console.log(this.OrdenSelected);

      var elemento = ''; 
      if(this.OrdenSelected.tipo == 'MESA'){
        elemento = document.querySelector('.tickets'); 
      }else{
        elemento = document.querySelector('.tickets2'); 
      }
      while( elemento == null ){
        elemento = document.querySelector('.tickets'); 
      } 
      var ventana = window.open("", "PRINT", "height=800,width=1000");
      ventana.document.write(
        "<html><head><title>" + document.title + "</title>"
      );
      ventana.document.write('<link rel="stylesheet" href="./ticket.css">');
      ventana.document.write("</head><body >");
      ventana.document.write(elemento.innerHTML);
      ventana.document.write("</body></html>");
      ventana.document.close();
      ventana.focus();
      ventana.onload = function () {
        ventana.print();
        ventana.close();
      };
      //this.$router.push("dashboard");
      return true;
    },
    trunkId(id){
      return String(id).substr(26); 
    }
  },
  created() {
    this.getIdioma();
    this.getOrdenes();
    this.getParametros();
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

#ticket {
  display: none; 
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