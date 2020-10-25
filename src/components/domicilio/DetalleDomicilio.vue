<template>
  <div>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" width="600px">
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
              background-color="cyan darken-4"
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
              <v-tab-item :value="'tab-1'">
                <v-card-title>
                  <span class="headline">Productos Adquiridos</span>
                </v-card-title>
                <v-card-text v-for="detalle in orden.detalleOrden" :key="detalle.nombre">
                  {{ detalle.cantidad }}
                  {{ detalle.nombre }}
                  ${{ detalle.subtotal }}
                </v-card-text>
                <h3>
                  Consumo: ${{orden.total}}
                  Costo de Envio: ${{orden.costoEnvio}}
                </h3>
              </v-tab-item>
              <!-- tab numero dos -->
              <v-tab-item :value="'tab-2'">
                <v-card-title>
                  <span class="headline">Contacto del cliente:</span>
                </v-card-title>
                <v-card-text>
                 Nombre: {{ orden.cliente.nombreCompleto }}
                </v-card-text>
                <v-card-text>
                  Whatsapp:  {{ orden.cliente.whatsapp }}
                </v-card-text>
                <v-card-text>
                 Telefono:  {{ orden.cliente.telefonoCasa }}
                </v-card-text>
                <v-card-text>
                  Celular: {{ orden.cliente.celular }}
                </v-card-text>
                <v-card-text>
                  Dirección: {{ orden.cliente.direccion }}
                </v-card-text>
                <v-card-text>
                  Referencia: {{ orden.cliente.puntoDeReferencia }}
                </v-card-text>
              </v-tab-item>
            </v-tabs-items>
            <v-card-actions>
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
</style>