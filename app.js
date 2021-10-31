const express = require("express");
const app = express();

/*  Leyendo listas de productos para Home y Catálogos */
const fs = require( 'fs' );
const baseDeProductos = fs.readFileSync( './listadoProductosAbejas.json', 'utf8' );
const objbaseDeProductos = JSON.parse( baseDeProductos );

const path = require( "path" );

app.set('view engine', 'ejs'); 
<<<<<<< HEAD
app.set('views', path.join (__dirname, 'views'));
app.set('users', path.join(__dirname, '/views/users'));
=======
app.set( 'views', path.join( __dirname, '/views') );
app.set( 'users', path.join( __dirname, '/views/users') );

app.use( express.static( path.join( __dirname, "public" ) ) );
>>>>>>> be92a32cabc56f7e475d3d71f733bb3471c1a832

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
const formularioCargaProductoRutas = require('./routes/formularioCargaProductoRoute.js');
/* ----------------- FIN ------------------ */

/* MVC - Ruteo por Controladores */
app.use( "/", indexRutas );
/*app.use( "/views/productoDetallado.html", ProductoDetalladoRutas );*/
app.use( "/views/lineaCuidadoPersonal.html", cuidadoPersonalRutas );
app.use( "/views/lineaHogar.html", lineaHogarRutas );
app.use("/views/lineaProductoDeLasAbejas.html", lineaProductoDeLasAbejasRutas);
/*app.use ("/views/registro.html", registroRutas);*/
/*app.use ("/views/login.html", loginRutas);*/
/*app.use ("/views/carrito.html", carritoRutas);*/

app.use( "/views/lineaCuidadoPersonal.ejs", cuidadoPersonalRutas );
app.use( "/views/lineaProductoDeLasAbejas.ejs", lineaProductoDeLasAbejasRutas);
app.use( "/views/lineaHogar.ejs", lineaHogarRutas );
app.use('/views/formularioCargaProducto.ejs', formularioCargaProductoRutas);
app.use('/views/users/registro.ejs', registroRutas);
app.use('/views/users/login.ejs', loginRutas);
app.use('/views/carrito.ejs', carritoRutas);
app.use('/views/productoDetallado.ejs', ProductoDetalladoRutas);
/* ----------------- FIN ------------------ */


