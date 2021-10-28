const express = require("express");
const app = express();

const path = require( "path" );

app.use( express.static( path.join( __dirname, "public" ) ) );

const PORT    = 3131;
app.listen( PORT, () => { console.log( `Eco HONeY corriendo en el puerto ${PORT}` ) } );


/* Sistema de ruteo original */
/*app.get( "/", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/index.html" ) ) } );*/
/* app.get( "/views/lineaCuidadoPersonal.html",  (req,res) => { res.sendFile( path.resolve( __dirname, "../views/lineaCuidadoPersonal.html" ) ) } ); */
/* app.get( "//linviewseaHogar.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/lineahogar.html" ) ) } ); */
/*app.get( "/views/lineaProductoDeLasAbejas.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/lineaProductoDeLasAbejas.html" ) ) } );*/
/*app.get( "/views/login.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/login.html" ) ) } );*/
/*app.get( "/views/registro.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/registro.html" ) ) } );*/
/*app.get( "/views/carrito.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/carrito.html" ) ) } );*/
/* ----------------- FIN ------------------ */


/* MVC - Requires al sistema de ruteo */
const indexRutas= require("./routes/indexRoute.js");
const ProductoDetalladoRutas = require("./routes/productoDetalladoRoute.js");
const cuidadoPersonalRutas = require( "./routes/cuidadoPersonalRoute.js");
const lineaHogarRutas = require( './routes/lineaHogarRoute.js' );
const lineaProductoDeLasAbejasRutas = require('./routes/lineaProductoDeLasAbejasRoute.js');
const registroRutas = require('./routes/registroRoute.js');
const loginRutas = require('./routes/loginRoute.js');
const carritoRutas = require('./routes/carritoRoute.js');
/* ----------------- FIN ------------------ */

/* MVC - Ruteo por Controladores */
app.use( "/", indexRutas );
app.use( "/views/productoDetallado.html", ProductoDetalladoRutas );
app.use( "/views/lineaCuidadoPersonal.html", cuidadoPersonalRutas );
app.use( "/views/lineaHogar.html", lineaHogarRutas );
app.use("/views/lineaProductoDeLasAbejas.html", lineaProductoDeLasAbejasRutas);
app.use ("/views/registro.html", registroRutas);
app.use ("/views/login.html", loginRutas);
app.use ("/views/carrito.html", carritoRutas);
/* ----------------- FIN ------------------ */