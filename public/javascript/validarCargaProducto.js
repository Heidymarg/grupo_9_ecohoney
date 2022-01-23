window.addEventListener('load', function() {

    // 1. Capturo el form formularioCargaProducto
    // al que previamente le definí una class="cargaProducto"
    let formulario = document.querySelector( '#cargaProducto');
    
    // 2. Le engancho un eventListener
    formulario.addEventListener('submit', function( ev ) {

        // 3. Prevengo el submit
        ev.preventDefault();

        // 4. Defino el almacenamiento para los errores
        let errores = []

        // 5. Selecciono los campos input del form formularioCargaProducto 
        // a los que previamente les definí a cada uno una class como selector
        // y a cada class le asigné el mismo valor que el del atributo name.
        let codigo = document.querySelector( 'codigo' );
        let nombre = document.querySelector( '.nombre' );
        let descripcion = document.querySelector( '.descripcion' );
        let precio = document.querySelector( '.precio' );
        let bonif = document.querySelector( '.bonif' );
        let foto =  document.querySelector( '.foto' );
        let cantidad = document.querySelector( '.cantidad' );   

      

        // 6. Le engancho un eventListener a cada campo a validar,
        // por cada tipo de evento que se necesita atender: focus, blur, change, etc.
        codigo.addEventListener('focus', function( ev_codigo ) {});
        nombre.addEventListener('focus', function( ev_nombre ) {});
        descripcion.addEventListener('focus', function( ev_descripcion ) {});
        id_lineas.addEventListener('focus', function( ev_idlineas ) {});
        precio.addEventListener('focus', function( ev_precio ) {});
        bonif.addEventListener('focus', function( ev_bonif ) {});
        foto.addEventListener('focus', function( ev_foto ) {});
        cantidad.addEventListener('focus', function( ev_cantidad ) {});

        // 7. Tengo definidas en el form los div y sus selelctores 
        // para capturar de qué campo provienen.


    })

})