import axios from 'axios';
import credentials from "./credentials";

const getters = {
    ordenes: state => state.ordenes,
};

const state = {
    ordenes: [],
    pagesize: 4,
    nextPage: 1,
};


const actions = {
    /* obtener ordenes de tipo DOMICILIO
    * mediante selectores*/
    async getOrdenesDomicilio({commit}){
        const response = await axios.post(`/ordenes/_find`,{
            "selector": {
                "tipo": "DOMICILIO"
            },
            "limit":state.pagesize
        },credentials.authentication);
        commit('setOrdenesDomicilio',response.data.docs);
    },

    /* modificar el indicador del progreso de la orden
    * */
    async modificarEtapaDomicilio({commit}, orden){
        const response = await axios.put(`/ordenes/${orden._id}`,orden,{
            params: {
                "rev": orden._rev
            },
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        });
      commit('updateOrdenDomicilio', response.data);
    },
};

const mutations = {
    setOrdenesDomicilio(state,data){
      state.ordenes = data;
    },
    updateOrdenDomicilio(state,data){
      console.log(data);
    }
};

export default {
    state, getters, actions, mutations
}
