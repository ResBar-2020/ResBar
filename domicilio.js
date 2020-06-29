Vue.component('semaforo', {
    props: ['idorden', 'fechainicio', 'maximolocal', "maximodomicilio"],
    data: function () {
        var maxim = parseFloat(this.maximolocal) + parseFloat(this.maximodomicilio);
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
                    var btnx = document.querySelector("#btn-" + self.idorden);

                    element.innerHTML = self.secondsToHMS(segundos);
                    btnx.innerHTML = '<i class="fa fa-clock-o" aria-hidden="true"></i>';
                    

                    var porcentaje = ((segundos / 60) / parseFloat(maxim)) * 100;

                    if (porcentaje < 60 && segundos >= 0) {

                        element.style.backgroundColor = "#10752D";
                        btnx.style.backgroundColor = "#10752D";
                        btnx.style.border = "#10752D";
                        btnx.style.color="white"

                    } else if (porcentaje > 60 && porcentaje < 100 && segundos >= 0) {

                        element.style.backgroundColor = "#C2B314";
                        btnx.style.backgroundColor = "#C2B314";
                        btnx.style.border = "#C2B314";
                        btnx.style.color="white"


                    } else if (isNaN(segundos)) {
                        element.innerHTML = '<div ><span>Entregado</span> </div>'
                        element.style.backgroundColor = "#43cbc9";
                        btnx.innerHTML='<i class="fa fa-check-circle" aria-hidden="true"></i>'
                        btnx.style.backgroundColor = "#43cbc9";
                        btnx.style.color = "white";
                        btnx.style.border="#43cbc9";


                    } else {
                        element.style.backgroundColor = "#751C1D";
                        btnx.style.backgroundColor = "#751C1D";
                        btnx.style.border = "#751C1D";
                        btnx.style.color="white"

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
    template:`<div class="d-flex">
    <div v-bind:id="'timer-'+this.idorden" class="semaforo">
    </div>
    <span v-bind:id="'btn-'+this.idorden" class="btn btn-sm semaforoBtn">
    <i class="fa fa-clock-o" aria-hidden="true"></i>
    </span>
     
     </div>`
})


var vmm = new Vue({

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
        admin: admin,
        accion: " "
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
        domicilioEtapa(valor_orden) {
            axios.patch(`${this.urlApi}/${valor_orden.id}`, {
                domicilioEtapa: valor_orden.domicilioEtapa + 1
            }).then(
                response => {
                    if (this.active == true) {
                        this.getDomicilios();
                    } else {
                        this.getAllDomicilios();
                    }

                    if (valor_orden.domicilioEtapa == 0) {
                        this.accion = "Etapa0"
                    } else if (valor_orden.domicilioEtapa == 1) {
                        this.accion = "Etapa1"
                        var etapafut = valor_orden.domicilioEtapa + 1
                        if (etapafut == 2) {
                            this.modificartiempo(valor_orden.id)
                        }
                    }
                    console.log(response.status);
                }
            ).catch(ex => {
                console.log(ex)
            })

            $("#alertaDomicilio").show('fade');
            setTimeout(function () {
                $("#alertaDomicilio").hide('fade');
            }, 4000);
        },

        direccionCliente(orden) {
            swal({
                title: "UBICACIÓN CLIENTE",
                text: orden.cliente.direccion,
                buttons: 'EXIT',
                dangerMode: true,
                timer: 3600
            })
        },

        getAllDomicilios: function () {
            axios.get(this.urlApi + "?filter[where][domicilio]=true&filter[order]=fecha%20DESC").then(
                response => {
                    this.ordenes = response.data
                   // console.log(response.data);
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
        filtro(valor_orden) {
            if (this.searchDisplay === "") return true;
            let array = (this.ordenes[valor_orden].id + this.ordenes[valor_orden].cliente).toUpperCase();
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
        //Muestra el modal Eliminar
        mostrarEliminar: function () {
            if (admin) {
                $('#modalEliminar').modal('show');
            } else {
                this.action = 'eliminar'
                this.showConfirm()
            }
        },
        // for login
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

        getUsers() {
            axios.get('http://localhost:3000/usuarios')
                .then(res => {
                    this.users = res.data
                }).catch(er => console.error(er))
        },
        async getParametros() {
            await axios.get(ApiRestUrl + '/parametros')
                .then(res => {
                    this.parametros = res.data
                }).catch(er => console.error(er))
        },


        /*
        referente a ticketes
        */
        printTicket: function () {
            printJS('borrador', 'html')
        },

        setProdImprimir: function () {
            getProductsFromOrder(localStorage.idOrdenImprimir).then(response => {
                this.imprimirProd = response;
                    if(localStorage.addProd && !this.imprimirProd.domicilio){
                        this.imprimirProd.detalleOrden = JSON.parse(localStorage.addProd);
                    }
                this.fecha = new Date(response.fecha);
                this.fecha = moment(this.fecha);
                this.fecha = this.fecha.format('DD-MM-YYYY HH:MM:SS');
                document.getElementById("horaImpProd").innerHTML = "Hora: " + new Date(response.fecha).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
                if (this.imprimirProd.detalleOrden.filter(e => e.preparado === true && e.cantidad > 0).length > 0 || this.imprimirProd.domicilio === true) {
                    window.print()
                } else {
                    localStorage.removeItem('addProd');
                    localStorage.removeItem('estado');
                    localStorage.removeItem('idOrdenImprimir');
                }
            });
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

    factorPropina(){
            let valor = this.parametros[8].valor; 
            try {
                valor = valor.split('%');
                valor = (valor[0])/100; 
                return parseFloat(valor);    
            } catch (error) {
                console.error(error);
            }
         }
    },
    mounted() {
       
        
      
        this.getParametros().then(res =>{
            if (localStorage.estado === "nuevo" && localStorage.idOrdenImprimir && vm.parametros[6].valor==="true") {
                this.editarOrdenImp = false;
                this.setProdImprimir();
            } else if (localStorage.estado === "editar" && localStorage.idOrdenImprimir && vm.parametros[6].valor==="true") {
                this.editarOrdenImp = true;
                this.setProdImprimir();
            }
        });
        this.getUsers();
        this.getDomicilios();
        
    },
    created() {
        if (!localStorage.vue_session_key) {
            window.location = "./login.html"
        }
    }
});