const path = require( 'path');



const listaProductosCuidadoPersonal = [
    { id: "1", desc: "Vaso ecologico termico y Plegable", precio: "$1.800", bonif: "20%", foto: "/images/crema-nutritiva.PNG" },
    { id: "1", desc: "Envoltorio ecologico", precio: "$150", bonif: "30%", foto: "/images/honey-essence.jpg" },
    { id: "1", desc: "Pabilo", precio: "200", bonif: "15%", foto: "/images/honey-products-.jpg" },
    { id: "1", desc: "Vaso eco infantil", precio: "$1.200", bonif: "35%", foto: "/images/envoltorios-de-cera-de-abeja.jpg" }
]

const cuidadoPersonalController = {
    inicio: (req,res) => { res.render( 'lineaCuidadoPersonal', {usr: 'NoheliaK', listado:listaProductosCuidadoPersonal} ) } 
};
module.exports = cuidadoPersonalController;
