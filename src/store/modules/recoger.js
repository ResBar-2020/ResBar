import axios from 'axios';
import credentials from "./credentials";
const BASE_URL = 'http://127.0.0.1:5984/ordenes/';

const getters = {
    ordenes: state => state.ordenes
};

const state = {
    ordenes: [],
    pagesize: 1,
    nextPage: 1
};


const actions = {
    /* obtener ordenes de tipo RECOGER
    * mediante selectores*/
    async getOrdenesRecoger({commit}){
        const response = await axios.post(`${BASE_URL}_find`,{
            "selector": {
                "tipo": "RECOGER"
            },
            "limit":state.pagesize
        },credentials.authentication);
        commit('setOrdenes',response.data.docs);
    },

    async modificarEtapa({commit}, orden){
        const response = await axios.patch(`${BASE_URL}`,orden,credentials.authentication);
      commit('updateOrden', response.data.docs)
    },
};

const mutations = {
    setOrdenes(state,data){
      state.ordenes = data;
    },
    updateOrden(state,data){
        state.ordenes +=data;
    }
};

export default {
    state, getters, actions, mutations
}
