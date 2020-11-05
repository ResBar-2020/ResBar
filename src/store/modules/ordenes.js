//import orden from '../../assets/mock/ordenes';
import axios from 'axios'
import credentials from "./credentials";
const url = "http://localhost:5984/ordenes/"
const getters = {
    allOrdenes: state => state.ordenes,
    filteredOrdenes(state){
        if(state.query.length > 0){
            return state.ordenes.filter(orden => orden.cliente.nombreCompleto.toLowerCase().includes(state.query));
        }
    }
};

const state = {
    ordenes: [],
    query: ''
};

const actions = {
    async getOrdenes({commit}){
    const response = await axios.post(`${url}_find`, {
        "selector":{}
    }, credentials.authentication);
        commit('setOrdenes',response.data.docs);
    },
};

const mutations = {
    setOrdenes(state,data){
      state.ordenes = data;
    },

    setQuery(state, query){
        state.query = query
    }
};

export default {
    state, getters, actions, mutations
}
