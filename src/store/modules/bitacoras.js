import axios from 'axios'
import credentials from "./credentials";
const url = "http://localhost:5984/bitacoras/"

const state = {
    bitacoras: [],
};

const getters = {
    allBitacoras: state => state.bitacoras,
};

async function getAllBitacoras() {
    const response = await axios.post(`${url}_find`, {
        "selector": {},
        "sort": [{ "fecha": "desc" }]
    }, credentials.authentication);
    return response;
}

const actions = {
    //metodo para traer todas las bitacoras
    async getBitacoras({ commit }) {
        const res = await axios.post(`${url}_find`, {
            "selector": {},
            "sort": [{ "fecha": "desc" }]
        }, credentials.authentication);
        commit('setBitacoras', res.data.docs);
    },

    //metodo para traer rango de bitacoras, (rango es un arreglo que trae fecha inicio y hasta)
    async getBitacorasRango({ commit }, rango) {
        const res = await axios.get(`${url}_design/bitacoraRango/_view/bitacoraRango?startkey=
        "`+ rango[0] + `"&endkey="` + rango[1] + `"`, {
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        }, credentials.authentication);
        commit('setBitacoras', res.data.rows);
    },

    //metodo para eliminar rango de bitacoras, (rangoDelete es un arreglo que trae fecha inicio y hasta para eliminar)
    async deleteBitacorasRango({ commit }, rangoDelete) {

        // se traen el rango de bitacoras a eliminar
        const res = await axios.get(`${url}_design/bitacoraRango/_view/bitacoraRango?startkey=
        "`+ rangoDelete[0] + `"&endkey="` + rangoDelete[1] + `"`, {
            "auth": credentials.authentication.auth,
            "headers": credentials.authentication.headers,
        }, credentials.authentication);

        if (res.data.rows.length === 0) {
            console.log("no hay bitacoras en ese rango")
        } else {
            //se itera el arreglo (res)
            for (let i = 0; i < res.data.rows.length; i++) {
                //se elimina bitacora del arreglo (res)
                await axios.delete(`${url}${res.data.rows[i].id}`, {
                    params: {
                        "rev": res.data.rows[i].value._rev
                    },
                    "auth": credentials.authentication.auth,
                    "headers": credentials.authentication.headers,
                }, credentials.authentication);

            }
        }

        const response = await getAllBitacoras();
        commit('setBitacoras', response.data.docs);
    }

};

const mutations = {
    setBitacoras(state, data) {
        state.bitacoras = data;
    },
};

export default {
    state, getters, actions, mutations
}
