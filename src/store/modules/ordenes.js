import orden from '../../assets/mock/ordenes';

const getters = {
    ordenes: state => state.ordenes
};

const state = {
    ordenes: [],
};

const actions = {
    async getOrdenes({commit}){
        const response = await orden.getOrdenes();
        console.log('mockData',response);
        commit('setOrdenes',response);
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
