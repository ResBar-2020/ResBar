new Vue({
  el: '#appRESBAR',
  data: {
    bitacoras: [],

    inicio: null,
    hasta: null,

    limitePage: 10,
    actualPage: 0,

    //urlApi: `${ApiRestUrl}/bitacoras`,

    urlApi: `http://localhost:3000/bitacoras/`,

    txtBuscar: ""
  },
  created: function () {
    this.getAllBitacoras();

    if (!localStorage.vue_session_key) {
      window.location = "./login.html"
    }

  },

  methods: {

    /*
    Trae paginado los los datos a mostrar
    */
    getAllBitacoras: function () {
      axios.get(this.urlApi + `?filter[limit]=${this.limitePage}&filter[skip]=${this.actualPage}`).then(
        response => {
          this.bitacoras = response.data;
          console.log(response.data);
        }
      ).catch(ex => { console.log(ex) })
    },


    /*
    Busca por fechas los datos, y los pagina 
    */
    getBuscarPorFechas: function () {
      console.log("fecha inicio: " + inicio);
      console.log("fecha final: " + hasta);
     

      let vm = this
      let inicioformat = vm.inicio; //le da formato a la fecha de input
      let hastaformat = vm.hasta;   //le da formato a la fecha de input

      console.log("fecha inicio: " + inicioformat); //ver si la fecha tiene el formato correcto
      console.log("fecha final: " + hastaformat);   //ver si la fecha tiene el formato correcto

      this.displayOption = "Buscando";

      //Validaciones de fechas
      if (hastaformat === null && inicioformat === null) { //error no ingreso datos
        alert("Error ingrese los datos");
      } else {
        if (hastaformat === null) { //la fecha final no ingresada
          alert("Error ingrese el hasta los datos");
        }
        if (inicioformat === null) { //la fecha inicio no ingresada
          alert("Error ingrese inicio los datos");
        }
      }

      if (hastaformat < inicioformat) { //la fecha final es mayor que la fecha inicial (no se puede buscar)
        alert("La fecha final debe ser mayor a la fecha inicial");
      }

      if (hastaformat > inicioformat) {  // fecha ingresada correctamente
        console.log('dentro del bucle' + this.actualPage);
        //ejemplo de consulta de busqueda por fechas en la api de LoopBack
        //http://localhost:3000/bitacoras?filter[where][fecha][between][0]=2020-05-21&filter[where][fecha][between][1]=2020-05-23&filter[limit]=10&filter[skip]=0

        axios.get(this.urlApi + `?filter[where][fecha][between][0]=` + inicioformat + `&filter[where][fecha][between][1]=` + hastaformat + `&filter[limit]=${this.limitePage}&filter[skip]=${this.actualPage}`).then(
          response => {
            this.bitacoras = response.data;
            console.log(response.data);
          }
        ).catch(ex => { console.log(ex) })
      }
    },

    /*
    Borra los datos del div de buscar por fechas y buscador por texto 
    */
    borrarFiltros() {
      //console.log("limpiador de filtros");
      this.displayOption = "Borrando filtros";
      console.log("mensaje " + this.displayOption);
      this.txtBuscar = '';
      this.inicio = "null";
      this.hasta = null;
      this.getAllBitacoras();
    },

    /*
    Busca por el search texto en los campos
    */
    buscador: function (x) {

      if (this.txtBuscar == "")
        return true;

      var data = this.bitacoras[x].id + this.bitacoras[x].fecha + 
        this.bitacoras[x].accion + this.bitacoras[x].nombrecompleto +
        this.bitacoras[x].loggin + this.bitacoras[x].descripcion;

      data = data.toUpperCase();

      if (data.indexOf(this.txtBuscar.toUpperCase()) >= 0)
        return true;
      else
        return false;
    },

    /*
    Paginador siguiente
    */
    siguientePage: function () {
      this.actualPage += 10;

      if (typeof this.inicio === "object" || typeof this.hasta === "object") {
        console.log('el paginado hacia delante de todos los datos');
        this.getAllBitacoras();
      } else {
        console.log('el paginado hacia delante de rango de datos');
        this.getAllBitacoras();
      }

    },


    /*
    Paginador anterior
    */
    anteriorPage: function () {
      if (this.actualPage > 1) this.actualPage -= 10;
      if (typeof this.inicio === "object" || typeof this.hasta === "object") {
        console.log('el paginado hacia atras de todos los datos');
        this.getAllBitacoras();
      } else {
        console.log('el paginado hacia atras de rango de datos');
        this.buscarFechas();
      }
    },

    /*
    salir e ir al login
    */
    salir: function () {
      var opcion = confirm('Seguro que quiere salir?')
      console.log(opcion)
      if (opcion) {
        logout()
        window.location = "./login.html"
      }
    }

  },

  computed: {
    /*
    validacion del boton (lo pone en disable) anterior por si quiere ir a un lugar donde no hay datos
    */
    irPagAnterior() {
      return this.actualPage === 0;
    },
    /*
    validacion del boton (lo pone en disable) siguiente por si quiere ir a un lugar donde no hay datos
    */
    irPagSiguiente() {
      console.log("current page" + this.actualPage);
      console.log("datos: " + this.bitacoras.length);

      return this.actualPage > this.bitacoras.length;
    },

  }
});