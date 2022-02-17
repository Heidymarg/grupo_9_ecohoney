window.addEventListener('load', function() {

    // 1. Capturo el form formularioRegistroEliminar
    // al que previamente le definí una class="eliminarUsuario"
    let formulario = document.querySelectorAll( '#eliminarUsuario');
    
    // 2. Le engancho un eventListener
    formulario[1].addEventListener('submit', function( ev ) {

        // 3. Prevengo el submit
        ev.preventDefault();

        // 4. Defino el almacenamiento para los errores
        let errores = []

        // 5. Selecciono los campos input del form formularioRegistroEliminar (parte 1) 
        // a los que previamente les definí a cada uno una class como selector
        // y a cada class le asigné el mismo valor que el del atributo name.
        //formulario[1].addEventListener('submit', function( ev ) {

            let id = document.querySelector( '.id' );
            let idError = document.querySelector( '#idError' );

            // 6. Le engancho un eventListener a cada campo a validar,
            // por cada tipo de evento que se necesita atender: focus, blur, change, etc.
            id.addEventListener('blur', function( ev_id ) {

                // 7. Tengo definidas en el form los div y sus selectores 
                // para capturar de qué campo provienen.
                if ( ( id.value = null ) || ( id.value.length < 3 ) || ( id.value == undefined ) ) {
                    errores.push('Este campo debe estar completo')
                }

            });


        //})     

        if ( errores.length == 0 ) {
            formulario[1].submit();
        } else {
            idError.innerText = errores.get(0); 
        }  

    })

})