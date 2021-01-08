import axios from 'axios'
import credentials from "./credentials";
const url = "http://localhost:5984/clientes/"

const getters = {
    clientes: state => state.clientes
}
const state = {
    clientes: []
}
async function obtenerTodos() {
    const response = await axios.post(`${url}_find`, {
        "selector": {

        }
    }, credentials.authentication);
    return response;
}

const actions = {
    async getClientes({commit}) {
        const response = await obtenerTodos();
        commit('setClientes', response.data.docs);

    },

    async addCliente({commit}, cliente){
        await axios.post(`${url}`, cliente, {
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        },credentials.authentication);

        const response = await obtenerTodos();
        commit('setClientes', response.data.docs);
    },

    async updateCliente({commit}, cliente) {
        await axios.put(`${url}${cliente._id}`, cliente, {
            params: {
                "rev": cliente._rev
            },
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        }, credentials.authentication);

        const response = await obtenerTodos();
        commit('setClientes', response.data.docs);
    },

    async deleteCliente({commit}, cliente){
        await axios.delete(`${url}${cliente._id}`, {
            params: {
                "rev": cliente._rev
            },
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        }, credentials.authentication);
        
        const response = await obtenerTodos();
        commit('setClientes', response.data.docs);
    }
   
}

const mutations = {
    setClientes(state, data) {
        state.clientes = data;
    },
};

export default {
    state, getters, actions, mutations
}
