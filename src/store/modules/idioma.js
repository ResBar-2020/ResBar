import axios from 'axios';
import credentials from './credentials';

const URL_BASE='http://localhost:5984/idiomas/';
const getters = {
    idiomas: state => state.idioma
};
const state ={
idioma :[],
};

const actions = {
    async getIdioma({commit}){
        const response = await axios.post(`${URL_BASE}_find`, {
            "selector": {
                "_id":"ES"
            }
            },credentials.authentication);
        console.log('response data: ',response.data);
        commit('languajes',response.data.docs);
    }
};

const mutations={
    languajes(state,data){
        console.log(data);
        state.idioma = data;
    }
};


export default {
state, actions, mutations, getters
}