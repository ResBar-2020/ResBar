new Vue ({
    el: "#appRESBAR",
    data: {
        users:[],
        uri: 'http://localhost:3000/usuarios',
        user: {
            nombreCompleto:"",
            loggin:"",
            clave:"",
            pin: Number,
            rol:""
        }
    },
    methods:{
        Login: function(){
            axios.get(this.uri)
            .then(response => {
                this.users = response.data
            }).catch(er => console.log(er))
        },
        showAgg:function(){
            $('#aggModal').modal('show');
           },
        closeModal:function(){
            $('#aggModal').modal('hide');
           },
        RegistrarUsuario:function(){
            encontrado = []
            if(this.user.nombreCompleto != "" && this.user.loggin != "" && this.user.clave != "" && this.user.pin != 0 && this.user.rol != ""){
                console.log(this.user) 
                encontrado = this.CompararPin(this.user.pin)
                if(encontrado == this.user.pin){
                    document.getElementById("id").classList.add('is-invalid');
                    document.getElementById("iguales").textContent = "Este pin ya esta registrado";
                }else{
                    this.user.pin = parseInt(this.user.pin, 10)
                    axios.post(this.uri, this.user)
                    .then(res => {
                        console.log(res.data)
                    }).catch(re => console.log(this.user))
                    this.closeModal();
                    window.location = './users.html'
                }
                
            }else{
                document.getElementById("errorMsg").classList.add('text-danger');
                document.getElementById("errorMsg").textContent = "Por favor llene todos los campos";
            }
        },
        CompararPin: function(pin){
            res = this.users.filter(pin => pin.pin)
            return res[0].pin
        }
    },
    mounted(){
        this.Login()
    }

})