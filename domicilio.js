Vue.component('semaforo', {
    props: ['idorden', 'fechainicio', 'maximo', "par10"],
    data: function () {
        var maxim = this.maximo + this.par10;
        var t = new Date();
        var tiempoinicio = Date.parse(this.fechainicio);
        this.segundos = (t - tiempoinicio) / 1000;
        this.color = "red";
        const self = this;
        this.interval1 =
            setInterval(
                function () {
                    var t = new Date();
                    var tiempoinicio = Date.parse(self.fechainicio);
                    var segundos = (t - tiempoinicio) / 1000;

                    var element = document.querySelector('#timer-' + self.idorden);

                    element.innerHTML = self.secondsToHMS(segundos);

                    var porcentaje = ((segundos / 60) / self.maxim) * 100;

                    if (porcentaje < 60) {
                        element.style.backgroundColor = "#10752D";
                        this.color = "#10752D";

                    } else if (porcentaje > 60 && porcentaje < 100) {

                        element.style.backgroundColor = "#C2B314";
                        this.color = "#C2B314";
                    } else {
                        element.style.backgroundColor = "#751C1D";
                        this.color = "#751C1D";


                    }
                },
                1000
            );



        return {

        }
    },
    methods: {
        secondsToHMS: function (secs) {
            function z(n) {
                return (n < 10 ? '0' : '') + n;
            }
            var sign = secs < 0 ? '-' : '';
            secs = Math.abs(secs);
            return sign + z(secs / 3600 | 0) + ':' + z((secs % 3600) / 60 | 0) + ':' + parseInt(z(secs % 60));
        }


    },
    template: `<div>
    <div class="semaforo mt-2" v-bind:id="'timer-'+this.idorden"  v-bind:style="'background-color:'+this.color+';'">
    </div>
    <button class="btn btn-sm btn-danger semaforoBtn" v-bind:onclick="'vmm.modificartiempo(\`'+this.idorden+'\`)'">X</button>
     
     </div>`
})


var vmm=new Vue({

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
        parametros: [],
        user: {
            pin: ''
        },
        ordenSelected: {},
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
        reimpresion: false,
        admin: admin
    },
    methods: {

        modificartiempo(idorden) {
            axios.get(
                    this.urlApi + "/" + idorden)
                .then(res => {
                    var orden = res.data
                    orden.tiempoPreparacion = null;
                    console.log(orden)                    
                    axios.put(this.urlApi + '/' + idorden, orden)
                        .then(response => {
                            console.log(response)
                            location.reload();
                        })
                        .catch(error => {
                            console.log(error)
                            location.reload();
                        });


                }).catch(er => console.error(er))




        },
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

                    if (valor.domicilioEtapa == 0) {
                        swal("Completado!", "Orden en Proceso", "success");
                    } else if (valor.domicilioEtapa == 1) {
                        swal("Completado!", "Orden Entregada!", "success");
                    }
                    console.log(response.status);
                }
            ).catch(ex => {
                console.log(ex)
            })




        },
        getAllDomicilios: function () {
            axios.get(this.urlApi + "?filter[where][domicilio]=true").then(
                response => {
                    this.ordenes = response.data
                    console.log(response.data);
                }
            ).catch(ex => {
                console.log(ex)
            })
        },
        getDomicilios: function () {
            axios.get(this.urlApi + "?filter[where][or][1][domicilioEtapa][neq]=2&filter[where][or][1][domicilio]=true&filter[where][or][1][estado]=C&filter[where][or][0][domicilio]=true&filter[where][or][0][estado]=A")
            .then(
                    response => {
                        this.ordenes = response.data
                    }
                ).catch(ex => {
                    console.log(ex)
                })
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
            let array = (this.ordenes[valor].id + this.ordenes[valor].cliente).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        },
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
        agregarProductos: function () {
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
        showConfirm() {
            $('#confirmModal').modal('show')
        },
        closeConfirm: function () {
            $('#confirmModal').modal('hide')
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
        setProdImprimir: function () {
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
        confirmUser: function (pin) {
            if (this.user.pin != "") {
                res = this.users.filter(user => pin == user.pin)
                if (res[0].rol == "admin") {
                    if (this.action == 'eliminar') {
                        this.closeConfirm()
                        $('#modalEliminar').modal('show');
                    } else {
                        window.location = "./" + this.action + ".html?id=" + this.ordenSelected.id;
                    }
                } else {
                    document.getElementById("errorMsg").classList.add('text-danger');
                    document.getElementById("errorMsg").textContent = "El pin debe ser de un administrador";
                    document.getElementById("pin").classList.add('is-invalid');
                    this.user.pin = ''
                }
            } else {
                document.getElementById("errorMsg").classList.add('text-warning');
                document.getElementById("errorMsg").textContent = "Por favor ingrese un pin valido";
            }

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
                axios.delete(this.urlApi + '/' + this.ordenSelected.id)
                    .then(function (res) {
                        console.log("DELETE ORDEN");
                        window.location = `./ordenes.html?alert=se elimino la orden satisfactoriamente`
                    }).catch(e => {
                        console.log(e)
                    })

                //cierra el modal Eliminar
                $('#modalEliminar').modal('hide');
                //Actualiza la tabla Ordenes
                //this.ordenar();
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
        },

    


    },
    mounted() {
        this.getParametros();
        this.getDomicilios();
        this.getUsers();
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