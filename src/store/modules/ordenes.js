//import orden from '../../assets/mock/ordenes';
import axios from 'axios'
const url = "http://localhost:5984/ordenes/"
const getters = {
    allOrdenes: state => state.ordenes
};

const state = {
    ordenes: [],
};

const actions = {
    async getOrdenes({commit}){
     await axios
        .get(`${url}/_all_docs?include_docs=true`, {
          auth: {
            username: "admin",
            password: "admin",
          },
        })
        .then((res) => {
            //console.log('mockData',res.data.rows);
            commit('setOrdenes',res.data.rows);
        });
     //   commit('setOrdenes',response);
    },
};

const mutations = {
    setOrdenes(state,data){
      state.ordenes = data;
    }
};

export default {
    state, getters, actions, mutations
}
