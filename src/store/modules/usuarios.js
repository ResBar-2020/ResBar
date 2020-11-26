import axios from 'axios'
import credentials from "./credentials";
const url = "http://localhost:5984/usuarios/"

const getters = {
    usuarios: state => state.usuarios
}
const state = {
    usuarios: []
}
async function obtenerTodos() {
    const response = await axios.post(`${url}_find`, {
        "selector": {

        }
    }, credentials.authentication);
    return response;
}

const actions = {
    async getUsers({commit}) {
        const response = await obtenerTodos();
        commit('setUsuarios', response.data.docs);

    },

    async addUser({commit}, usuario){
        await axios.post(`${url}`, usuario, {
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        },credentials.authentication);

        const response = await obtenerTodos();
        commit('setUsuarios', response.data.docs);
    },

    async updateUser({commit}, usuario) {
        await axios.put(`${url}${usuario._id}`, usuario, {
            params: {
                "rev": usuario._rev
            },
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        }, credentials.authentication);

        const response = await obtenerTodos();
        commit('setUsuarios', response.data.docs);
    },

    async deleteUser({commit}, usuario){
        await axios.delete(`${url}${usuario._id}`, {
            params: {
                "rev": usuario._rev
            },
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        }, credentials.authentication);
        
        const response = await obtenerTodos();
        commit('setUsuarios', response.data.docs);
    }
}

const mutations = {
    setUsuarios(state, data) {
        state.usuarios = data;
    },
}

export default {
    getters,
    state,
    actions,
    mutations
}