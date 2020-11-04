import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import domicilio from './modules/domicilio'
import ordenes from './modules/ordenes'

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
    }

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
    }
  },
  actions: {
    authenticate: async (context, credentials) => {

      try {
        axios.post(`${axios.defaults.baseURL}/usuarios/_find`, {
          //Parametros de la query
          "selector": {
            loggin: credentials.loggin,
            clave: credentials.clave
          }

        }, {
          //autorizacion de la DB
          auth: {
            username: "admin",
            password: "admin",
          }
        }).then((res) => {
          //Si el objeto no esta vacio asigna los valores
          if (res.data.docs.length > 0) {
            localStorage.setItem("rol", res.data.docs[0].rol);
            localStorage.setItem("username", res.data.docs[0].nombreCompleto);
            context.commit("authenticate", res.data.docs[0]);
          }
        })
        


      } catch (error) {
        console.log(error);
      }

    }

  },
  modules: {
    domicilio,
    ordenes,
  }
})