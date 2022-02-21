window.addEventListener('load', function(){

    let formulario = document.querySelector("form");
    formulario.addEventListener("submit", function(e){

        e.preventDefault();
        let error = [];

        let codigo = document.querySelector(".codigo");
        codigo.addEventListener('change', function(){
            if (codigo.value.length==0){
                error.push(" El campo de codigo debe tener al menos 2 caracteres");
                alert("El campo de codigo tiene que estar completo");
            }else if (codigo.value.length<2){
                error.push(" El campo de codigo debe tener al menos 2 caracteres");
                alert(" El campo de codigo debe tener al menos 2 caracteres");
            }
        });     
        
        let nombre = document.querySelector(".nombre")
        nombre.addEventListener('change', function(){
            if (nombre.value.length==0){
                error.push(" El campo de nombre debe tener al menos 5 caracteres");
                alert("El campo de nombre tiene que estar completo");
            }else if (nombre.value.length<2){
                error.push(" El campo de nombre debe tener al menos 5 caracteres");
                alert(" El campo de nombre debe tener al menos 5 caracteres");
            }
        });

        let descripcion = document.querySelector(".descripcion")
        descripcion.addEventListener('change', function(){
            if (descripcion.value.length==0){
                error.push(" El campo de descripcion debe tener al menos 20 caracteres");
                alert("El campo de descripcion tiene que estar completo");
            }else if (descripcion.value.length<20){
                error.push(" El campo de descripcion debe tener al menos 20 caracteres");
                alert(" El campo de descripcion debe tener al menos 20 caracteres");
            }
        });

        let precio = document.querySelector(".precio")
        precio.addEventListener('change', function(){
            if (precio.value.length==0){
                error.push(" El campo de precio debe tener al menos 2 caracteres");
                alert("El campo de precio tiene que estar completo");
            }else if (precio.value.length<2){
                error.push(" El campo de precio debe tener al menos 2 caracteres");
                alert(" El campo de precio debe tener al menos 2 caracteres");
            }
        });
      
        let bonif = document.querySelector(".bonif")
        precio.addEventListener('change', function(){
            if (bonif.value.length==0){
                error.push(" El campo de precio debe tener al menos 2 caracteres");
                alert("El campo de bonif tiene que estar completo");
            }else if (bonif.value.length<2){
                error.push(" El campo de precio debe tener al menos 2 caracteres");
                alert(" El campo de bonif debe tener al menos 2 caracteres");
            }   
        });
   
        let cantidad = document.querySelector(".cantidad")
        cantidad.addEventListener('change', function(){
            if (cantidad.value.length==0){
                error.push(" El campo de precio debe tener al menos 1 caracteres");
                alert("El campo de cantidad tiene que estar completo");
            }else if (cantidad.value.length<2){
                error.push(" El campo de precio debe tener al menos 1 caracteres");
                alert(" El campo de cantidad debe tener al menos 1 caracter");
            }
        });   

        let foto= document.querySelector(".foto")
        foto.addEventListener("change", function() {
            let formatoValido= (/^.jpg|.jpeg|.png^/i)
            let imagesCorrectas = formatoValido.test(foto);
            if(imagesCorrectas){
                alert('La foto es valida');
            }else{ 
                error.push('La foto no es valida');
                alert('La foto no es valida');
            }    
        });

        if ( error.length == 0 ) {
            formulario.submit();
        } else {
            let errores = document.querySelector(".errores");
            for(let i = 0; i < error.length; i++){
                errores.innerHTML += "<li>" + error [i] + " </li>"
            }
        }


    });

})
