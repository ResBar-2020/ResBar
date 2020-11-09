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

const actions = {
    async getIdioma({commit}) {
        const parametroIdioma = await axios.post(`${URL_PARAMTEROS}_find`, {
            "selector": {
                "_id": "12"
            }
        }, credentials.authentication);
        console.log('idioma: ', parametroIdioma.data.docs[0].valor);
        
        const response = await axios.post(`${URL_BASE}_find`, {
            "selector": {
                "_id": parametroIdioma.data.docs[0].valor
            }

        }, credentials.authentication);
        console.log('response data: ', response.data.docs[0]);
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