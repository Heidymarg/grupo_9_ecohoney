const path = require('path');
const fileSys = require('fs');
const usuariosFilepath = path.join(__dirname, '../data/usuarios.json')


function recordameLogueado(req, res, next) {

    next();

    if ( (res.cookies.usuarioRecordado != undefined) && (req.session.usuarioLogueado == undefined) ) {
        let usuariosArray = JSON.parse(fileSys.readFileSync(usuariosFilepath, 'utf8'));
        usuarioConCookie = usuariosArray.find( user => { return user.usuario == res.cookies.usuarioRecordado } );
        req.session.usuarioLogueado = usuarioConCookie;
    }  
}

module.exports = recordameLogueado;