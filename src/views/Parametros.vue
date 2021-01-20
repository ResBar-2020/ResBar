<template>
  <v-app>
    <header-dashboard
      title="Resbar Parametros"
      subtitle="Parametros"
    ></header-dashboard>
    <v-container>
      <v-form v-model="valid">
        <v-container>
          <div v-for="parametro in parametros" :key="parametro.id">
            {{parametro.value}}
            </div>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field v-model="parametros[0].valor" required>
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
              <v-text-field v-model="parametros[1].valor" required>
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
              <v-text-field v-model="parametros[2].valor" required>
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
              <v-text-field v-model="parametros[3].valor" required>
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
              <v-text-field v-model="parametros[4].valor" required>
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
              <v-text-field v-model="parametros[5].valor" required>
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
              <v-checkbox v-model="parametros[6].valor" required>
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
              <v-text-field v-model="parametros[7].valor" type="number">
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
              <v-text-field v-model="parametros[8].valor" type="number">
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
              <v-text-field v-model="parametros[9].valor" type="number">
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
              <v-text-field v-model="parametros[10].valor" type="number">
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
              <v-text-field v-model="parametros[11].valor" append-icon="mdi-earth" disabled>
              </v-text-field>
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
import { mapMutations, mapGetters, mapActions } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
export default {
  components: { HeaderDashboard },
  data() {
    return {
      valid: true,
      snackbar: {
        message: "Desde parametros",
        timout: 2000,
      },
    };
  },
  methods: {
    ...mapMutations(["setParametros", "languajes"]),
    ...mapActions(["obtenerTodos", "getParametros", "updateParametros", "getIdioma"]),
  },
  computed: {
    ...mapGetters(["parametros", "idiomas"]),
  },
  created() {
    this.getIdioma();
    this.getParametros();
  },
};
</script>

