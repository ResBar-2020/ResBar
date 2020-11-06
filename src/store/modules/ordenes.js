//import orden from '../../assets/mock/ordenes';
import axios from 'axios'
import credentials from "./credentials";
const url = "http://localhost:5984/ordenes/"
const getters = {
    allOrdenes: state => state.ordenes,

    noEntregadas(state){
       return state.ordenes.filter(orden => orden.entregada===false)
    }
};

const state = {
    ordenes: [],
    query: ''
};

const actions = {
    async getOrdenes({commit}){
    const response = await axios.post(`${url}_find`, {
        "selector":{
            
        }
    }, credentials.authentication);
        commit('setOrdenes',response.data.docs);
    },
};

const mutations = {
    setOrdenes(state,data){
      state.ordenes = data;
    }
};

export default {
    state, getters, actions, mutations
}
