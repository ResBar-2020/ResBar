import axios from "axios";
import credentials from "./credentials";
const url = "http://localhost:5984/categorias/";

const state = {
  categorias: [],
};

const getters = {
    allCategorias: state => state.categorias
};

const actions = {
    //Obtiene todas las categorias
  async getCategorias({ commit }) {
    const res = await axios.post(
        `${url}_find`,{
          "selector":{},
          "fields":["_id","nombre"]
        },credentials.authentication  );
        commit('setCategorias',res.data.docs);



  },
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
