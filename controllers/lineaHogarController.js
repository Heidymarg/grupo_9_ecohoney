const path = require( 'path');
/*
const cuidadoPersonalController = {
    inicio: (req,res) => { res.sendFile( path.join( __dirname, "../views/lineaHogar.html" ) ) },
};*/

/* Implementacion MVC */
const listaDeProductosAgejas = [{ "id": "1", "desc": "Honey Essence", "precio": "$2.800", "bonif": "10%", "foto": "/images/honey-essence.jpg" }];

const cuidadoPersonalController = {
    inicio: (req,res) => { res.render( path.resolve( 'views', 'lineaHogar' ) ) },

    listar: (req,res) => { res.render( 'listado', { listado: listaDeProductosAgejas } ) },
};

module.exports = cuidadoPersonalController;
