<template>
  <v-app>
    <v-row justify="center">
      <v-dialog v-model="selectClient" persistent max-width="700" scrollable>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on"
            ><v-icon right dark class="mx-1">mdi-plus-circle-outline</v-icon
            >Cliente
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Seleccionar Cliente
          </v-card-title>
          <v-card-text>
            <!-- Inica fila de boton agregar y campo de texto buscar -->
            <v-row id="fila">
              <!-- Btn agregar cliente -->
              <v-col cols="3">
                <v-btn
                  class="my-5"
                  color="primary"
                  @click="modalAgregar = true"
                >
                  Nuevo<v-icon dark> mdi-plus-circle </v-icon>
                </v-btn>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" icon small v-bind="attrs" v-on="on">
                      <v-icon dark>
                        mdi-help-circle
                      </v-icon>
                    </v-btn>
                  </template>
                  <span
                    >Dar clic en NUEVO, si el cliente no está registrado</span
                  >
                </v-tooltip>
              </v-col>
              <!-- Campo de texto Buscar cliente -->
              <v-col cols="6">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- Termina fila de boton agregar y campo de texto buscar -->
            <v-simple-table id="myTable">
              <template v-slot:default>
                <thead class="primary">
                  <tr>
                    <th id="tituloTabla" class="text-left white--text">
                      Nombre
                    </th>
                    <th id="tituloTabla" class="text-left white--text">
                      Celular
                    </th>
                    <th id="tituloTabla" class="text-left white--text">
                      WhatsApp
                    </th>
                    <th id="tituloTabla" class="text-left white--text">
                      Direccion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :class="key === selectedRow ? 'custom-highlight-row' : ''"
                    @click="rowSelect(key)"
                    v-for="(item, key) in datos"
                    :key="item.name"
                  >
                    <td>{{ item.nombreCompleto }}</td>
                    <td>{{ item.celular }}</td>
                    <td>{{ item.whatsapp }}</td>
                    <td>{{ item.direccion }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="red" color="white" text @click="selectClient = false">
              Cancelar
            </v-btn>
            <v-btn
              class="green"
              color="white"
              text
              @click="selectClient = false"
            >
              Agregar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Inicia Dialog para agregar Cliente -->
    <v-row>
      <v-col cols="12">
        <v-dialog v-model="modalAgregar" persistent max-width="500" scrollable>
          <v-card>
            <v-card-title class="headline">
              Agregar Cliente
            </v-card-title>
            <v-card-text>
              <template>
                <v-form v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="mx-auto">
                        <v-text-field
                          label="Nombre completo"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="mx-auto">
                        <v-text-field label="Teléfono de casa"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="mx-auto">
                        <v-text-field label="Celular" required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="mx-auto">
                        <v-text-field label="WhatsApp" required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="mx-auto">
                        <v-text-field label="Dirección" required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="mx-auto">
                        <v-text-field
                          label="Departamento"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="mx-auto">
                        <v-text-field label="Municipio" required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="mx-auto">
                        <v-text-field
                          label="Punto de referencia"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="mx-auto">
                        <v-text-field label="Observaciones"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="red"
                color="white"
                text
                @click="modalAgregar = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                class="green"
                color="white"
                text
                @click="modalAgregar = false"
              >
                Aceptar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <!-- Termina Dialog para agregar Cliente -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      modalAgregar: false,
      selectedRow: null,
      selectClient: false,
      datos: [
        {
          nombreCompleto: "Jon Jairo",
          celular: 71815475,
          whatsapp: 78458745,
          direccion: "Lomas Turbas",
        },
        {
          nombreCompleto: "Roberto Pastrano",
          celular: 74575475,
          whatsapp: 74578745,
          direccion: "Barrio Nuevo",
        },
        {
          nombreCompleto: "Pastor Mamberoy",
          celular: 70211010,
          whatsapp: 70211010,
          direccion: "La unión",
        },
        {
          nombreCompleto: "Rolando Mambe",
          celular: 78787878,
          whatsapp: 78787878,
          direccion: "Colonia el Panteon",
        },
        {
          nombreCompleto: "Raul Rubier",
          celular: 71717171,
          whatsapp: 71717171,
          direccion: "Namekuseiyin",
        },
        {
          nombreCompleto: "Mario pastorini",
          celular: 79595959,
          whatsapp: 79595959,
          direccion: "Ciudad nueva",
        },
      ],
    };
  },
  methods: {
    rowSelect(id) {
      console.dir(id);
      this.selectedRow = id;
    },
  },
};
</script>

<style>
.custom-highlight-row {
  background-color: #eeeeee;
}
#fila {
  text-align: left;
  align-items: center;
}
#tituloTabla {
  font-size: 16px;
}
#myTable {
  border: 1px solid lightgray;
}
</style>
