const fs =  require('fs');
const path = require( 'path');

const abejasFilepath = path.join(__dirname, '../data/listadoProductosAbejas.json')
const listaOfertas = JSON.parse(fs.readFileSync(abejasFilepath, 'utf-8'));

const otrosProductosFilepath = path.join(__dirname, '../data/listadoProductosLineaHogar.json')
const listaDeIndex = JSON.parse(fs.readFileSync(otrosProductosFilepath, 'utf-8'));



const indexController = {
        index: (req,res) => { 
            res.render( 'index', { listado: listaDeIndex,listadoOfertas: listaOfertas }) 
        }   
    };
    module.exports = indexController;