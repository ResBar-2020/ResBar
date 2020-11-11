<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              dark
              v-bind="attrs"
              v-on="on"
              class="ma-2 mx-2"
              color="orange"
              text-color="white"
            >
              <v-icon dark> mdi-format-list-bulleted-square </v-icon>
              Detalle</v-chip
            >
          </template>
          <v-card>
            <v-tabs
              v-model="tab"
              background-color="indigo darken-4"
              centered
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-1">
                Detalle Orden
                <v-icon>mdi-format-list-bulleted-square</v-icon>
              </v-tab>
              <v-tab href="#tab-2">
                Cliente
                <v-icon>mdi-account</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item :value="'tab-1'" class="bg">
                <v-row>
                  <v-col>
                    <v-card-title>
                      <span class="headline prod_title">Productos Adquiridos</span>
                    </v-card-title>
                    <v-card-text
                      v-for="detalle in orden.detalleOrden"
                      :key="detalle.nombre"
                    >
                      <span class="productos">{{ detalle.cantidad }} </span>
                      <span class="productos">{{ detalle.nombre }} </span>
                      <span class="productos">${{ detalle.subtotal }} </span>
                    </v-card-text>
                  </v-col>
                  <v-col cols="6">
                  <div>
                    <label class="box total"
                      >Consumo: <span>${{ orden.total }}</span></label
                    >
                    <label class="box envio"
                      >Costo de Envio:
                      <span>${{ orden.costoEnvio }}</span></label
                    >
                  </div>
                  </v-col>
                </v-row>
              </v-tab-item>
              <!-- tab numero dos -->
              <v-tab-item :value="'tab-2'" class="bg">
                <v-card-title>
                  <span class="headline prod_title">Contacto del cliente:</span>
                </v-card-title>
                <div>
                  <v-card-text>
                    <span class="cliente">Nombre:</span>
                    <span class="item">
                      {{ orden.cliente.nombreCompleto }}</span
                    >
                  </v-card-text>
                  <v-card-text>
                    <span class="cliente">Whatsapp:</span>
                    <span class="item"> {{ orden.cliente.whatsapp }}</span>
                  </v-card-text>
                  <v-card-text>
                    <span class="cliente">Telefono:</span>
                    <span class="item"> {{ orden.cliente.telefonoCasa }}</span>
                  </v-card-text>
                  <v-card-text>
                    <span class="cliente">Celular:</span>
                    <span class="item"> {{ orden.cliente.celular }}</span>
                  </v-card-text>
                  <v-card-text>
                    <span class="cliente">Dirección:</span>
                    <p class="item" style="margin-top: 9px">
                      {{ orden.cliente.direccion }}
                    </p>
                  </v-card-text>
                  <v-card-text>
                    <span class="cliente">Referencia:</span>
                    <span class="item">
                      {{ orden.cliente.puntoDeReferencia }}</span
                    >
                  </v-card-text>
                </div>
              </v-tab-item>
            </v-tabs-items>
            <v-card-actions class="indigo darken-4">
              <v-spacer></v-spacer>
              <v-btn color="purple lighten-1" text @click="dialog = false">
                Cerrar
              </v-btn>
              <v-btn color="pink accent-2" text @click="dialog = false">
                Aceptar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  name: "DetalleDomicilio",
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
.productos {
  font-weight: 500;
  font-size: 1em;
 color: #fff;
}
.prod_title {
  text-transform: uppercase;
  color: #fff;
  font-weight: 500;
}
.box {
  position: relative;
  padding: 5px;
  border-radius: 15px;
  margin: 5px;
  color: rgb(255, 255, 255);
  box-shadow: 0 5px 10px #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1.5em;
  transition: 0.5s;
}
.box:hover{
  box-shadow: 10px 10px 20px #FFF;
}
.box span {
  font-weight: 700;
}
.total {
  background: linear-gradient(90deg, #514fbf 40%, rgba(94, 5, 136, 0.651) 100%);
}
.envio {
  background: linear-gradient(90deg, rgba(94, 5, 136, 0.651) 20%, #514fbf 40%);
}
.cliente {
  font-size: 1.1em;
  font-weight: 500;
  background: linear-gradient(90deg, #5e0588 30%, #4f57bf 80%);
  box-shadow: 0 5px 10px #fff;
  border-radius: 20px;
  color: #fff;
  padding: 10px;
  transition: 0.5s;
  cursor: pointer;
}
.bg {
  position: relative;
  overflow: hidden;
  background: rgb(100, 100, 100);
}
.item {
  position: relative;
  font-size: 1.1em;
  padding: 5px 10px 5px 10px;
  font-weight: 600;
  color: #fff;
  display: inline-block;
  position: relative;
  margin: 0;
  margin-left: 1em;
  transition: 0.5s ease-in-out;
}
.item::before{
  position: absolute;
  content: '';
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #4f69bf 50%, #d85583 100%);
  transition: 0.5s;
}
.item:hover::before{
  width: 100%;
  box-shadow: 0 0 10px #fff;
}
.bg::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  background: rgba(94, 5, 136, 0.651);
  transform: skew(-35deg);
  z-index: inherit;
}
</style>