new Vue ({
    el: "#appRESBAR",
    data: {
        us:[],
        uri: 'http://localhost:3000/usuarios'
    },
    methods:{
        Login: function(){
            axios.get(this.uri)
            .then(response => {
                this.us = response.data
            }).catch(er => console.log(er))
        }
    }

})