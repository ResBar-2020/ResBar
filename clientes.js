new Vue({
    el: "#appRESBAR",
    data: {
        logName:'',
        clientes: {},
        accion: "",
        accionb: "",
        textoBusqueda: '',
        uri: ApiRestUrl + '/clientes',

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

    },
    mounted() {
        this.obtenerClientes()
    },
    methods: {

        /* Obtiene todos los clientes que estan registrados en la base de datos y son almacenados en el array clientes */
        obtenerClientes() {
            axios.get(this.uri).then((result) => {
                this.clientes = result.data
            }).catch((err) => {
                console.log(err)
            });
        },

        /* Verifica los valores del formulario del cliente y agrega los datos en un nuevo registro en la base de datos */
        agregarCliente() {
            if (this.cliente.nombreCompleto != "" && this.cliente.telefonoCasa != "" && this.cliente.celular != "" &&
                this.cliente.direccion != "" && this.cliente.municipio != "" && this.cliente.departamento != "") {
                this.cliente.fechaRegistro = new Date().toISOString();
                axios.post(this.uri, JSON.stringify(this.cliente), {
                        headers: {
                            'content-type': 'application/json'
                        }
                    }).then(response => {
                        this.btnCancelar();
                        this.obtenerClientes();
                        this.accion = 'agregarE';
                    })
                    .catch(err => {
                        console.log("Error:", err);
                    });
            } else {
                this.accion = 'agregarN';
                $('#modalAddCliente').modal('toggle');
            }
        },

        /* Verifica los valores del formulario del cliente y edita los datos del registro seleccionado en la base de datos */
        editarCliente() {
            if (this.cliente.nombreCompleto != "" && this.cliente.telefonoCasa != "" && this.cliente.celular != "" &&
                this.cliente.direccion != "" && this.cliente.municipio != "" && this.cliente.departamento != "") {
                axios.put(this.uri + '/' + this.cliente.id, this.cliente).
                then(response => {
                        this.obtenerClientes();
                        this.accion = 'editarE';
                    })
                    .catch(err => {
                        console.log("Error:", err);
                    });
            } else {
                this.accion = 'agregarN';
                $('#modalAddCliente').modal('toggle');
            }
            this.btnCancelar();
        },

        /* Obtiene el registro seleccionado por medio del parametro cliente y lo elimina */
        eliminarCliente(cliente) {
            axios.delete(this.uri + '/' + cliente.id).then(() => {
                this.obtenerClientes();
                this.btnCancelar();
                this.accion = 'eliminarE';
            })
        },

        /* Inicializa en blando el Json cliente y actualiza los registros de clientes en la base de datos */
        btnCancelar() {
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
            this.obtenerClientes();
        },

        /* Realiza una busqueda en el array clientes utilizando el parametro X que es la palabra clave para ver un registro */
        buscarClientes(x) {
            if (this.textoBusqueda == "")
                return true;
            var cad = this.clientes[x].nombreCompleto +
                this.clientes[x].celular +
                this.clientes[x].whatsapp +
                this.clientes[x].direccion;
            cad = cad.toUpperCase();

            if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
                return true;
            else
                return false;
        },

        /* Muestra el modal que contiene los detalles del registro cuando hacemos doble click sobre el registro */
        mostrarDetalle() {
            $('#modalDetalle').modal('show');
            this.accionb = 'detalle';
        },

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