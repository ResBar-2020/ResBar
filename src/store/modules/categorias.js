import axios from "axios";
import credentials from "./credentials";
const url = "http://localhost:5984/categorias/";

const state = {
  categorias: [],
};

const getters = {
    allCategorias: state => state.categorias
};
async function obtenerTodos() {
  const response = await axios.post(`${url}_find`, {
      "selector": {

      }
  }, credentials.authentication);
  return response;
}

const actions = {
    //Obtiene todas las categorias
  async getCategorias({ commit }) {
    const response = await obtenerTodos();
    commit('setCategorias', response.data.docs);

  },

  async addCategoria({commit}, categoria){
    await axios.post(`${url}`, categoria, {
        "auth": credentials.authentication.auth,
        "headers": credentials.authentication.headers,
    },credentials.authentication);

    const response = await obtenerTodos();
    commit('setCategorias', response.data.docs);
},

async updateCategoria({commit}, categoria) {
  await axios.put(`${url}${categoria._id}`, categoria, {
      params: {
          "rev": categoria._rev
      },
      "auth": credentials.authentication.auth,
      "headers": credentials.authentication.headers,
  }, credentials.authentication);

  const response = await obtenerTodos();
  commit('setCategorias', response.data.docs);
},

async deleteCategoria({commit}, categoria){
  await axios.delete(`${url}${categoria._id}`, {
      params: {
          "rev": categoria._rev
      },
      "auth": credentials.authentication.auth,
      "headers": credentials.authentication.headers,
  }, credentials.authentication);
  
  const response = await obtenerTodos();
  commit('setCategorias', response.data.docs);
}

  
};

const mutations = {
    setCategorias(state,data){
        state.categorias = data;
       
       
    }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
