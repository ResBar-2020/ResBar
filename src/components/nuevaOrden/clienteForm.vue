<template>
  <div>
    <v-container>
      <section>
        <v-container class="row align-baseline">
          <v-row>
            <v-col cols="11">
              <v-text-field label="Cliente" disabled></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn depressed small color="primary" @click="dialog = true"
                >+</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
        <v-switch v-model="domicilio" label="A domicilio"></v-switch>
        <v-text-field v-if="!domicilio" label="Mesero"></v-text-field>
        <v-text-field
          v-if="!domicilio"
          label="Mesa"
          type="number"
        ></v-text-field>
        <v-textarea
          v-show="domicilio"
          outlined
          name="input-7-4"
          label="Dirección"
          value=""
        ></v-textarea>
        <v-textarea
          outlined
          name="input-7-4"
          label="Observaciones"
          value=""
        ></v-textarea>
          <v-row>
            <v-col>
              <v-btn class="white--text" block color="grey"> Cancelar </v-btn>
            </v-col>
            <v-col>
              <v-btn class="white--text" block color="indigo"> Verificar </v-btn>
            </v-col>
          </v-row>
        
      </section>
      <!-- modal clientes -->
      <div>
        <v-dialog v-model="dialog" max-width="80%">
          <v-card>
            <v-card-title class="headline"> Clientes </v-card-title>

            <v-card-text>
              <v-card>
                <v-card-title>
                  Clientes
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  :search="search"
                ></v-data-table>
              </v-card>
            </v-card-text>
            <v-container ml-3>
              <v-btn
                depressed
                color="primary"
                @click="(modalNuevoCliente = true), (dialog = false)"
              >
                Nuevo Cliente
              </v-btn>
            </v-container>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">
                Cancelar
              </v-btn>

              <v-btn color="green darken-1" text @click="dialog = false">
                Agregar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <!--Fin modal clientes -->
      <!-- Modal nuevo Cliente -->
      <v-row justify="center">
        <v-dialog v-model="modalNuevoCliente" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Registro de cliente</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <!-- Contenido de modal -->
              </v-container>
              <small>Aqui debe ir componente registro de cliente</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="modalNuevoCliente = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="modalNuevoCliente = false"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Fin modal nuevo Cliente -->
    </v-container>
  </div>
</template>

<script>
export default {
  name: "clienteForm",
  props: {},
  data() {
    return {
      domicilio: false,
      dialog: false,
      modalNuevoCliente: false,
      search: "",
      headers: [
        { text: "Nombre", value: "Nombre" },
        { text: "Celular", value: "Celular" },
        { text: "WhatsApp", value: "WhatsApp" },
        { text: "Dirección", value: "Direccion" },
      ],
      desserts: [
        {
          Nombre: "CR7",
          Celular: "7777 - 9999",
          WhatsApp: "7888 - 8888",
          Direccion: "Carretera a chalchuapa, casa #7. ",
        },
        {
          Nombre: "Antonio",
          Celular: "7777 - 9999",
          WhatsApp: "7888 - 8888",
          Direccion: "Ciudad real, casa #7. ",
        },
        {
          Nombre: "Xavi",
          Celular: "7777 - 9999",
          WhatsApp: "7888 - 8888",
          Direccion: "Iglesia del palmar ",
        },
      ],
    };
  },
};
</script>
<style scoped>
</style>