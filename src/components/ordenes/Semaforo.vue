<template>
  <div class="d-flex">
    <p class="semaforo">{{ tiempoTranscurrido }}</p>
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
      pantalla: " ",
      tiempo: null,
      tiempoTranscurrido: "00:00:00",
      mostrarBtn: true,
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

    cambiarValor() {
     const self = this;
      
      var tiempoinicio = Date.parse(self.orden.tiempoPreparacion);
      
      setInterval(function() {
       
       /* app.timeInicial = parseFloat(app.timeInicial) + 1;
        app.tiempoTranscurrido = String(app.timeInicial);
        console.log(app.tiempoTranscurrido);*/

         var t = new Date();
         var segundos = (t - tiempoinicio) / 1000;
         self.tiempoTranscurrido=self.secondsToHMS(segundos);
         console.log(self.tiempoTranscurrido);






      }, 1000);
    },

      secondsToHMS: function (secs) {
      function z(n) {
        return (n < 10 ? "0" : "") + n;
      }
      var sign = secs < 0 ? "-" : "";
      secs = Math.abs(secs);
      return (
        sign +
        z((secs / 3600) | 0) +
        ":" +
        z(((secs % 3600) / 60) | 0) +
        ":" +
        parseInt(z(secs % 60))
      );
    },

    ...mapActions(["updateOrden", "getOrdenes"]),
  },
  mounted() {
    this.cambiarValor();
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
