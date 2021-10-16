const express = require( "express" );

const path    = require( "path" );

const app = express();

const PORT    = 3131;

app.use( express.static( path.resolve( __dirname, "./public" ) ) );

app.listen( PORT, () => { console.log( `Eco HONeY corriendo en el puerto ${PORT}` ) } );

app.get( "/", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/index.html" ) ) } );
app.get( "/views/lineaHogar.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/lineahogar.html" ) ) } );

//sumando los otros get

app.get( "/views/lineaCuidadoPersonal.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/lineaCuidadoPersonal.html" ) ) } );
app.get( "/lineaProductoDeLasAbejas.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/lineaProductoDeLasAbejas.html" ) ) } );
app.get( "/views/login.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/login.html" ) ) } );
app.get( "/views/registro.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/registro.html" ) ) } );
app.get( "/views/productoDetallado.html", (req,res) => { res.sendFile( path.resolve( __dirname, "./views/productoDetallado.html" ) ) } );