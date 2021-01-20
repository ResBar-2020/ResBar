import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import domicilio from './modules/domicilio'
import ordenes from './modules/ordenes'
import recoger from './modules/recoger'
import idioma from "./modules/idioma";
import credentials from "./modules/credentials";
import productos from "./modules/productos";
import usuarios from "./modules/usuarios";
import categorias from "./modules/categorias";
import bitacoras from "./modules/bitacoras";
import clientes from "./modules/clientes";
import parametros from "./modules/parametros";

Vue.use(Vuex)
axios.defaults.baseURL = "http://localhost:5984"

export default new Vuex.Store({


  state: {
    rol: localStorage.getItem("rol") || null,
    username: localStorage.getItem("username") || null,
    snackbar: {
      show: false,
      message: "",
      timeout: 2000
    },
    error: false

  },
  getters: {
    error: state => state.error
  },
  mutations: {
    authenticate(state, data) {
      state.rol = data.rol;
      state.username = data.username;
    },
    showMessage(state, params) {
      state.snackbar.message = params.message || "sin mensaje";
      state.snackbar.show = true;
      state.snackbar.timeout = params.timeout || 3000;
    },
    loginError(state, value) {
      state.error = value
    }
  },
  actions: {
    authenticate: async (context, user) => {
      
      if (user.loggin != undefined && user.clave != undefined) {
        try {
          axios.post(`${axios.defaults.baseURL}/usuarios/_find`, {
            //Parametros de la query
            "selector": {
              loggin: user.loggin,
              clave: user.clave
            }

          }, credentials.authentication).then((res) => {
            //Si el objeto no esta vacio asigna los valores
            if (res.data.docs.length > 0) {
              localStorage.setItem("rol", res.data.docs[0].rol);
              localStorage.setItem("username", res.data.docs[0].nombreCompleto);
              context.commit("authenticate", res.data.docs[0]);
              //Si el usuario o contrasenia no coinciden
            } else if (user.loggin != "" && user.clave != "") {
              context.commit("loginError", true)
            }

          })


        } catch (error) {
          console.log(error);
        }
      }
    }

  },
  modules: {
    domicilio,
    ordenes,
    idioma,
    recoger,
    productos,
    usuarios,
    categorias,
    bitacoras,
    clientes,
    parametros
  }
})
