const express = require("express");
const method_override = require('method-override');
const app = express();
const path = require( "path" );
const multer = require('multer');


app.use( express.static( path.join( __dirname, "public" ) ) );
app.use( method_override('_method')); // Necesario para procesar PUTs y DELETEs
app.use(express.urlencoded({ extended: false })); // Necesario para los Formularios !!!
app.use(express.json());


app.set('view engine', 'ejs'); 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage})

const PORT    = 3131;


/* MVC - Requires al sistema de ruteo */
const rutaIndex= require("./routes/indexRoute");
const rutaProductos = require("./routes/productsRoute");
const rutaUsuarios = require('./routes/userRoutes')
/* ----------------- FIN ------------------ */


app.use( "/", rutaIndex );
app.use( "/productos", rutaProductos);
app.use( "/usuario", rutaUsuarios);
/* ----------------- FIN ------------------ */

app.listen( PORT, () => { console.log( `Eco HONeY corriendo en el puerto ${PORT}` ) } );