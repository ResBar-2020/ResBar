new Vue({
    el: "#appRESBAR",
    data: {
        urlApi: ApiRestUrl + "/categorias"
    },
    methods: {
        //Metodo para cerrar la sesion del usuario
        salir: function () {
            swal({
                title: "¿Seguro que desea cerrar sesión?",
                icon: 'info',
                buttons: true,
                dangerMode: true,
            }).then(opcion =>{
                if (opcion) {
                    logout()
                    window.location = "./login.html"
                }
            })
        }
    },

    mounted() {

    }
});