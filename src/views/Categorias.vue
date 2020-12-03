<template>
  <div>
    <div v-for="idioma in idiomas" :key="idioma._id">
      <header-dashboard
        title="Resbar Categorias"
        subtitle="Administracion de Categorias"
      ></header-dashboard>

      <v-container>
        <v-row>
          <v-col cols="4" offset="1">
            <v-text-field
              label="Buscar en Categorias"
              v-model="searchDisplay"
            ></v-text-field>
          </v-col>
          <v-col cols="4" offset="1">
            <v-btn
              elevation="13"
              outlined
              @click="showMessage(snackbar)"
              class="primary white--text my-3"
              ><v-icon>mdi-plus-circle-outline </v-icon> Nueva Categoria</v-btn
            >
          </v-col>
        </v-row>
      

        <!--Comienza la tabla-->
        
        <v-row>
          <v-col class="overflow-auto col-12">
            <table class="col-12">
              <thead>
                <th scope="col" class="d-none d-md-table-cell">Id</th>
                <th scope="col">Categoria</th>
                <th scope="col">Acciones</th>
              </thead>
              <tbody>
                <tr
                  v-for="(categoria, index) in allCategorias"
                  :key="index"
                  >
                  <td class="d-none d-md-table-cell">
                    {{ String(categoria._id.substring(28)) }}
                  </td>
                  <td>{{ categoria.nombre}}</td>
                  <td>
                    <nobr>
                      icono 1
                      icono 2
                    </nobr>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import HeaderDashboard from "../components/headerDashboard";
export default {
  components: { HeaderDashboard },
  computed: {
    ...mapGetters(["allCategorias", "idiomas"]),
  },
  data() {
    return {
      snackbar: {
        message: "desde categorias",
        timout: 2000,
      },
      searchDisplay: "",
    };
  },
  methods: {
    ...mapMutations(["setCategorias", "showMessage"]),
    ...mapActions(["getCategorias", "getIdioma"]),
  },
  created() {
    this.getCategorias();

    this.getIdioma();

    //console.log("xd:" + this.idiomas.nombre);
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

</style>
