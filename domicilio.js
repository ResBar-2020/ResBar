new Vue({

    el: "#appRESBAR",
    data: {
        urlApi: `${ApiRestUrl}/ordenes`,
        ordenes: {},
        searchDisplay: "",
        active: true
    },
    methods: {
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
         * 
         * @param {od} valor 
         */
        domicilioEtapa(orden) {
            axios.patch(`${this.urlApi}/${valor.id}`, {
                domicilioEtapa: valor.domicilioEtapa + 1
            }).then(
                response => {
                    if (this.active == true) {
                        this.getDomicilios();
                    } else {
                        this.getAllDomicilios();
                    }
                    console.log(response.status);
                }
            ).catch(ex => { console.log(ex) })

        },
        getAllDomicilios: function () {
            axios.get(this.urlApi + "?filter[where][domicilio]=true").then(
                response => {
                    this.ordenes = response.data
                    console.log(tresponse.data);

                }
            ).catch(ex => { console.log(ex) })
        },
        getDomicilios: function () {
            axios.get(this.urlApi + "?filter[where][domicilio]=true&filter[where][domicilioEtapa][neq]=2")
                .then(
                    response => {
                        this.ordenes = response.data
                    }
                ).catch(ex => { console.log(ex) })
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
            let array = (this.ordenes[valor].id + this.ordenes[valor].cliente).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        },
        salir: function () {
            var opcion = confirm('Seguro que quiere salir?')
            console.log(opcion)
            if (opcion) {
                logout()
                window.location = "./login.html"
            }
        }

    },
    mounted() {
        this.getDomicilios();
    },
    created(){
        if (!localStorage.vue_session_key) {
            window.location = "./login.html"
        }
    }
});