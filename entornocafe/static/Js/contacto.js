// Formulario de consulta

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formulario");

    form.addEventListener("submit", function(event) {
        let nombreInput = form.querySelector('input[name="nombre"]');
        let emailInput = form.querySelector('input[name="email"]');
        let asuntoTextarea = form.querySelector('textarea[name="asunto"]');
        let consultaTextarea = form.querySelector('textarea[name="consulta"]');
        
        const nombreApellido = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const asunto = asuntoTextarea.value.trim();
        const consulta = consultaTextarea.value.trim();
        
        if (!/^[A-ZÁÉÍÓÚÜÑa-záéíóúüñ\s]+$/.test(nombreApellido)) {
            alert("El formato para Nombre y apellido ingresado es incorrecto, por favor, coloca tu nombre y apellido iniciando con mayúscula y con espacios.");
            event.preventDefault();
            return;
        }
        
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) {
            alert("El formato para Dirección de correo ingresado es incorrecto, por favor, coloca tu dirección de correo con el siguiente formato 'correoejemplo@servicio.com'.");
            event.preventDefault();
            return;
        }
        
        if (asunto === "" || asunto.length < 5) {
            alert("Por favor, realiza tu asunto con al menos 5 caracteres.");
            event.preventDefault();
            return;
        }

        if (consulta === "" || consulta.length < 50) {
            alert("Por favor, realiza tu consulta con al menos 50 caracteres.");
            event.preventDefault();
            return;
        }
    });
});

