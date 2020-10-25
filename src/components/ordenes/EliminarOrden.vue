
    <template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-2 text-center action"
          v-bind="attrs"
          v-on="on"
          small
          fab
          color="red"
          @click="showMessage(snackbar)"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
      </template>

      <v-card>
        <v-card-title class="headline red accent-4 text--white title text-uppercase">
          Eliminar Orden
        </v-card-title>

        <v-card-text class="text-center">
          <p>
            ¿Está seguro de eliminar la orden de
            <span>{{ orden.cliente.nombreCompleto }}</span>?
          </p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="actions" color="red" @click="dialog = false"><v-icon>mdi-delete</v-icon> Eliminar </v-btn>
          <v-btn class="actions" color="green accent-4" @click="dialog = false"> Cancelar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "EliminarOrden",
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
.actions{
  color: #fff;
  transition: 0.5s;
  position: relative;
}
.actions:hover{
  transform: scale(1.1);
}
.actions::before{
  content: '';
  position: absolute;
  top: 0;
  padding: 0;
  width: 0%;
  height: 100%;
  background: rgb(156, 9, 224);
  opacity: 0.8;
  transition: 0.5s;
}
.actions:hover::before{
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

p {
  font-size: 3em;
  letter-spacing: 1px;
  line-height: 1em;
  color: black;
}
span{
    color: red;
  font-weight: 500;  
}
.title{
    color: #fff;
    margin-bottom: 2em;
}
</style>