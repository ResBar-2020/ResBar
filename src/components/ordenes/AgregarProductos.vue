
    <template>
  <div class="text-center" style="display: inline-block">
    <v-dialog v-model="dialog" width="900">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-2 text-center action"
          v-bind="attrs"
          v-on="on"
          small
          fab
          color="deep-purple"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </template>

      <v-card>
        <v-card-title
          class="headline teal darken-4 text--white title text-uppercase"
        >
          Agregar Productos a la Orden
        </v-card-title>

        <v-card-text>
          <v-row>
            <div class="informacion">
              <v-col cols="4">
                <label>Orden:</label
                ><span>{{ String(orden.doc._id.substring(18, 24)) }}</span>
              </v-col>
              <v-col cols="4">
                <label>Mesero:</label><span>{{ orden.doc.mesero }}</span>
              </v-col>
              <v-col cols="6">
                <label>Cliente:</label
                ><span>{{ orden.doc.cliente.nombreCompleto }}</span>
              </v-col>
            </div>
          </v-row>
          <hr />
          <v-row>
            <v-col cols="12">
              <h2 class="text-center">Menu</h2>
            </v-col>
            <v-col cols="5">
              <v-text-field label="Buscar Producto"></v-text-field>
            </v-col>
            <v-col cols="6" offset="1">
              <h3 class="text-center">Categorias</h3>
              <v-chip-group active-class="deep-orange darken-4" column>
                <v-chip class="text" color="cyan darken-3">Entradas</v-chip>
                <v-chip class="text" color="cyan darken-3">Platos</v-chip>
                <v-chip class="text" color="cyan darken-3">Bebidas</v-chip>
                <v-chip class="text" color="cyan darken-3">Postres</v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <table>
                <thead>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio Unitario</th>
                  <th scope="col">Cantidad</th>
                </thead>
                <tbody>
                  <tr>
                    <td>Dedos de Queso</td>
                    <td>$2.50</td>
                    <td>
                      <button class="btn">
                        <v-icon>mdi-minus</v-icon>
                      </button>
                      0
                      <button class="btn">
                        <v-icon>mdi-plus</v-icon>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Doritos de Queso</td>
                    <td>$2.50</td>
                    <td>
                      <button class="btn">
                        <v-icon>mdi-minus</v-icon>
                      </button>
                      0
                      <button class="btn">
                        <v-icon>mdi-plus</v-icon>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Papas Francesas</td>
                    <td>$2.25</td>
                    <td>
                      <button class="btn">
                        <v-icon>mdi-minus</v-icon>
                      </button>
                      0
                      <button class="btn">
                        <v-icon>mdi-plus</v-icon>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="actions" color="indigo darken-4" @click="dialog = false">
            Siguiente
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
export default {
  name: "AgregarProductosOrden",
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
h2, h3{
  text-decoration: underline;
  color: #000;
  font-size: 500;
}
.btn {
  position: relative;
  border: 2px solid rgb(83, 54, 97);
  border-radius: 5px;
  margin: 1px;
  outline: none;
  background: rgb(255, 255, 255);
  transition: 0.3s;
}
.btn:hover {
  background: rgb(83, 54, 97);
}
.v-icon:hover {
  color: rgb(255, 255, 255);
}
.v-icon {
  color: rgb(83, 54, 97);
  font-size: 1.5em;
  line-height: 0;
}

table {
  border-collapse: collapse;
  width: 100%;
}
th,
tr {
  text-align: center;
}
th {
  color: #fff;
  background: #37474F;
}
tr {
  color: #000;
  transition: 0.3s;
  cursor: pointer;
}
tbody tr:hover {
  color: #fff;
  background: #37474F;
}
td {
  padding-top: 0.2em;
}
.text {
  color: #fff;
}
.informacion {
  display: flex;
  text-align: center;
  padding-left: 10em;
}
.informacion label {
  text-transform: uppercase;
  font-weight: 500;
  color: #000;
}
.informacion span {
  color: #00695c;
  font-weight: 500;
  border-bottom: 1px solid #000;
  padding-left: 5px;
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
}
.action:hover {
  transform: scale(1.1) rotateZ(360deg);
}
.title {
  color: #fff;
}
</style>