new Vue({
    el: "#appRESBAR",
    data: {
        user: {
            loggin: "",
            clave: "",
            pin: '',
        },
        users: {},
        uri: ApiRestUrl + '/usuarios'
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
                        } else {
                            document.getElementById("pin").classList.add('text-danger');
                            document.getElementById("pinMsg").classList.add('text-danger');
                            document.getElementById("pinMsg").textContent = "El pin no esta registrado";
                        }

                    }).catch(err => console.log(err))

            //Metodo para iniciar sesion con loggin y clave
            } else if (this.user.loggin != "" && this.user.clave != "" && this.user.pin == "") {
                axios.get(this.uri + '?filter[where][clave]=' + this.user.clave +
                    '&[where][loggin]=' + this.user.loggin).then(res => {
                    if (res.data[0] != undefined) {
                        VueSession.setAll(res.data[0].rol, res.data[0].nombreCompleto)
                        window.location = './ordenes.html'
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
        }
    }

})