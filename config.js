//Aqui va codigo que es comun para todos los archivos, config se carga en cada 
//archivo html, todo el codigo comun va aqui

//Direccion URL de la api rest que se va a consumir por la aplicacion
const ApiRestUrl = "https://resbar2020.us-south.cf.appdomain.cloud"

//Verifica el rol del usuario logueado 
if (localStorage.getItem(VueSession.key) == '"admin"') {
    this.admin = true
} else if (localStorage.getItem(VueSession.key) == '"mesero"') {
    this.admin = false
}

//metodo para salir
function logout() {
    localStorage.removeItem(VueSession.key)
}