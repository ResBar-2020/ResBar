new Vue({
    el: "#appRESBAR",
    data: {
        user: {
            loggin: "",
            clave: "",
            pin: '',
        },
        users: {},
        uri: ApiRestUrl + '/usuarios',

        bitacora: {
            fecha: "",
            accion: "",
            nombreCompleto: "",
            loggin: "",
            descripcion: "",
        },
        nombre: "",
        rol: ""
    },
    methods: {
        /*Se encarga de verificar si los usuarios ya estan registrados y proporcionarles acceso 
        a traves del pin o de su usuario y clave*/
        Login: function () {
            //Metodo para iniciar sesion usando el pin
            if (this.user.loggin == "" && this.user.clave == "" && this.user.pin != "") {
                axios.get(this.uri + '?filter[where][pin]=' + this.user.pin)
                    .then(response => {
                        enc = response.data[0]
                        if (enc != undefined) {
                            VueSession.setAll(enc.rol, enc.nombreCompleto)
                            window.location = './ordenes.html'
                            this.nombre = enc.nombreCompleto;
                            this.rol = enc.rol;
                            this.registrarBitacora();
                        } else {
                            document.getElementById("pin").classList.add('text-danger');
                            document.getElementById("pinMsg").classList.add('text-danger');
                            document.getElementById("pinMsg").textContent = "El pin no esta registrado";
                        }

                    }).catch(err => console.log(err))

                //Metodo para iniciar sesion con loggin y clave
            } else if (this.user.loggin != "" && this.user.clave != "" && this.user.pin == "") {
                axios.get(this.uri + '?filter[where][clave]=' + this.user.clave +
                    '&filter[where][loggin]=' + this.user.loggin).then(res => {
                        if (res.data[0] != undefined) {
                            VueSession.setAll(res.data[0].rol, res.data[0].nombreCompleto)
                            window.location = './ordenes.html'
                            this.nombre = res.data[0].nombreCompleto;
                            this.rol = res.data[0].rol;
                            this.registrarBitacora();
                        } else {
                            document.getElementById("loggin").classList.add('text-danger');
                            document.getElementById("password").classList.add('text-danger');
                            document.getElementById("errorMsg").classList.add('text-danger');
                            document.getElementById("errorMsg").textContent = "La contraseña y el usuario no coinciden";
                        }
                    }).catch(err => console.log(err))
            } else {
                document.getElementById("errorMsg").classList.add('text-danger');
                document.getElementById("errorMsg").textContent = "LLene los campos necesarios para iniciar sesion";
            }

        },
        //Cierra la sesion del usuario al navegar a login.html
        created() {
            localStorage.removeItem(VueSession.key)
            localStorage.removeItem(VueSession.name)
            this.user = {
                id: "",
                nombreCompleto: "",
                loggin: "",
                clave: "",
                pin: '',
                rol: ""
            }
        },

        /*
        Registra a bitacoras cuando se se inicia sesion de un usuario 
        */
        registrarBitacora() {
            this.bitacora.fecha = new Date().toISOString();
            this.bitacora.accion = "Inicio de Sesión";
            this.bitacora.nombreCompleto = this.nombre;
            this.bitacora.loggin = this.rol;
            if (this.user.pin === "") {
                this.bitacora.descripcion = "Se inicio sesión usando su loggin y clave.";
            } else {
                this.bitacora.descripcion = "Se inicio sesión usando pin.";
            }

            axios.post(ApiRestUrl + "/bitacoras", JSON.stringify(this.bitacora), {
                headers: {
                    "content-type": "application/json",
                },
            }).then((response) => {
                //response.data;
            }).catch((error) => { });
        },
    }

})