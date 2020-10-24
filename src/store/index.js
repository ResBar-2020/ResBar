import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import domicilio from './modules/domicilio'

Vue.use(Vuex)
axios.defaults.baseURL = "http://localhost:3000"

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
        //let response = await axios.get("/usuarios?filter[where][pin]=" + credentials.pin);

        //const data = response.data[0];
        const data={"rol":"admin", "nombreCompleto":"Administrador del Sistema","pin":credentials.pin};
        
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("username", data.nombreCompleto);
        context.commit("authenticate", data);

      } catch (error) {
        console.log(error);
      }

    }

  },
  modules: {
    domicilio,
  }
})
