Vue.component('semaforo', {
    props: ['idorden', 'fechainicio', 'maxim'],
    data: function () {
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

                    if (porcentaje < 60 && segundos>=0) {
                        element.style.backgroundColor = "#10752D";

                    } else if (porcentaje > 60 && porcentaje < 100 && segundos>=0) {

                        element.style.backgroundColor = "#C2B314";
                        
                    }else if(isNaN(segundos)){
                        element.innerHTML = '<div > <span>Entregado</span> <i class="fa fa-check-circle" aria-hidden="true"></i></div>'
                        element.style.backgroundColor = "#1a9c9a";


                    }
                     else {
                        element.style.backgroundColor = "#751C1D";


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
    template:
    
    
    `<div class="d-flex">
    <div v-bind:id="'timer-'+this.idorden" class="semaforo">
    </div>
    <span class="btn btn-sm semaforoBtn" v-bind:onclick="'vm.modificartiempo(\`'+this.idorden+'\`)'">X</span>
     
     </div>`
})

var vm = new Vue({
    el: "#appRESBAR",
    data: {
        ordenSelected: '',
        ordenes: {},
        ascendente: true,
        activos: true,
        lactivos: {},
        textoBusqueda: "",
        alerta: "",
        uri: `${ApiRestUrl}/ordenes`,
        fecha: "",
        parametros: [],
        user: {
            pin: ''
        },
        users: {},
        action: '',
        logName: logName, 
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
                    this.uri + "/" + idorden)
                .then(res => {
                    var orden = res.data
                    orden.tiempoPreparacion = null;
                    console.log(orden)

                    axios.put(this.uri + '/' + idorden, orden)
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
        //Obtiene todas las ordenes 
        obtenerOrdenes: function () {
            axios.get(this.uri)
                .then(response => {
                    this.ordenes = response.data
                })
                .catch(e => {
                    console.log(e)
                })
        },
        getUsers() {
            axios.get(`${ApiRestUrl}/usuarios`)
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
        //METODOS PARA ORDENAR
        //Ordenar por Mesa
        ordenar: function () {
            //ordena de forma ascendente las ordenes
            if (this.ascendente == true) {
                if (this.activos) {
                    axios.get(
                            this.uri + '?filter[order][0]=mesa ASC')
                        .then(response => {
                            this.ordenes = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                } else {
                    axios.get(
                            this.uri + '?filter[order][0]=mesa ASC&filter[where][estado]=A')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {
                            console.log(e)
                        })
                }

            } else {
                //ordena de forma descendente las ordenes
                if (this.activos) {
                    axios.get(
                            this.uri + '?filter[order][0]=mesa DESC')
                        .then(response => {
                            this.ordenes = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                } else {
                    axios.get(
                            this.uri + '?filter[order][0]=mesa DESC&filter[where][estado]=A')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                }

            }
            this.ascendente = !this.ascendente
        },
        //ordenar por mesero
        ordenarMesero: function () {
            //ordena de forma ascendente las ordenes
            if (this.ascendente == true) {
                if (this.activos) {
                    axios.get(
                            this.uri + '?filter[order][0]=mesero ASC')
                        .then(response => {
                            this.ordenes = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                } else {
                    axios.get(
                            this.uri + '?filter[order][0]=mesero ASC&filter[where][estado]=A')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {
                            console.log(e)
                        })
                }

            } else {
                //ordena de forma descendente las ordenes
                if (this.activos) {
                    axios.get(
                            this.uri + '?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22mesero%20DESC%22%0A%20%20%5D%0A%7D')
                        .then(response => {
                            this.ordenes = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                } else {
                    axios.get(
                            this.uri + '?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22mesero%20DESC%22%0A%20%20%5D%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                }

            }
            this.ascendente = !this.ascendente
        },
        //ordenar por Cliente
        ordenarCliente: function () {
            //ordena de forma ascendente las ordenes
            if (this.ascendente == true) {
                if (this.activos) {
                    axios.get(
                            this.uri + '?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22cliente%20ASC%22%20%0A%20%20%5D%0A%7D')
                        .then(response => {
                            this.ordenes = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                } else {
                    axios.get(
                            this.uri + '?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22cliente%20ASC%22%0A%20%20%5D%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {
                            console.log(e)
                        })
                }

            } else {
                //ordena de forma descendente las ordenes
                if (this.activos) {
                    axios.get(
                            this.uri + '?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22cliente%20DESC%22%0A%20%20%5D%0A%7D')
                        .then(response => {
                            this.ordenes = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                } else {
                    axios.get(
                            this.uri + '?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22cliente%20DESC%22%0A%20%20%5D%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                }

            }
            this.ascendente = !this.ascendente
        },
        //ordenar por ID
        ordenarID: function () {
            //ordena de forma ascendente las ordenes
            console.log(ApiRestUrl.toString)
            if (this.ascendente == true) {
                if (this.activos) {
                    axios.get(
                            this.uri + '?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22id%20ASC%22%20%0A%20%20%5D%0A%7D')
                        .then(response => {
                            this.ordenes = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                } else {
                    axios.get(
                            this.uri + '?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22id%20ASC%22%0A%20%20%5D%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {
                            console.log(e)
                        })
                }

            } else {
                //ordena de forma descendente las ordenes
                if (this.activos) {
                    axios.get(
                            this.uri + '?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22id%20DESC%22%0A%20%20%5D%0A%7D')
                        .then(response => {
                            this.ordenes = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                } else {
                    axios.get(
                            this.uri + '?filter=%7B%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22id%20DESC%22%0A%20%20%5D%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                        .then(response => {
                            this.lactivos = response.data
                        }).catch(e => {
                            console.log(e)
                        })

                }

            }
            this.ascendente = !this.ascendente
        },
        //Obtiene todas las ordenes con estado activo
        mostrarActivos: function () {
            axios.get(
                    this.uri + '?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22estado%22%3A%20%22A%22%0A%20%20%7D%0A%7D')
                .then(response => {
                    this.lactivos = response.data
                }).catch(e => {
                    console.log(e)
                })
            this.activos = !this.activos
        },
        //Filtra las ordenes que contengan el texto a ingresado
        buscar: function (x) {

            if (this.textoBusqueda == "")
                return true;
            //cuando el toggle esta desactivado    
            if (this.activos) {
                var cad = this.ordenes[x].id +
                    this.ordenes[x].cliente +
                    this.ordenes[x].mesa +
                    this.ordenes[x].mesero +
                    this.ordenes[x].observacion +
                    this.ordenes[x].total;

                cad = cad.toUpperCase();

                if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
                    return true;
                else
                    return false;

            } else {
                //cuando el toggle esta activado
                var cad = this.lactivos[x].id +
                    this.lactivos[x].cliente +
                    this.lactivos[x].mesa +
                    this.lactivos[x].mesero +
                    this.lactivos[x].observacion +
                    this.lactivos[x].total;

                cad = cad.toUpperCase();

                if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
                    return true;
                else
                    return false;
            }

        },
        /*Busca el mensaje pasado como parametro en la uri 
        para mostrarlo como alert*/
        alertLauncher: function () {
            let uri = window.location.href.split('?')
            if (uri.length == 2) {

                let vars = uri[1].split('=')
                if (vars[0].toUpperCase() == 'ALERT') {

                    this.alerta = vars[1].replace(/%20/g, " ")
                    swal({
                        title: "Hecho!",
                        text: this.alerta,
                        icon: 'success',
                        buttons: false,
                        timer: 4000
                    })
                }

            }

        },
        showConfirm() {
            $('#confirmModal').modal('show')
        },
        modificarOrden() {
            if (admin) {
                window.location = "./modificarorden.html?id=" + this.ordenSelected.id;
            } else {
                this.action = "modificarorden"
                this.showConfirm()
            }

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
        closeConfirm: function () {
            $('#confirmModal').modal('hide')
        },
        cobrarOrden() {
            if (admin) {
                window.location = "./cobrarorden.html?id=" + this.ordenSelected.id;
            } else {
                this.action = "cobrarorden"
                this.showConfirm()
            }

        },
        agregarProductos() {
            window.location = "./addmasproductos.html?id=" + this.ordenSelected.id;
        },
        //Muestra el modal Detalle
        mostrarDetalle: function () {
            $('#modalDetalle').modal('show');
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

        setProdImprimir: function () {
            getProductsFromOrder(localStorage.idOrdenImprimir).then(response => {
                this.imprimirProd = response;
                if(localStorage.addProd){
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

        // 
        // Metodo que imprime el borrador de la orden
        printTicket: function () {
            printJS('borrador', 'html')
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
        })
        this.ordenar()
        this.mostrarActivos()
        this.alertLauncher()
        this.getUsers()
        
    },
    created() {
        if (localStorage.vue_session_key) {

        } else {
            window.location = "./login.html"
        }
    }

})