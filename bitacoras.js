new Vue({
  el: '#appRESBAR',
  data: {
    bitacoras: [],

    inicio: null,
    hasta: null,

    limitePage: 10,
    actualPage: 0,

    urlApi: `${ApiRestUrl}/bitacoras`,

    txtBuscar: "",
    logName: logName,
    accion: '',

    inicioDelete: null,
    hastaDelete: null,
    bitacorasDelete: [],
    admin: admin
  },

  created: function () {
    this.getAllBitacoras();
    if (localStorage.vue_session_key) {
      if (localStorage.getItem(VueSession.key) == '"mesero"') {
        window.location = "./ordenes.html"
      }
    } else {
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
          //console.log(response.data);
        }
      ).catch(ex => {
        console.log(ex)
      })
    },

    /*
    Busca por fechas los datos, y los pagina 
    */
    getBuscarPorFechas: function () {
      let vm = this
      let inicioformat = vm.inicio; //le da formato a la fecha de input
      let hastaformat = vm.hasta; //le da formato a la fecha de input

      //console.log("fecha inicio: " + inicioformat); //ver si la fecha tiene el formato correcto
      //console.log("fecha final: " + hastaformat);   //ver si la fecha tiene el formato correcto

      //Validaciones de fechas
      this.accion = 'exito';
      if (hastaformat === null && inicioformat === null) { //error no ingreso datos
        this.accion = 'danger1';
      } else {
        if (hastaformat === null) { //la fecha final no ingresada
          this.accion = 'danger2';
        }
        if (inicioformat === null) { //la fecha inicio no ingresada
          this.accion = 'danger3';
        }
      }

      if (hastaformat < inicioformat) { //la fecha final es mayor que la fecha inicial (no se puede buscar)
        this.accion = 'danger4';
      }

      if (hastaformat > inicioformat) { // fecha ingresada correctamente

        axios.get(this.urlApi + `?filter[where][fecha][between][0]=` + inicioformat + `&filter[where][fecha][between][1]=` + hastaformat + `&filter[limit]=${this.limitePage}&filter[skip]=${this.actualPage}`)
          .then(response => {
            this.bitacoras = response.data;
            //console.log(response.data);
          }).catch(ex => {
            console.log(ex)
          })
      }
    },

    /*
    Eliminar por rango de fechas los datos.
    */
    deletePorFechas: function () {

      let vm = this
      let inicioDeleteFormat = vm.inicioDelete; //le da formato a la fecha de input
      let hastaDeleteFormat = vm.hastaDelete; //le da formato a la fecha de input

      //console.log("fecha delete inicio: " + inicioDeleteFormat); //ver si la fecha tiene el formato correcto
      //console.log("fecha delete final: " + hastaDeleteFormat);   //ver si la fecha tiene el formato correcto

      //Validaciones de fechas
      if (hastaDeleteFormat === null && inicioDeleteFormat === null) { //error no ingreso datos
        alert("ERROR! Desea eliminar y no ha ingresado el rango de fechas.\nNo se puede eliminar datos.");
      } else {
        if (hastaDeleteFormat === null) { //la fecha final no ingresada
          alert("ERROR! Ingrese la fecha HASTA.\nNo se puede eliminar datos.");
        }
        if (inicioDeleteFormat === null) { //la fecha inicio no ingresada
          alert("ERROR! Ingrese la fecha INICIO.\nNo se puede eliminar datos.");
        }
      }

      if (hastaDeleteFormat < inicioDeleteFormat) { //la fecha final es mayor que la fecha inicial (no se puede buscar)
        alert("ERROR! La fecha HASTA debe ser mayor a la fecha INICIO.\nNo se puede eliminar datos.");
      }

      if (hastaDeleteFormat > inicioDeleteFormat) { // fecha ingresada correctamente

        axios.get(this.urlApi + `?filter[where][fecha][between][0]=` + inicioDeleteFormat + `&filter[where][fecha][between][1]=` + hastaDeleteFormat)
          .then(response => {

            this.bitacorasDelete = response.data;
            var totalDelete = this.bitacorasDelete.length
            //console.log(response.data);
            if (this.bitacorasDelete.length === 0) {
              alert("Error! No hay datos que borrar.");
            } else {
              for (i = 0; i < this.bitacorasDelete.length; i++) {
                //console.log(i + "El id: " + this.bitacorasDelete[i].id)
                axios.delete(this.urlApi + '/' + this.bitacorasDelete[i].id)
                  .then(function (res) {
                    alert("Exito! Se han borrado un total de datos " + totalDelete);
                  }).catch(e => {
                    console.log(e)
                  })
              }

            }

          }).catch(ex => {
            console.log(ex)
          })

        this.getAllBitacoras();
      }
      this.inicioDelete = null;
      this.hastaDelete = null;
    },

    /*
    Borra los datos del div de buscar por fechas y buscador por texto 
    */
    borrarFiltros() {
      this.txtBuscar = '';
      this.inicio = null;
      this.hasta = null;
      this.getAllBitacoras();
    },

    /*
    Busca por el search texto en los campos
    */
    buscador: function (x) {
      if (this.txtBuscar === "") return true;
      let data = (this.bitacoras[x].id + this.bitacoras[x].fecha +
        this.bitacoras[x].accion + this.bitacoras[x].nombrecompleto +
        this.bitacoras[x].loggin + this.bitacoras[x].descripcion).toUpperCase();
      return data.indexOf(this.txtBuscar.toUpperCase()) >= 0;
    },

    /*
    Paginador siguiente
    */
    siguientePage: function () {
      this.actualPage += 10;

      if (typeof this.inicio === "object" || typeof this.hasta === "object") {
        //console.log('el paginado hacia delante de todos los datos');
        this.getAllBitacoras();
      } else {
        //console.log('el paginado hacia delante de rango de datos');
        this.getBuscarPorFechas();
      }

    },

    /*
    Paginador anterior
    */
    anteriorPage: function () {
      if (this.actualPage > 1) this.actualPage -= 10;
      if (typeof this.inicio === "object" || typeof this.hasta === "object") {
        //console.log('el paginado hacia atras de todos los datos');
        this.getAllBitacoras();
      } else {
        //console.log('el paginado hacia atras de rango de datos');
        this.getBuscarPorFechas();
      }
    },

    /*
    salir e ir al login
    */
    salir: function () {
      swal({
        title: "¿Seguro que desea cerrar sesión?",
        icon: 'info',
        buttons: true,
        dangerMode: true,
      }).then(opcion => {
        if (opcion) {
          logout()
          window.location = "./login.html"
        }
      })
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
        //console.log("actual page" + this.actualPage);
        //console.log("datos: " + this.bitacoras.length);
        return this.actualPage > this.bitacoras.length;
      },

    }
  }

})