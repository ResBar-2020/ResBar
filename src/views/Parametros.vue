<template>
  <v-app>
    <header-dashboard
      title="Resbar Parametros"
      subtitle="Parametros"
    ></header-dashboard>
    <v-container>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field v-model="nombreNegocio" required>
                <template v-slot:label>
                  Nombre del negocio
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-store
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="8">
              <v-text-field v-model="descTicket" required>
                <template v-slot:label>
                  Descripcion final (pie de ticket)
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-file
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-text-field v-model="telefono" required>
                <template v-slot:label>
                  Telefono
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-phone
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-text-field v-model="nit" required>
                <template v-slot:label>
                  NIT
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-card-bulleted-outline
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-text-field v-model="giro" required>
                <template v-slot:label>
                  Giro
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-office-building
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-text-field v-model="direccion" required>
                <template v-slot:label>
                  Direccion
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-map
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-checkbox v-model="imprimirTicket" required>
                <template v-slot:label>
                  Imprimir ticket de productos preparados
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-printer
                  </v-icon>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-text-field v-model="tiempoPreparacion" type="number">
                <template v-slot:label>
                  Tiempo máximo de preparación de orden (minutos)
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-clock-fast
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-text-field v-model="propina" type="number">
                <template v-slot:label>
                  Propina ($)
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-cash
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-text-field v-model="tiempoDomicilio" type="number">
                <template v-slot:label>
                  Tiempo máximo de entrega domicilio (minutos)
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-clock-fast
                  </v-icon>
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-motorbike
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-text-field v-model="costoDomicilio" type="number">
                <template v-slot:label>
                  Costo de envio a domicilio ($)
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-cash
                  </v-icon>
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-motorbike
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-select :items="idiomas">
                <template v-slot:label>
                  Idioma del sistema
                  <v-icon style="vertical-align: middle; color: darkblue">
                    mdi-earth
                  </v-icon>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="8">
              <v-btn color="primary" elevation="2" rounded>ACTUALIZAR</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </v-app>
</template>


<script>
import { mapMutations } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
export default {
  components: { HeaderDashboard },
  data() {
    return {
      snackbar: {
        message: "desde parametros",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["showMessage"]),
  },
};
</script>

