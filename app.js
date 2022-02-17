const express = require("express");
const method_override = require('method-override');
const app = express();
const path = require( "path" );
//const multer = require('multer');

/* ***** Para Strint 5 ***** */
const encripta = require('bcryptjs');
var cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');
const session = require('express-session');
/* ***** Para Strint 5 ***** */


//Requerimos rutas de Api
const productsApiRouter = require('./routes/api/productsApiRoutes');
const usersApiRouter = require('./routes/api/usersApiRoutes');

app.use( express.static( path.join( __dirname, "public" ) ) );
console.log( 'Path Ecohoney: ' + __dirname );
app.use( method_override('_method')); // Necesario para procesar PUTs y DELETEs
app.use(express.urlencoded({ extended: false })); // Necesario para los Formularios !!!
app.use(express.json());

//Endpoints de Apis
app.use('/api/products', productsApiRouter);
app.use('/api/users', usersApiRouter);

/* ***** Para Strint 5 ***** */
app.use(cookieParser());
app.use(session( {secret: "EcoHoney!!!", maxAge: 60 * 60 * 24, resave: true, saveUninitialized: true } ));
/* ***** Para Strint 5 ***** */




app.set('view engine', 'ejs'); 

const PORT    = 3131;

/* MVC - Requires al sistema de ruteo */
const rutaIndex= require("./routes/indexRoute");
const rutaProductos = require("./routes/productsRoute");
const rutaUsuarios = require('./routes/userRoutes')
/* ----------------- FIN ------------------ */


app.use( "/", rutaIndex );
app.use( "/productos", rutaProductos);
app.use( "/usuarios", rutaUsuarios);
/* ----------------- FIN ------------------ */


app.listen( PORT, () => { console.log( `Eco HONeY corriendo en el puerto ${PORT}` ) } );