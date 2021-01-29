<template>
  <div class="d-flex">
    <p
      v-if="orden.domicilioEtapa != 2"
      :style="{ 'background-color': color, 'border-radius': borde }"
      class="semaforo"
    >
      {{ tiempoTranscurrido }}
    </p>
    <span class="seman" v-else>
      Entregada
      <v-icon class="text-center " color="white"
        >mdi-check-circle-outline</v-icon
      >
    </span>
    <span
      v-if="mostrarBtn"
      class="btn btn-sm semaforoBtn text-center"
      @click="modificartiempo"
    >
      <v-icon class="text-center " color="black">{{ icono }}</v-icon>
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "Semaforo",
  props: ["orden"],
  computed: {
    ...mapGetters(["parametros"]),
  },
  data() {
    return {
      local: true,
      maxim: 0,
      ordenLocal: { ...this.orden },
      timeInicial: 0,
      color: "#00579c",
      tiempo: null,
      tiempoTranscurrido: "00:00:00",
      mostrarBtn: true,
      porcentaje: 0,
      borde: "",
      etapa: "",
      icono: "mdi-timer-off",
    };
  },

  methods: {
    async guardarCambios() {
      await this.updateOrden(this.ordenLocal);
      this.mostrarBtn = false;
      this.tiempoPreparacion = "null";
      this.borde = "20px 20px 20px 20px";
      this.tiempoTranscurrido = "Entregado";
      this.color = "#00579c";
      console.log(this.tiempoTranscurrido);

     
    },

    modificartiempo() {
      if (this.local == true) {
        Swal
          .fire({
            title: "¿Desea detener el conteo?",
            icon: "question",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, ¡Detener!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.orden.tiempoPreparacion = null;
              this.orden.domicilioEtapa = 2;
              this.ordenLocal = this.orden;
              this.guardarCambios();
              Swal.fire(
                "Detenido!",
                "El tiempo se detuvo exitosamente",
                "success"
              );
            }
          });
      }
    },

    cambiarValor() {
      const self = this;

      if (
        String(self.orden.tiempoPreparacion) != "null" &&
        String(
          self.ordenLocal.tiempoPreparacion != "null" && this.mostrarBtn == true
        )
      ) {
        var tiempoinicio = Date.parse(self.orden.tiempoPreparacion);

        setInterval(function() {
          /* app.timeInicial = parseFloat(app.timeInicial) + 1;
        app.tiempoTranscurrido = String(app.timeInicial);
        console.log(app.tiempoTranscurrido);*/

          var t = new Date();
          var segundos = (t - tiempoinicio) / 1000;
          if (
            String(self.orden.tiempoPreparacion) != "null" &&
            String(
              self.ordenLocal.tiempoPreparacion != "null" &&
                this.mostrarBtn == true
            )
          ) {
            self.tiempoTranscurrido = self.secondsToHMS(segundos);
          } else {
            self.color = "#00579c";
          }

          self.porcentaje = (segundos / 60 / parseFloat(self.maxim)) * 100;

          self.conversion();

          if (self.local == true) {
            self.icono = "mdi-timer-off";

            if (self.porcentaje < 60 && segundos >= 0) {
              //verde
              self.color = "#10752D";
              self.borde = "20px 0 0 20px";
            } else if (
              self.porcentaje > 60 &&
              self.porcentaje < 100 &&
              segundos >= 0
            ) {
              //#e3d10e
              self.color = "#e3d10e";
              self.borde = "20px 0 0 20px";
            } else if (isNaN(segundos)) {
              self.color = "#00579c";
            } else {
              if (self.mostrarBtn == true) {
                self.color = "red";
              } else {
                self.color = "#00579c";
              }
            }
          } else {
            self.mostrarBtn = false;
            self.borde = "20px 20px 20px 20px";

            if (self.orden.domicilioEtapa == 0) {
              self.color = "#0ab6ff";
            } else if (self.orden.domicilioEtapa == 1) {
              self.color = "#238dd9";
            } else {
              this.orden.tiempoPreparacion = null;
              this.ordenLocal = this.orden;
              this.guardarCambios();
              self.color = "#00579c";
              self.tiempoTranscurrido = "Entregado";
            }
          }
        }, 1000);
      } else {
        self.tiempoTranscurrido = "Entregado";
        self.color = "#00579c";
        self.mostrarBtn = false;
        this.borde = "20px 20px 20px 20px";
      }
    },

    mostrar() {},

    conversion() {
      if (this.orden.tipo == "RECOGER" || this.orden.tipo == "DOMICILIO") {
        this.local = false;
        this.maxim =
          parseFloat(this.parametros[7].valor) +
          parseFloat(this.parametros[9].valor);
      } else {
        this.maxim = parseFloat(this.parametros[7].valor);
      }
    },

    secondsToHMS: function(secs) {
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

    ...mapActions(["updateOrden", "getOrdenes", "getParametros"]),
  },
  mounted() {
    this.cambiarValor();
  },
  created() {
    this.getParametros();
  },
};
</script>

<style scoped>
.semaforo {
  border-radius: 20px 0 0 20px;
  padding: 4px 15px;
  width: 70%;
  height: 100%;
  border: 1px;
  text-align: center;
  color: rgb(255, 255, 255);
  text-shadow: 0 5px 10px rgba(100, 0, 0, 0.3);
  transition: 0.5s;
  box-sizing: border-box;
}

.semaforo:hover {
  transform: scale(1.1);
}

.semaforoBtn {
  border-radius: 0 20px 20px 0;
  width: 30%;
  height: 100%;
  padding: 3px;
  background: white;
  color: #c21c00;
  border: 1px solid #c21c00;
  transition: 0.4s;
  box-sizing: border-box;
}

.semaforoBtn:hover {
  background: #c21c00;
  color: #fff;
}

.mdi-timer-off {
  height: 0.5em;
}

.seman {
  border-radius: 20px 20px 20px 20px;
  padding: 2px 15px;
  width: 90%;
  text-align: center;
  color: rgb(255, 255, 255);
  text-shadow: 0 5px 10px rgba(100, 0, 0, 0.3);
  transition: 0.5s;
  background-color: #00579c;
}

.seman:hover {
  transform: scale(1.1);
}
</style>
