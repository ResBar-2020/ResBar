new Vue({
    el: "#appRESBAR",
    data: {
        urlApi: ApiRestUrl + "/categorias"
    },
    methods: {
        //Metodo para cerrar la sesion del usuario
        salir: function () {
            var opcion = confirm('Seguro que quiere salir?')
            console.log(opcion)
            if (opcion) {
                logout()
                window.location = "http://localhost:5500/login.html"
            }
        }
    },

    mounted() {

    }
});