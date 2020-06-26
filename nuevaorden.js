var app = new Vue({
    el: "#appRESBAR",
    data: {
        nuevaOrden: {
            fecha: null,
            mesero: logName,
            domicilio: false,
            domicilioEtapa: 0,
            mesa: null,
            cliente: [],
            estado: "A",
            total: 0,
            observacion: '',
            detalleOrden: []
        },
        //API model
        categorias: [],
        productos: [],
        //API info
        mensajeApi: null,
        url: ApiRestUrl,
        domicilioAux: false

        ,
        bitacora: {
            fecha: "",
            accion: "",
            nombreCompleto: "",
            loggin: "",
            descripcion: ""
        },
        admin: admin,

        textoBusqueda: '',
        clientes: {},
        cliente: {
            nombreCompleto: "",
            telefonoCasa: "",
            celular: "",
            whatsapp: "",
            direccion: "",
            municipio: "",
            departamento: "",
            puntoDeReferencia: "",
            observaciones: "",
            fechaRegistro: "",
            coordenadas: ""
    },
        agrega: '',
    },
    created() {
        this.nuevaOrden.fecha = new Date().toISOString();
        this.getCategorias();
        this.getProductos();
        this.disableFormSubmit();
        if (localStorage.vue_session_key) {

        } else {
            window.location = "./login.html"
        }
    },
    watch: {
        //actualiza el array de productos detalle orden
        productos: {
            // Permite detectar cambios dentro del array
            deep: true,
            // Se filtra al detalle orden solo los productos con cantidades positivas
            handler() {
                this.nuevaOrden.detalleOrden = this.productos.filter(prod => prod.cantidad > 0);
                this.calcularTotal();
            }
        }
    },
    methods: {
        //decrementar cantidad del producto a valores no negativos
        decProducto(produ) {
            if (produ.cantidad > 1) {
                produ.cantidad--;
            } else {
                produ.cantidad = 0;
            }
            produ.subtotal = this.subtotal(produ.cantidad, produ.precio);
        },
        //incrementar cantidad del producto 
        incProducto(produ) {
            produ.cantidad++;
            produ.subtotal = this.subtotal(produ.cantidad, produ.precio);
        },
        subtotal(cantidad, precio) {
            let sub = cantidad * precio;
            sub = sub.toFixed(2);
            return +sub;
        },
        calcularTotal() {
            this.nuevaOrden.total = 0;
            this.nuevaOrden.detalleOrden.forEach(produ => {
                this.nuevaOrden.total += produ.subtotal;
            });
            this.nuevaOrden.total = Math.round(this.nuevaOrden.total * 100) / 100
        },

        //API get methods
        getCategorias() {
            this.mensajeApi = "Obteniendo Categorias...";
            axios
                .get(this.url + '/categorias')
                .then(response => {
                    this.categorias = response.data;
                    this.mensajeApi = null;
                })
                .catch(error => {
                    this.mensajeApi = "Error al cargar categorias";
                });

        },
        getProductos() {
            this.mensajeApi = "Obteniendo Productos...";
            axios
                .get(this.url + '/productos')
                .then(response => {
                    //se agregan dos atributos, cantidad y subtotal
                    this.productos = response.data.map(function(obj) {
                        let rObj = { cantidad: 0, nombre: obj.nombre, precio: obj.precio, categoria: obj.categoria, subtotal: 0, preparado: obj.preparado };
                        return rObj;
                    });
                    this.mensajeApi = null;
                })
                .catch(error => {
                    this.mensajeApi = "Error al cargar productos";
                });


        },

        /* Obtiene todos los clientes que estan registrados en la base de datos y son almacenados en el array clientes */
        obtenerClientes() {
            axios.get(this.url + '/clientes').then((result) => {
                this.clientes = result.data
            }).catch((err) => {
                console.log(err)
            });
        },

        newCliente() {
            this.cliente = {
                nombreCompleto: "",
                telefonoCasa: "",
                celular: "",
                whatsapp: "",
                direccion: "",
                municipio: "",
                departamento: "",
                puntoDeReferencia: "",
                observaciones: "",
                fechaRegistro: "",
                coordenadas: ""
            };
            $('#modalAddCliente').modal('toggle');
            $('#addNuevoCliente').modal('show')
        },

        agregarCliente() {
            if (this.cliente.nombreCompleto != "") {
                this.cliente.fechaRegistro = new Date().toISOString();
                axios.post(this.url + '/clientes', JSON.stringify(this.cliente), {
                        headers: {
                            'content-type': 'application/json'
                        }
                    }).then(response => {
                        this.agrega = 'si';
                        this.textoBusqueda = '';
                    })
                    .catch(err => {
                        console.log("Error:", err);
                        this.agrega = 'err';
                        this.textoBusqueda = '';
                    });
            } else {
                $('#addNuevoCliente').modal('toggle');
                this.agrega = 'no';
                this.textoBusqueda = '';
            }
        },

        /* Realiza una busqueda en el array clientes utilizando el parametro X que es la palabra clave para ver un registro */
        buscarClientes(x) {
            if (this.textoBusqueda == "") {
                return true;
            }
            var cad = this.clientes[x].nombreCompleto +
                this.clientes[x].celular +
                this.clientes[x].whatsapp +
                this.clientes[x].direccion;
            cad = cad.toUpperCase();

            if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0) {
                return true;
            } else {
                return false;
            }

        },

        /* */
        showModalAddCliente() {
            this.obtenerClientes();
            $('#modalAddCliente').modal('show')
        },

        /* */
        addCliente() {
            this.nuevaOrden.cliente = this.cliente;
            $('#modalAddCliente').modal('toggle');
        },

        btnClienteCls() {
            this.textoBusqueda = '';
            this.cliente = {
                nombreCompleto: "",
                telefonoCasa: "",
                celular: "",
                whatsapp: "",
                direccion: "",
                municipio: "",
                departamento: "",
                puntoDeReferencia: "",
                observaciones: "",
                fechaRegistro: "",
                coordenadas: ""
            };
        },

        cambiarADomicilio() {
            check = document.getElementById("domic");
            if (check.checked) {
                //Comer En el local
                this.domicilioAux = false;
                $("#divMesa").show();
                $("#divMesero").show();
                $("#divDireccion").hide();
            } else {
                //A domicilio
                this.domicilioAux = true;
                $('#divMesa').hide();
                $('#divMesero').hide();
                $("#divDireccion").show();
            }
        },

        saveOrden() {
            this.mensajeApi = "Guardando Orden...";
            axios
                .post(this.url + '/ordenes', this.nuevaOrden)
                .then(response => {
                    localStorage.setItem("idOrdenImprimir", response.data.id);
                    localStorage.setItem("estado", "nuevo");
                    //response.data;    
                    this.registrarBitacora();
                    this.redireccionarAOrdenes();
                    this.mensajeApi = null;
                })
                .catch(error => {
                    this.mensajeApi = "Error al guardar orden";
                });
                console.log(this.nuevaOrden);

        },
        redireccionarAOrdenes() {
            window.location = `./ordenes.html?alert=se ha guardado la orden con exito `;
        },
        //Event methods
        validateForm() {
            if (this.domicilioAux == true) {
                this.nuevaOrden.mesa = "0";
                this.nuevaOrden.mesero = "";
            }
            let form = $('.needs-validation')[0];

            if (form.checkValidity() && this.nuevaOrden.detalleOrden.length != 0)
                $('#resumenModal').modal();

            if (this.nuevaOrden.detalleOrden.length === 0)
                this.mensajeApi = "La orden aun no contiene productos";
            else
                this.mensajeApi = null;

            form.classList.add('was-validated');
        },
        disableFormSubmit() {
            window.addEventListener('load', function() {
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                var forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener('submit', function(event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        }

        /*
        registra en bitacoras cuando un usuario (admin o mesero) registra una nueva orden
        */
        ,
        registrarBitacora() {
            this.bitacora.fecha = new Date().toISOString();
            this.bitacora.accion = "Crear nueva orden";
            this.bitacora.nombreCompleto = logName;

            const tipoUsuario = localStorage.getItem(VueSession.key).toString().split('"') //ver si el usuario es adm o mesero
            var logTipoUsuario = tipoUsuario[1]

            this.bitacora.loggin = logTipoUsuario;
            if (this.nuevaOrden.mesero === "") {
                this.bitacora.descripcion = "Se agregó una nueva orden a domicilio con un total de $ " + this.nuevaOrden.total + ". ID-Orden=" + localStorage.getItem("idOrdenImprimir");
            } else {
                this.bitacora.descripcion = this.nuevaOrden.mesero + " agregó una nueva orden con un total de $ " + this.nuevaOrden.total + ". ID-Orden=" + localStorage.getItem("idOrdenImprimir");
            }

            axios
                .post(this.url + '/bitacoras', JSON.stringify(this.bitacora), {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(response => {
                    //response.data;
                })
                .catch(error => {

                });
        }
    }

})

document.getElementById("telefonoCasa").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^\d-]/g, "");
});
document.getElementById("celular").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^\d-]/g, "");
});
document.getElementById("whatsapp").addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^\d-]/g, "");
});