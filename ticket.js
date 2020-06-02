// let productosPreparados = ordenProducto.filter(item => {
//     return this.ordenProducto.preparado === true;
// });

function imprimir() {
    window.print();
}

async function getProductsFromOrder(idOrden) {
    let prod;
    await axios.get(ApiRestUrl + '/ordenes?filter[where][id]%3D=' + idOrden, { headers: { 'content-type': 'application/json', } })
        .then(response => {
            prod = response.data[0];
        })
        .catch(error => {
            console.log(error);
            prod = null;
        });
    return prod;
}