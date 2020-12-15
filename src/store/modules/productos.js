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

async function obtenerTodos() {
    const response = await axios.post(`${url}_find`, {
        "selector": {

        }
    }, credentials.authentication);
    return response;
}

const actions = {
    async getProductos({ commit }) {
        const response = await axios.post(`${url}_find`, {
            "selector": {

            }
        }, credentials.authentication);
        commit('setProductos', response.data.docs);
    },

    async addProduct({commit}, producto){
        await axios.post(`${url}`, producto, {
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        },credentials.authentication);

        const response = await obtenerTodos();
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
