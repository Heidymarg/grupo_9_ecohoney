const express = require("express");
const method_override = require('method-override');
const app = express();
const path = require( "path" );


//Requerimos rutas de Api
const productsApiRouter = require('./routes/api/productsApiRoutes');
const usersApiRouter = require('./routes/api/usersApiRoutes');

app.use( express.static( path.join( __dirname, "public" ) ) );
app.use( method_override('_method')); // Necesario para procesar PUTs y DELETEs
app.use(express.urlencoded({ extended: false })); // Necesario para los Formularios !!!
app.use(express.json());

//Endpoints de Apis
app.use('/api/products', productsApiRouter);
app.use('/api/users', usersApiRouter);

/* ***** Para Strint 5 ***** */
const encripta = require('bcryptjs');
const session = require('express-session');
app.use(session( {  secret: "EcoHoney", 
                    resave: false,
                    saveUninitialized: false,
                    cookie: {maxAge: 1000 * 60 * 60 * 24}
                } ));

const cookieParser = require('cookie-parser');
app.use( cookieParser() )
var recordameLogueado = require('./middlewares/recordameLogueado');
app.use( recordameLogueado );
/* ***** Para Strint 5 ***** */

app.set('view engine', 'ejs'); 

const PORT    = 3131;

/* MVC - Requires al sistema de ruteo */
const rutaIndex= require("./routes/indexRoute");
const rutaProductos = require("./routes/productsRoute");
const rutaUsuarios = require('./routes/userRoutes');
/* ----------------- FIN ------------------ */

app.use( "/", rutaIndex );
app.use( "/productos", rutaProductos);
app.use( "/usuarios", rutaUsuarios);
/* ----------------- FIN ------------------ */

app.listen( PORT, () => { console.log( `Eco HONeY corriendo en el puerto ${PORT}` ) } );