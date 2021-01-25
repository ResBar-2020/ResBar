//import orden from '../../assets/mock/ordenes';
import axios from 'axios'
import credentials from "./credentials";
const url = "http://localhost:5984/ordenes/"
const getters = {
    allOrdenes: state => state.ordenes,

    noEntregadas(state) {
        return state.ordenes.filter(orden => orden.entregada === false)
    }
};

const state = {
    ordenes: [],
    query: '',

    // nuevaOrden: {
    //     fecha: null,
    //     mesero: '',
    //     tipo: '0',
    //     domicilioEtapa: 0,
    //     mesa: '',
    //     cliente: {},
    //     cobrada: 'false',
    //     entregada: 'false',
    //     observacion: '',
    //     tiempoPreparacion: null,
    //     detalleOrden: {},
    //     subtotal: 10,
    //     propina: 0.5,
    //     costoEnvio: 0,
    //     total: 10.5
    // },
};

async function obtenerTodos() {
    const response = await axios.post(`${url}_find`, {
        "selector": {

        }
    }, credentials.authentication);
    return response;
}

const actions = {
    // async crearNuevaOrdenAction({ commit }) {
    //     commit('crearNuevaOrden');
    // },

    async getOrdenes({ commit }) {
        const response = await axios.post(`${url}_find`, {
            "selector": {

            }
        }, credentials.authentication);
        commit('setOrdenes', response.data.docs);
    },

    async addOrden({ commit }, orden) {
        await axios.post(`${url}`, orden, {
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        }, credentials.authentication);

        const response = await obtenerTodos();
        commit('setOrdenes', response.data.docs);
    },

    async updateOrden({ commit }, orden) {
        const response = await axios.put(`${url}${orden._id}`, orden, {
            params: {
                "rev": orden._rev
            },
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        }, credentials.authentication);
        commit('updateOrden', response.data);
    },
};

const mutations = {
    // crearNuevaOrden() {
    //     this.state.nuevaOrden.cliente = this.state.cliente
    // },

    setOrdenes(state, data) {
        state.ordenes = data;
    },
    updateOrden() {
        console.log("orden cambiada");
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}