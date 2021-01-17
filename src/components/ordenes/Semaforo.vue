<template>
  <div class="d-flex">
    <p id="screen" class="semaforo"> 00:00:00</p>
    <span class="btn btn-sm semaforoBtn" @click="modificartiempo">
      <i class="fa fa-times-circle" aria-hidden="true"></i>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";


export default {
  name: "Semaforo",
  props: ["orden"],
  data() {
    return {
      local: true,
      maxim: 10,
      maximolocal: 8,
      maximofuera: 20,
      ordenLocal: { ...this.orden },
      timeInicial: 0,
      pantalla:" ",
      tiempo:null,
      

    };
  },

  methods: {
    async guardarCambios() {
      await this.updateOrden(this.ordenLocal);
      //alerta
    },

    modificartiempo() {
      var mensaje = confirm("¿Desea detener el conteo?");

      if (mensaje) {
        this.orden.tiempoPreparacion = null;
        this.ordenLocal = this.orden;
        this.guardarCambios();
      }
    },
    
    
    ...mapActions(["updateOrden", "getOrdenes"]),
  },
};
</script>

<style scoped>
.semaforo {
  border-radius: 20px 0 0 20px;
  padding: 2px 15px;
  width: 90%;
  text-align: center;
  color: white;
  text-shadow: 0 5px 10px rgba(100, 0, 0, 0.3);
  transition: 0.5s;
}

.semaforo:hover {
  transform: scale(1.1);
}

.semaforoBtn {
  border-radius: 0 20px 20px 0;
  width: 20%;
  padding: 2px;
  background: transparent;
  color: #c21c00;
  border: 1px solid #c21c00;
  transition: 0.4s;
}

.semaforoBtn:hover {
  background: #c21c00;
  color: #fff;
}
</style>
