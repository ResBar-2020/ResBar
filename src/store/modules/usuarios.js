import axios from 'axios'
import credentials from "./credentials";
const url = "http://localhost:5984/usuarios/"

const getters = {
    usuarios: state => state.usuarios
}
const state = {
    usuarios: []
}
const actions = {
    async getUsers({commit}) {
        const response = await axios.post(`${url}_find`, {
            "selector": {

            }
        }, credentials.authentication);
        commit('setUsuarios', response.data.docs);
        
    },
    async updateUser({commit},usuario){
        const response = await axios.put(`${url}${usuario._id}`,usuario,{
            params: {
                "rev": usuario._rev
            },
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        }, credentials.authentication);
        commit('updateUser', response.data.docs);
        const response2 = await axios.post(`${url}_find`, {
            "selector": {

            }
        }, credentials.authentication);
        commit('setUsuarios', response2.data.docs);
        },
}

const mutations = {
    setUsuarios(state, data) {
        state.usuarios = data;
    },
    //TODO bandera para mostrar el snackbar
    updateUser(data){
        console.log(data)
    }
}

export default {
    getters,
    state,
    actions,
    mutations
}