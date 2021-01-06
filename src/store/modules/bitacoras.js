import axios from 'axios'
import credentials from "./credentials";
const url = "http://localhost:5984/bitacoras/"

const state = {
    bitacoras: [],
};

const getters = {
    allBitacoras: state => state.bitacoras,
};

const actions = {
    //metodo para traer todas las bitacoras
    async getBitacoras({ commit }) {
        const res = await axios.post(`${url}_find`, {
            "selector": {},
            "sort": [{"fecha" : "desc"}]
        }, credentials.authentication);
        commit('setBitacoras', res.data.docs);
    },
};

const mutations = {
    setBitacoras(state, data) {
        state.bitacoras = data;
    },
};

export default {
    state, getters, actions, mutations
}
