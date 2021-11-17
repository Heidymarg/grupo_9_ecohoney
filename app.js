const express = require("express");
const method_override = require('method-override');
const app = express();
const path = require( "path" );

app.use( express.static( path.join( __dirname, "public" ) ) );
app.use( method_override('_method')); // Necesario para procesar PUTs y DELETEs
app.use(express.urlencoded({ extended: false })); // Necesario para los Formularios !!!


app.set('view engine', 'ejs'); 


const PORT    = 3131;
app.listen( PORT, () => { console.log( `Eco HONeY corriendo en el puerto ${PORT}` ) } );

/* MVC - Requires al sistema de ruteo */
const rutaIndex= require("./routes/indexRoute");
const rutaProductos = require("./routes/productsRoute");
const rutaUsuarios = require('./routes/userRoutes')
/* ----------------- FIN ------------------ */


app.use( "/", rutaIndex );
app.use( "/productos", rutaProductos);
app.use( "/usuario", rutaUsuarios);
/* ----------------- FIN ------------------ */
