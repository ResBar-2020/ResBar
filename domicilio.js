new Vue({

    el: "#appRESBAR",
    data: {
        urlApi: `${ApiRestUrl}/ordenes`,
        ordenes: {},
        searchDisplay: "",
        active: true,
        logName: logName,
        detalle: false,
        etapa: '',
        fecha: "",
        ordenSelected: '',
        imprimirProd: {
            "id": "",
            "fecha": "",
            "mesero": "",
            "mesa": "",
            "cliente": "",
            "estado": "",
            "observacion": "",
            "detalleOrden": []
        },
        editarOrdenImp: false,
        reimpresion: false
    },
    methods: {
        /*
        switch para mostrar todas las ordenes a domicilio
        */
        checkDomicilio: function () {
            this.getAllDomicilios();
            if (this.active == true) {
                this.getAllDomicilios();
            } else {
                this.getDomicilios();
            }
            this.active = !this.active
        },
        /**
         * Aumentar el valor de la etapa de la orden a domicilio
         * 
         */
        domicilioEtapa(valor) {
            axios.patch(`${this.urlApi}/${valor.id}`, {
                domicilioEtapa: valor.domicilioEtapa + 1
            }).then(
                response => {
                    if (this.active == true) {
                        this.getDomicilios();
                    } else {
                        this.getAllDomicilios();
                    }

                    if(valor.domicilioEtapa==0){
                        swal("Completado!", "Orden en Proceso", "success");
                    } else if(valor.domicilioEtapa==1){
                    swal("Completado!", "Orden Entregada!", "success");
                    }
                    console.log(response.status);
                }
            ).catch(ex => { console.log(ex) })

        },
        getAllDomicilios: function () {
            axios.get(this.urlApi + "?filter[where][domicilio]=true").then(
                response => {
                    this.ordenes = response.data
                    console.log(response.data);
                }
            ).catch(ex => { console.log(ex) })
        },
        getDomicilios: function () {
            axios.get(this.urlApi + "?filter[where][domicilio]=true&filter[where][domicilioEtapa][neq]=2")
                .then(
                    response => {
                        this.ordenes = response.data
                    }
                ).catch(ex => { console.log(ex) })
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
            let array = (this.ordenes[valor].id + this.ordenes[valor].cliente).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        },
        salir: function () {
            var opcion = confirm('¿Está seguro que quiere salir?')
            console.log(opcion)
            if (opcion) {
                logout()
                window.location = "./login.html"
            }
        }
        // 
        ,
        agregarProductos() {
            window.location = "./addmasproductos.html?id=" + this.ordenSelected.id;
        },
        cobrarOrden() {
            if (admin) {
                window.location = "./cobrarorden.html?id=" + this.ordenSelected.id;
            } else {
                this.action = "cobrarorden"
                this.showConfirm();
            }
        },
        modificarOrden() {
            if (admin) {
                window.location = "./modificarorden.html?id=" + this.ordenSelected.id;
            } else {
                this.action = "modificarorden"
                this.showConfirm()
            }
        },

        /*
        COPY PASTE DEL TAMAÑO DEL UNIVERSO XD (CREDITOS A ORDENES :V)
        */
        printTicket: function () {
            printJS('borrador', 'html')
        },
        //Muestra el modal Eliminar
        mostrarEliminar: function () {
            if (admin) {
                $('#modalEliminar').modal('show');
            } else {
                this.action = 'eliminar'
                this.showConfirm()
            }
        },
        setProdImprimir: function() {
            getProductsFromOrder(localStorage.idOrdenImprimir).then(response => {
                this.imprimirProd = response;
                this.fecha = new Date(response.fecha);
                this.fecha = moment(this.fecha);
                this.fecha = this.fecha.format('DD-MM-YYYY HH:MM:SS');
                document.getElementById("horaImpProd").innerHTML = "Hora: " + new Date(response.fecha).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
                if (this.imprimirProd.detalleOrden.filter(e => e.preparado === true && e.cantidad > 0).length > 0 || this.imprimirProd.domicilio === true) {
                    window.print()
                } else {
                    localStorage.removeItem('estado');
                    localStorage.removeItem('idOrdenImprimir');
                }
            });
        },
        //Metodo eliminar Orden
        eliminarOrden: function () {

            let texto = document.getElementById("lblMotivo").value;
            if (texto == "") {
                document.getElementById("lblMotivo").classList.add('is-invalid');
                document.getElementById("alertaMotivo").textContent = "*Campo requerido";
            } else {
                document.getElementById("lblMotivo").classList.remove('is-invalid');
                document.getElementById("lblMotivo").classList.add('is-valid');
                document.getElementById("alertaMotivo").textContent = "";
                //Elimina la orden
                axios.delete(this.uri + '/' + this.ordenSelected.id)
                    .then(function (res) {
                        console.log("DELETE ORDEN");
                        window.location = `./ordenes.html?alert=se elimino la orden satisfactoriamente`
                    }).catch(e => {
                        console.log(e)
                    })

                //cierra el modal Eliminar
                $('#modalEliminar').modal('hide');
                //Actualiza la tabla Ordenes
                this.ordenar();
                //Limpia el lblMotivo
                this.limpiarMotivo();
            }

        },
        //Limpiar el Motivo por el cual se elimino la orden
        limpiarMotivo: function () {
            $("#modalEliminar").find("input").val("");
            document.getElementById("lblMotivo").classList.remove('is-invalid');
            document.getElementById("alertaMotivo").textContent = "";

        },
        reimprimir() {
            this.reimpresion = true;
            getProductsFromOrder(this.imprimirProd.id).then(response => {
                this.imprimirProd = response;
                this.fecha = new Date(response.fecha);
                this.fecha = moment(this.fecha);
                this.fecha = this.fecha.format('DD-MM-YYYY HH:MM:SS');
                // document.getElementById("horaImpProd").innerHTML = "Hora: " + new Date(response.fecha).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
                if (this.imprimirProd.detalleOrden.filter(e => e.preparado === true && e.cantidad > 0).length > 0 || this.imprimirProd.domicilio === true) {
                    window.print()
                } else {
                    localStorage.removeItem('estado');
                    localStorage.removeItem('idOrdenImprimir');
                }
            });
            this.reimpresion = false;

        },
        getUsers() {
            axios.get('http://localhost:3000/usuarios')
                .then(res => {
                    this.users = res.data
                }).catch(er => console.error(er))
        },
        getParametros() {
            axios.get(ApiRestUrl + '/parametros')
                .then(res => {
                    this.parametros = res.data
                }).catch(er => console.error(er))
        }


    },
    mounted() {
        this.getDomicilios();
        this.getParametros()
        this.getUsers()
        if (localStorage.estado === "nuevo" && localStorage.idOrdenImprimir) {
            this.editarOrdenImp = false;
            this.setProdImprimir();
        } else if (localStorage.estado === "editar" && localStorage.idOrdenImprimir) {
            this.editarOrdenImp = true;
            this.setProdImprimir();
        }
    },
    created() {
        if (!localStorage.vue_session_key) {
            window.location = "./login.html"
        }
    }
});