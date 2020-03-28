new Vue({
    el: "#appRESBAR",
    data: {
        // Aqui inician las propiedades que vamos a necesitar
        //para almacenar nuestros objetos de trabajo
        
        ordenes: [{id:"2345ab54c1111", fecha:"2020-10-31", mesero:"Juan",mesa:"2",cliente:"", estado:"A",total:21.10, observacion:"",

        detalleOrden:[
        
        {cantidad: 1,nombre:"Hamburguesa Big", precio: 7.25, categoria:{nombre:"Platos"}, subtotal:7.25},
        
        {cantidad: 1,nombre:"Pizza Suprema", precio: 6.35, categoria:{nombre:"Platos"},subtotal:6.75},
        
        {cantidad:2,nombre:"Soda Fanta 12 onz", precio: 1.00, categoria:{nombre:"Bebidas"},subtotal:2}
        
        ]},
        
        {id:"2345ab54c2222", fecha:"2020-10-31", mesero:"Luis",mesa:"1",cliente:"Don Carlos", estado:"C",total:16.00, observacion:"Sin Cebolla",
        
        detalleOrden:[
        
        {cantidad: 1,nombre:"Hamburguesa Big", precio: 7.25, categoria:{nombre:"Platos"}, subtotal:7.25},
        
        {cantidad: 2,nombre:"Ensalada Cesar", precio: 5.55, categoria:{nombre:"Platos"},subtotal:11.10},
        
        {cantidad:1,nombre:"Soda Fanta 12 onz", precio: 1.00, categoria:{nombre:"Bebidas"},subtotal:1.00},
        
        {cantidad:2,nombre:"Refresco de Horchata", precio: 1.75, categoria:{nombre:"Bebidas"},subtotal:1.75}
        
        ]},
        {id:"2345ab54c2222", fecha:"2020-10-31", mesero:"Luis",mesa:"5",cliente:"Don Carlos", estado:"A",total:16.00, observacion:"Sin Cebolla",
        
        detalleOrden:[
        
        {cantidad: 1,nombre:"Hamburguesa Big", precio: 7.25, categoria:{nombre:"Platos"}, subtotal:7.25},
        
        {cantidad: 2,nombre:"Ensalada Cesar", precio: 5.55, categoria:{nombre:"Platos"},subtotal:11.10},
        
        {cantidad:1,nombre:"Soda Fanta 12 onz", precio: 1.00, categoria:{nombre:"Bebidas"},subtotal:1.00},
        
        {cantidad:2,nombre:"Refresco de Horchata", precio: 1.75, categoria:{nombre:"Bebidas"},subtotal:1.75}
        
        ]},{id:"2345ab54c2222", fecha:"2020-10-31", mesero:"Luis",mesa:"10",cliente:"Don Carlos", estado:"C",total:16.00, observacion:"Sin Cebolla",
        
        detalleOrden:[
        
        {cantidad: 1,nombre:"Hamburguesa Big", precio: 7.25, categoria:{nombre:"Platos"}, subtotal:7.25},
        
        {cantidad: 2,nombre:"Ensalada Cesar", precio: 5.55, categoria:{nombre:"Platos"},subtotal:11.10},
        
        {cantidad:1,nombre:"Soda Fanta 12 onz", precio: 1.00, categoria:{nombre:"Bebidas"},subtotal:1.00},
        
        {cantidad:2,nombre:"Refresco de Horchata", precio: 1.75, categoria:{nombre:"Bebidas"},subtotal:1.75}
        
        ]}],
        ascendente: true,
        activos: true,
        lactivos: null,
        textoBusqueda: "",
        ordenSelected: 0,
    },
    methods: {
        //aqui van los metodos que vamos a necesitar
        buscar:function(x){
            
            if(this.textoBusqueda=="")
                return true;
            var cad=this.ordenes[x].id+ 
                this.ordenes[x].cliente+
                this.ordenes[x].mesa+
                this.ordenes[x].mesero+
                this.ordenes[x].observacion+
                this.ordenes[x].total;        
            
            cad=cad.toUpperCase();
            
            if(cad.indexOf(this.textoBusqueda.toUpperCase())>=0)
                        return true;
            else
                return false;

        },
        ordenar: function() {
            this.ascendente = !this.ascendente
            if(this.ascendente == true){
                this.ordenes.sort((a,b) => {return b.mesa-a.mesa})   
            }else{
                this.ordenes.sort((a,b) => {return a.mesa-b.mesa})
            }
        },
        mostrarActivos: function() {
            this.lactivos = this.ordenes.filter(orden => orden.estado == "A")
            this.activos = !this.activos 
            console.log(this.activos)
        },
        cobrarOrden: function(orden) {
            $('#cobrarOrden').modal('show');
            $('#mesa').html('Mesa: ' + orden.mesa);
            $('#mesero').html('Mesero: ' + orden.mesero);
            $('#cliente').html('Cliente: ' + orden.cliente);
            let cadena = "";
            for (let i = 0; i < orden.detalleOrden.length; i++) {
                cadena += "<tr>";
                cadena += "<td>" + orden.detalleOrden[i].nombre + "</td>";
                cadena += "<td>" + orden.detalleOrden[i].categoria.nombre + "</td>";
                cadena += "<td>" + orden.detalleOrden[i].cantidad + "</td>";
                cadena += "<td>" + orden.detalleOrden[i].precio + "</td>";
                cadena += "<td>" + orden.detalleOrden[i].subtotal + "</td>";
                cadena += "</tr>";
                cadena += "<tr>";
                cadena += "<td>" + orden.detalleOrden[i].nombre + "</td>";
                cadena += "<td>" + orden.detalleOrden[i].categoria.nombre + "</td>";
                cadena += "<td>" + orden.detalleOrden[i].cantidad + "</td>";
                cadena += "<td>" + orden.detalleOrden[i].precio + "</td>";
                cadena += "<td>" + orden.detalleOrden[i].subtotal + "</td>";
                cadena += "</tr>";
            }
            $('#detalleOrden').html(cadena);
        }
    }

})