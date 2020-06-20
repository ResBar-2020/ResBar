new Vue({
    el: "#appRESBAR",
    data: {
        Busqueda: "",
        users: {},
        SelectedUser: '',
        uri: ApiRestUrl + '/usuarios',
        user: {
            nombreCompleto: "",
            loggin: "",
            clave: "",
            pin: null,
            rol: ""
        },
        editar: false,
        logName: logName

    },
    methods: {
        //LLena la lista users con los usuarios resgistrados
        Login: function () {
            axios.get(this.uri)
                .then(response => {
                    this.users = response.data
                }).catch(er => console.log(er))
        },

        //muestra el modal para agregar usuarios
        showAgg: function () {
            $('#aggModal').modal('show');
        },

        //Cierra el modal para agregar usuarios           
        closeModal: function () {
            $('#aggModal').modal('hide');
            this.user = {
                nombreCompleto: "",
                loggin: "",
                clave: "",
                pin: 0,
                rol: ""
            }
            document.getElementById("errorMsg").textContent = "";
            document.getElementById("iguales").textContent = "";
            document.getElementById("pin").classList.remove('is-invalid')
        },
        //Registra un nuevo usuario
        RegistrarUsuario: function () {
            /*Revisa si el usuario ha llenado todos los campos y procede a ver si el pin
            no esta registrado en la BD
            */
            if (this.user.nombreCompleto != "" && this.user.loggin != "" && this.user.clave != "" && this.user.pin != 0 && this.user.rol != "") {
                tamanio = parseInt(this.user.pin, 10)
                encontrado = this.users.find(user => user.pin == this.user.pin)
                if (encontrado == undefined) {
                    if (tamanio < 9999 || tamanio > 99999) {
                        document.getElementById("pin").classList.add('is-invalid');
                        document.getElementById("iguales").textContent = "El pin debe tener 5 digitos";
                        //Si todo esta correcto
                    } else {
                        this.user.pin = parseInt(this.user.pin, 10)
                        axios.post(this.uri, JSON.stringify(this.user), {
                                headers: {
                                    'content-type': 'application/json'
                                }
                            })
                            .then(() => {
                                swal({
                                    title: "Hecho!",
                                    text: "Usuario creado con éxito!",
                                    icon: "success",
                                    buttons: false,
                                    timer: 3000
                                }).then(function () {
                                    window.location.reload()
                                })

                            }).catch(re => console.log(re))
                        this.closeModal();
                    }
                } else {
                    //Si ya existe el pin
                    if (encontrado.pin == this.user.pin) {
                        document.getElementById("pin").classList.add('is-invalid');
                        document.getElementById("iguales").textContent = "Este pin ya esta registrado";
                        //Verifica el numero de digitos
                    }
                }

            } else {
                document.getElementById("errorMsg").classList.add('text-danger');
                document.getElementById("errorMsg").textContent = "Por favor llene todos los campos";
            }
        },
        //Elimina un usuario de la tabla
        DelUser: function (user) {
            swal({
                title: "¿Seguro de eliminar a " + user.nombreCompleto + "?",
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then(confirmar => {
                if (confirmar) {
                    axios.delete(this.uri + "/" + user.id).then(() => {
                        swal({
                            title: "Hecho!",
                            text: "Usuario Eliminado con éxito!",
                            icon: "success",
                            buttons: false,
                            timer: 3000

                        }).then(function () {
                            window.location.reload()
                        })
                    })

                }
            })


        },
        //Abre el modal para editar y le pasa los datos del usuario seleccionado
        OpenEdit: function (user) {
            this.showAgg()
            this.user = user
        },
        //Edita un usuario de la tabla
        EditUser: function () {
            this.user.pin = parseInt(this.user.pin, 10)
            axios.put(this.uri + "/" + this.user.id, JSON.stringify(this.user), {
                headers: {
                    'content-type': 'application/json'
                }
            }).then(() => {
                this.closeModal()
                swal({
                    title: "Hecho!",
                    text: "Usuario editado con éxito!",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                }).then(function () {
                    window.location.reload()
                })
            })

        },
        //Busca entre los usuarios de la tabla
        buscar: function (x) {

            if (this.Busqueda == "")
                return true;
            var cad = this.users[x].id +
                this.users[x].nombreCompleto +
                this.users[x].loggin +
                this.users[x].clave +
                this.users[x].pin +
                this.users[x].rol;

            cad = cad.toUpperCase();

            if (cad.indexOf(this.Busqueda.toUpperCase()) >= 0)
                return true;
            else
                return false;
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
        }
    },
    mounted() {
        this.Login()
    },
    /*verifica si existe una sesion o no, en el caso de existir verifica el rol del usuario logueado
      y le da los permisos para el rol que desempeña*/
    created() {
        if (localStorage.vue_session_key) {
            if (localStorage.getItem(VueSession.key) == '"mesero"') {
                window.location = "./ordenes.html"
            }
        } else {
            window.location = "./login.html"
        }
    }

})