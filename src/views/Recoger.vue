<template>
  <div>
    <header-dashboard 
      title="Resbar Recoger"
      subtitle="Ordenes a Recoger">
    </header-dashboard>
    <v-row>
      <v-col cols="4" offset="1">
        <v-text-field label="Buscar" v-model="searchDisplay"></v-text-field>
      </v-col>
      <v-col cols="4" offset="1">
        <v-btn  elevation="13" outlined @click="showMessage(snackbar)" class="primary white--text my-3" ><v-icon>mdi-plus-circle-outline </v-icon>
          Nueva Orden</v-btn>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row>
        <v-col  v-for="(orden,index) in datos" :key="index" v-show="filtro(index)">
          <template >
            <v-card :loading="loading"  max-width="374" hover height="360" elevation="17">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-banner
                style="color: white;"
                elevation="6"
                single-line
                sticky
                :class="{'red': orden.entregada==false,'blue':orden.entregada==true}"
              >
                {{orden.entregada==false?'PENDIENTE':'ENTREGADA'}}
              </v-banner>
              <v-card class="overflow-y-auto pa-2" height="260" >
                <h3>
                  {{String(orden._id.substring(18, 24))}}
                  {{ orden.cliente.nombreCompleto }}
                </h3>
                <div>
                  <v-chip class="ma-2 v-card--hover" color="purple" outlined>
                    <v-icon left> mdi-label </v-icon> Costo: $ •
                    {{ orden.total}}
                  </v-chip>
                  <div>Tiempo de preparacion:</div>
                  <div> {{ orden.cliente.tiempoPreparacion }}</div>
                </div>
                <v-divider class="mx-2"></v-divider>
                <h3>Acciones</h3>
                <div>
                  <v-chip-group active-class="deep-purple accent-4 white--text" column>
                    <v-btn class="mr-2 text-center action" small fab color="deep-purple" @click="showMessage(snackbar)"><v-icon> mdi-coin</v-icon></v-btn>
                    <agregar-productos :orden="orden"/> 
                    <eliminar-orden :orden="orden"/>
                    <v-btn class="mr-2 text-center action" small fab color="deep-purple" @click="showMessage(snackbar)"><v-icon> mdi-pencil-circle-outline</v-icon></v-btn>
                  </v-chip-group>
                </div>
              </v-card>
              <v-divider></v-divider> 
              <v-card-actions>
                <v-footer absolute class="font-weight-medium">
                  <v-chip-group>
                    <v-chip class="ma-2" color="teal" text-color="white" @click="completeEtapa(orden)" :disabled="orden.entregada==true" dark>
                      <v-avatar left>
                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                      Completar</v-chip>
                    <detalle-recoger :orden="orden"/>
                  </v-chip-group>
                </v-footer>
              </v-card-actions>           
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { mapMutations } from "vuex";
import DetalleRecoger from "../components/recoger/DetalleRecoger";
import AgregarProductos from "../components/ordenes/AgregarProductos"
import EliminarOrden from "../components/ordenes/EliminarOrden";
import HeaderDashboard from "../components/headerDashboard";
export default {
  components: {HeaderDashboard, EliminarOrden, DetalleRecoger, AgregarProductos},
  data() {
    return {
      show: false,
      dialog: false,
      loading: false,
      searchDisplay: "",
      snackbar: {
        message: "recoger",
        timout: 2000,
      },
      datos: [
        {
          "_id": "2269fc1c847d0a718a610ty33d02a678",
          "_rev": "3-ff13c9cd3e8049eed72c4f4bc151b258",
          "fecha": "2020-10-07T00:34:49.251+00:00",
          "mesero": "Mario Rivera",
          "tipo": "RECOGER",
          "domicilioEtapa": 1,
          "mesa": "",
          "cliente": {
            "_id": "2269fc1c847d0a718a6101833d006216",
            "nombreCompleto": "Maria Rodriguez",
            "telefonoCasa": "2434-2323",
            "celular": "",
            "whatsapp": "7234-2342",
            "direccion": "Colonia Lamatepec, pasaje el jocote casa 24B",
            "municipio": "Santa Ana",
            "departamento": "Santa Ana",
            "puntoDeReferencia": "",
            "observaciones": "",
            "fechaRegistro": "2020-07-08T21:55:18.859+00:00"
          },
          "cobrada": false,
          "entregada": true,
          "observacion": "Sin cebolla",
          "tiempoPreparacion": null,
          "detalleOrden": [
      {
        "cantidad": 1,
        "nombre": "Pizza Suprema",
        "precio": 6.35,
        "categoria": {
          "nombre": "Platos"
        },
        "subtotal": 6.35
      },
      {
        "cantidad": 1,
        "nombre": "Refresco de Horchata",
        "precio": 1.75,
        "categoria": {
          "id": "5e7fe0a3012b112c6d640b79",
          "nombre": "Bebidas"
        },
        "subtotal": 1.75,
        "preparado": false
      },
      {
        "cantidad": 1,
        "nombre": "Soda Fanta 12 onz",
        "precio": 1,
        "categoria": {
          "id": "5e7fe0a3012b112c6d640b79",
          "nombre": "Bebidas"
        },
        "subtotal": 1,
        "preparado": false
      }
          ],
          "subtotal": 5,
          "propina": 0.5,
          "costoEnvio": 1.25,
          "total": 9.1
        },
        {
          "_id": "2269fc1c847d0a718a61rn833d02art9",
          "_rev": "3-ff13c9cd3e8049eed72c4f4bc151rt58",
          "fecha": "2020-10-07T00:34:49.251+00:00",
          "mesero": "Maria Josefina",
          "tipo": "RECOGER",
          "domicilioEtapa": 0,
          "mesa": "0",
          "cliente": {
            "_id": "2269fc1c847d0a718a6101833d006456",
            "nombreCompleto": "Jose Martinez",
            "telefonoCasa": "2434-2323",
            "celular": "",
            "whatsapp": "7234-2342",
            "direccion": "Colonia Lamatepec, pasaje el jocote casa 24B",
            "municipio": "Santa Ana",
            "departamento": "Santa Ana",
            "puntoDeReferencia": "",
            "observaciones": "",
            "fechaRegistro": "2020-07-08T21:55:18.859+00:00"
          },
          "cobrada": false,
          "entregada": false,
          "observacion": "Sin cebolla",
          "tiempoPreparacion": null,
          "detalleOrden": [
            {
              "nombre": "Deditos de Queso",
              "cantidad": 2,
              "precio": 2.5,
              "categoria": {
                "_id": "2269fc1c847d0a718a6101833d000936",
                "nombre": "Entradas"
              },
              "subtotal": 5,
              "preparado": true
            },
            {
              "cantidad": 1,
              "nombre": "Soda Fanta 12 onz",
              "precio": 1,
              "categoria": {
                "id": "5e7fe0a3012b112c6d640b79",
                "nombre": "Bebidas"
              },
              "subtotal": 1,
              "preparado": false
            }
          ],
          "subtotal": 6,
          "propina": 0.5,
          "costoEnvio": 1.25,
          "total": 6.75
        },
        {
          "_id": "2269fc1c847d0a718a6101i33d02b877",
          "_rev": "3-ff13c9cd3e8049eed72c4f4bc18ib258",
          "fecha": "2020-10-07T00:34:49.251+00:00",
          "mesero": "Brayan Cortez",
          "tipo": "RECOGER",
          "domicilioEtapa": 0,
          "mesa": "",
          "cliente": {
            "_id": "2269fc1c847d0a718a61010i3d0u9216",
            "nombreCompleto": "Vicente Fernandez",
            "telefonoCasa": "2434-2323",
            "celular": "",
            "whatsapp": "7234-2342",
            "direccion": "Colonia Lamatepec, pasaje el jocote casa 24B",
            "municipio": "Santa Ana",
            "departamento": "Santa Ana",
            "puntoDeReferencia": "",
            "observaciones": "",
            "fechaRegistro": "2020-07-08T21:55:18.859+00:00"
          },
          "cobrada": false,
          "entregada": false,
          "observacion": "Sin cebolla",
          "tiempoPreparacion": null,
          "detalleOrden": [
            {
              "nombre": "Deditos de Queso",
              "cantidad": 2,
              "precio": 2.5,
              "categoria": {
                "_id": "2269fc1c847d0a718a6101833d000936",
                "nombre": "Entradas"
              },
              "subtotal": 5,
              "preparado": true
            }
          ],
          "subtotal": 5,
          "propina": 0.5,
          "costoEnvio": 1.25,
          "total": 6.75
        },
        {
          "_id": "2269fc1c847d0a718a65h1i83d02a678",
          "_rev": "3-ff13c9cd3e8049eed72c4f4bc1o1b258",
          "fecha": "2020-10-07T00:34:49.251+00:00",
          "mesero": "Mario Rivera",
          "tipo": "RECOGER",
          "domicilioEtapa": 1,
          "mesa": "",
          "cliente": {
            "_id": "2269fc1c847d0a718a6101833d00o616",
            "nombreCompleto": "Marco Antonio Solis",
            "telefonoCasa": "2434-2323",
            "celular": "",
            "whatsapp": "7234-2342",
            "direccion": "Colonia Lamatepec, pasaje el jocote casa 24B",
            "municipio": "Santa Ana",
            "departamento": "Santa Ana",
            "puntoDeReferencia": "",
            "observaciones": "",
            "fechaRegistro": "2020-07-08T21:55:18.859+00:00"
          },
          "cobrada": false,
          "entregada": true,
          "observacion": "Sin cebolla",
          "tiempoPreparacion": null,
          "detalleOrden": [
            {
              "nombre": "Deditos de Queso",
              "cantidad": 2,
              "precio": 2.5,
              "categoria": {
                "_id": "2269fc1c847d0a718a6101833d000936",
                "nombre": "Entradas"
              },
              "subtotal": 5,
              "preparado": true
            }
          ],
          "subtotal": 5,
          "propina": 0.5,
          "costoEnvio": 1.25,
          "total": 6.75
        }
      ]
    }
  },
  methods: {
    ...mapMutations(["showMessage"]),
    filtro(valor_orden) {
      if (this.searchDisplay === "") return true;
      let array = (this.datos[valor_orden].id + this.datos[valor_orden].cliente.nombreCompleto).toUpperCase();
      return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
    },
    completeEtapa(orden) {
        this.loading = true;
        setTimeout(() => (this.loading = false), 1500);
          orden.entregada=true;
    }
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
</style>