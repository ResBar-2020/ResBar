new Vue({
    el: "#appRESBAR",
    data: {
        logName: logName,
        admin: admin,
        uri: ApiRestUrl + "/parametros/",
        parametros: []
    },
    mounted: function () {
        this.getParametros();
    },
    methods: {

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

        getParametros() {
            axios
                .get(this.uri)
                .then((response) => {
                    this.parametros = response.data;
                    input = document.getElementById("nombreNegocio");
                    input.value = this.parametros[0].valor;
                    input = document.getElementById("descripcion");
                    input.value = this.parametros[1].valor;
                    input = document.getElementById("telefono");
                    input.value = this.parametros[2].valor;
                    input = document.getElementById("nit");
                    input.value = this.parametros[3].valor;
                    input = document.getElementById("giro");
                    input.value = this.parametros[4].valor;
                    input = document.getElementById("direccion");
                    input.value = this.parametros[5].valor;
                    if (this.parametros[6].valor == "true") {
                        $("#imprimirTicketSi").prop("checked", true);
                    } else {
                        $("#imprimirTicketNo").prop("checked", true);
                    }
                    input = document.getElementById("propina");
                    input.value = this.parametros[8].valor;
                    input = document.getElementById("tiempoPreparacion");
                    input.value = this.parametros[7].valor;
                    input = document.getElementById("tiempoDomicilio");
                    input.value = this.parametros[9].valor;
                    input = document.getElementById("costoDomicilio");
                    input.value = this.parametros[10].valor;
                })
                .catch((ex) => {
                    console.log(ex);
                });
        },

        update(id, valor) {
            let obj = {
                id: this.parametros[id - 1].id,
                nombre: this.parametros[id - 1].nombre,
                valor: valor
            };
            axios
                .put(this.uri + id, obj)
                .then((response) => {
                    swal({
  title: "Actualizado!",
  text: "Parametros actualizados correctamente!",
  icon: "success",
});
                    console.log(response);
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        actualizar() {
            this.update(1, $("#nombreNegocio").val());
            this.update(2, $("#descripcion").val());
            this.update(3, $("#telefono").val());
            this.update(4, $("#nit").val());
            this.update(5, $("#giro").val());
            this.update(6, $("#direccion").val());
            this.update(9, $("#propina").val());
            this.update(8, $("#tiempoPreparacion").val());
            this.update(10, $("#tiempoDomicilio").val());
            this.update(11, $("#costoDomicilio").val());
            let imprimirTicket = "";
            if ($('#imprimirTicketSi').is(':checked')) {
                imprimirTicket = "true";
            } else {
                imprimirTicket = "false";
            }
            this.update(7, imprimirTicket);
        }
    }
});