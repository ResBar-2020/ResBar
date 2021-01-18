import axios from 'axios';
import credentials from './credentials';

const URL_BASE = 'http://localhost:5984/idiomas/';
const URL_PARAMTEROS= 'http://localhost:5984/parametros/';
const getters = {
    idiomas: state => state.idioma
};
const state = {
    idioma: [],
};

async function obtenerTodos() {
    const response = await axios.post(`${URL_BASE}_find`, {
        "selector": {

        }
    }, credentials.authentication);
    return response;
}

const actions = {
    async getIdiomas({commit}) {
        const response = await obtenerTodos();
        commit('languajes', response.data.docs);

    },

    async getIdioma({commit}) {
        const parametroIdioma = await axios.post(`${URL_PARAMTEROS}_find`, {
            "selector": {
                "_id": "12"
            }
        }, credentials.authentication);
        
        const response = await axios.post(`${URL_BASE}_find`, {
            "selector": {
                "_id": parametroIdioma.data.docs[0].valor
            }

        }, credentials.authentication);
        commit('languajes', response.data.docs);
    },
};
const mutations = {
    languajes(state, data) {
        state.idioma = data;
    }
};


export default {
    state,
    actions,
    mutations,
    getters
}