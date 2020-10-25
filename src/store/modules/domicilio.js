import orden from '../../assets/mock/domicilio'

const getters = {
    ordenes: state => state.ordenes
};

const state = {
    ordenes: [],
};

const actions = {
    async getOrdenesDomicilio({commit}){
        const response = await orden.getDomicilios();
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
