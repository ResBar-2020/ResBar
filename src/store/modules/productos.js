import axios from 'axios'
import credentials from "./credentials";
const url = "http://localhost:5984/productos/"

const getters = {
    allProductos: state => state.productos,

};

const state = {
    productos: [],
    query: ''
};

const actions = {
    async getProductos({ commit }) {
        const response = await axios.post(`${url}_find`, {
            "selector": {

            }
        }, credentials.authentication);
        commit('setProductos', response.data.docs);
    },
    // async updateOrden({commit},orden){
    // const response = await axios.put(`${url}${orden._id}`,orden,{
    //     params: {
    //         "rev": orden._rev
    //     },
    //     "auth": credentials.authentication.auth,
    //     "headers": credentials.authentication.headers,
    // }, credentials.authentication);
    //     commit('updateOrden',response.data);   
    // },
};

const mutations = {
    setProductos(state, data) {
        state.productos = data;
    }
};

export default {
    state, getters, actions, mutations
}
