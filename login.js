new Vue ({
    el: "#appRESBAR",
    data: {
        user: {
            loggin:"",
            clave:"",
            pin: '',
        },
        users:{},
        uri: 'http://localhost:3000/usuarios'
    },
    methods:{
        /*Se encarga de verificar si los usuarios ya estan registrados y proporcionarles acceso 
        a traves del pin o de su usuario y clave*/
        Login: function(){
            axios.get(this.uri)
            .then(response =>{
                this.users = response.data
                //Metodo para iniciar sesion usando el pin
                if(this.user.loggin == "" && this.user.clave == "" && this.user.pin != ""){
                    enc = this.users.find(user => user.pin==this.user.pin)
                    console.log(enc)
                    if(enc.pin == this.user.pin){
                        VueSession.setAll(enc.rol, enc.nombreCompleto)
                        window.location = './ordenes.html'
                    }
                //Metodo para iniciar sesion con loggin y clave
                }else if(this.user.loggin != "" && this.user.clave != "" && this.user.pin == ""){
                    encPass = this.users.find(user => user.clave==this.user.clave)
                    encName = this.users.find(user => user.loggin==this.user.loggin)
                    if(encPass === encName){
                        VueSession.setAll(encPass.rol)
                        window.location = './ordenes.html'
                    }else{
                        document.getElementById("loggin").classList.add('text-danger');
                        document.getElementById("password").classList.add('text-danger');
                        document.getElementById("errorMsg").classList.add('text-danger');
                        document.getElementById("errorMsg").textContent = "La contraseña y el usuario no coinciden";
                        
                    }
                }else{
                    document.getElementById("errorMsg").classList.add('text-danger');
                    document.getElementById("errorMsg").textContent = "LLene los campos necesarios para iniciar sesion";
                    window.setTimeout(function () {
                        $("#errorMsg").fadeTo(500, 0).slideUp(500, function () {
                            $(this).remove();
                        });
                    }, 4000);
                }
              
            })  
        }
    },
    //Cierra la sesion del usuario al navegar a login.html
    created(){
        localStorage.removeItem(VueSession.key)
        this.user = {
            id: "",
            nombreCompleto:"",
            loggin:"",
            clave:"",
            pin: '',
            rol:""
        }
    }

})