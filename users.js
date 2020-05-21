new Vue ({
    el: "#appRESBAR",
    data: {
        Busqueda: "",
        users: {},
        SelectedUser: '',
        uri: 'http://localhost:3000/usuarios',
        user: {
            nombreCompleto:"",
            loggin:"",
            clave:"",
            pin: 0,
            rol:""
        },
        editar:false,
        
        
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
            this.user = {
                        nombreCompleto:"",
                        loggin:"",
                        clave:"",
                        pin: 0,
                        rol:""
                    }
           },
        RegistrarUsuario:function(){
            encontrado = []
            if(this.user.nombreCompleto != "" && this.user.loggin != "" && this.user.clave != "" && this.user.pin != 0 && this.user.rol != ""){
                
                encontrado = this.CompararPin(this.user.pin)
                if(encontrado == this.user.pin){
                    document.getElementById("id").classList.add('is-invalid');
                    document.getElementById("iguales").textContent = "Este pin ya esta registrado";
                }else{
                    this.user.pin = parseInt(this.user.pin, 10)
                    axios.post(this.uri, this.user)
                    .then(res => {
                        console.log(res.data)
                    }).catch(re => console.log(re))
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
        },
        DelUser: function(user){
            var opcion = confirm('Seguro de eliminar a '+user.loggin+"?")
            if(opcion){
                axios.delete(this.uri+"/"+user.id).then( ()=>{
                    window.location.reload()
                })
            }
            
        },
        OpenEdit: function(user){
            this.showAgg()
            this.user = user
        },
        EditUser: function(){
            axios.put(this.uri+"/"+this.user.id, this.user)
            this.closeModal()
            document.getElementById("alerta").classList.add('alerta');
            document.getElementById("alerta").textContent = this.user.nombreCompleto +" Editado con exito";
            window.setTimeout(function() {
                $(".alert").fadeTo(500, 0).slideUp(500, function() {
                    $(this).remove();
                    window.location.reload()
                });
            }, 4000);
        },
        buscar: function(x) {

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
        }
    },
    mounted(){
        this.Login()   
    },
    created(){
        if(localStorage.getItem(VueSession.key)=='"admin"'){
            
        }else if(localStorage.getItem(VueSession.key)=='"mesero"'){
            window.location = "http://localhost:5500/ordenes.html"
        }else{
            window.location = "http://localhost:5500/login.html"
        } 
    }

})