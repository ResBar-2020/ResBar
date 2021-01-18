<template>
<div>
  <div class="tickets">
    <div class="ticketcliente">
      <p class="centrado">
        <br />
            {{this.parametros[0].valor}}
        <br />
        Telefono: {{this.parametros[2].valor}}
        <br />
        Nit:  {{this.parametros[3].valor}}
        <br />
        Giro: {{this.parametros[4].valor}}
        <br />
        Direccion: {{this.parametros[5].valor}}
      </p>
      <p class="izquierda">
        <hr class="hr1">
        {{new Date().toLocaleString()}}
        <br />
        Cuenta: 
        <br />
        Mesa: 
        <br />
        Mesero:
        <br />
        <hr class="">
      <p>

      <table class="ticketcliente">
        <thead>
          <tr>
            <th class="producto">Producto</th>
            <th class="cantidad">Ct</th>
            <th class="precio">c/u</th>
            <th class="total">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td class="producto">Naranjas</td>
            <td class="cantidad"> 2 </td>
            <td class="precio">$2.30</td>
            <td class="precio">$4.60</td>
          </tr>
        </tbody>
      </table>
      <div class="total">
      <div class="izquierda">
        <hr class="hr1">
        Subtotal: $4.30
        <br />
        Propina: $0.70
        <br />
        Total: $5.00
        <br />
        Efectivo: $5.00
        <br />
        Cambio: $0.00
        <br />
        <hr class="hr1">
        {{this.parametros[1].valor}}
      </div>
      </div>
    </div>
  </div>
    <v-btn block @click="imprimirElemento()">
        Imprimir
  </v-btn>
</div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      preparados: [],
      nopreparados: [],
      propina: null,
    };
  },
  created() {
    console.log('creando'); 
    this.getParametros();
  },
  updated() {
    this.imprimirElemento();
  },
  computed: {
    ...mapGetters(["parametros"]),
  },
  methods: {
    ...mapActions(["getParametros"]),

    imprimirElemento() {
      var elemento = document.querySelector(".tickets");
      var ventana = window.open("", "PRINT", "height=800,width=1000");
      ventana.document.write(
        "<html><head><title>" + document.title + "</title>"
      );
      ventana.document.write('<link rel="stylesheet" href="./ticket.css">');
      ventana.document.write("</head><body >");
      ventana.document.write(elemento.innerHTML);
      ventana.document.write("</body></html>");
      ventana.document.close();
      ventana.focus();
     ventana.onload = function() {
        ventana.print();
        ventana.close();
      };
      //this.$router.push("dashboard");
      return true;
    },

    obtenerParametros() {
      this.getParametros().then(r => {
        this.parametros = r;
      }).catch(e =>{
        console.log('Error obteniendo los parametros', e);
      })
    },

    filtrarPreparados() {
     /*
     this.preparados = this.store.cuentaTicket.resumen.filter(
        producto => preparado === true
      );

      this.nopreparados = this.store.cuentaTicket.resumen.filter(
        producto => preparado === false
      );
    */
      console.log(this.preparados);
      console.log(this.nopreparados);
    },
  }
};
</script>

<style scoped>
td,
th,
tr,
table {
  border-top: 1px solid black;
  border-collapse: collapse;
}
td.producto,
th.producto {
  width: 75px;
  max-width: 75px;
}
td.cantidad,
th.cantidad {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}
td.precio,
th.precio {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}
.centrado {
  text-align: center;
  align-content: center;
}
.izquierda {
  text-align: left;
  align-content: left;
}
.ticket {
  width: 155px;
  max-width: 155px;
  font-size: 11px;
  font-family: "Times New Roman";
}
img {
  max-width: inherit;
  width: inherit;
}
</style>