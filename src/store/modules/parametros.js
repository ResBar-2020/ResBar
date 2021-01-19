import axios from 'axios'
import credentials from "./credentials";
const url = "http://localhost:5984/parametros/"

const getters = {
    parametros: state => state.parametros
}

const state = {
    parametros: []
}

async function obtenerTodos() {
    const response = await axios.post(`${url}_find`, {
        "selector": {

        }
    }, credentials.authentication);
    return response;
}

const actions = {

    async getParametros({commit}) {
        const response = await obtenerTodos();
        commit('setParametros', response.data.docs);

    },

    async updateParametros({commit}, parametro) {
        await axios.put(`${url}${parametro._id}`, parametro, {
            params: {
                "rev": parametro._rev
            },
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        }, credentials.authentication);

        const response = await obtenerTodos();
        commit('setParametros', response.data.docs);
    },

}

const mutations = {
    setParametros(state, data) {
        state.parametros = data;
    },
}

export default {
    getters,
    state,
    actions,
    mutations
}