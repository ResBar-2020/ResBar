import axios from 'axios';
import credentials from "./credentials";

const getters = {
    ordenesRecoger: state => state.ordenes,
};

const state = {
    ordenes: [],
};


const actions = {
    /* obtener ordenes de tipo RECOGER
    * mediante selectores*/
    async getOrdenesRecoger({commit}){
        const response = await axios.post(`/ordenes/_find`,{
            "selector": {
                "tipo": "RECOGER"
            },
        },credentials.authentication);
        commit('setOrdenesRecoger',response.data.docs);
    },

    /* modificar la entrega de la orden
    * */
    async modificarEtapaRecoger({commit}, orden){
        const response = await axios.put(`/ordenes/${orden._id}`,orden,{
            params: {
                "rev": orden._rev
            },
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        });
      commit('updateOrdenRecoger', response.data);
    },
};

const mutations = {
    setOrdenesRecoger(state,data){
      state.ordenes = data;
    },
    updateOrdenRecoger(state,data){
      console.log(data);
    }
};

export default {
    state, getters, actions, mutations
}