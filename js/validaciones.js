document.addEventListener('DOMContentLoaded', () => {
    const formularioRegistro = document.getElementById('formularioRegistro');
    if (!formularioRegistro) {
        return;
    }

    const mensajesFormulario = document.getElementById('mensajesFormulario');

    const obtenerValor = (selector) => {
        const elemento = formularioRegistro.querySelector(selector);
        return elemento ? elemento.value.trim() : '';
    };

    const mostrarMensajes = (errores) => {
        if (!mensajesFormulario) {
            return;
        }

        if (errores.length === 0) {
            mensajesFormulario.className = 'alert alert-success';
            mensajesFormulario.textContent = 'Formulario valido. Enviando registro...';
            return;
        }

        const listaMensajes = errores.map((errorActual) => `- ${errorActual}`).join('\n');
        mensajesFormulario.className = 'alert alert-danger';
        mensajesFormulario.textContent = `Corrige los siguientes campos:\n${listaMensajes}`;
    };

    formularioRegistro.addEventListener('submit', (eventoSubmit) => {
        eventoSubmit.preventDefault();

        const errores = [];

        const nombreCompleto = obtenerValor('#nombreCompleto');
        if (nombreCompleto.length < 10) {
            errores.push('El nombre completo debe tener al menos 10 caracteres.');
        }

        const telefono = obtenerValor('#telefono');
        const telefonoValido = /^[0-9]{10}$/.test(telefono);
        if (!telefonoValido) {
            errores.push('El telefono debe contener exactamente 10 digitos.');
        }

        const fechaNacimiento = obtenerValor('#fechaNacimiento');
        if (!fechaNacimiento) {
            errores.push('La fecha de nacimiento es obligatoria.');
        }

        const semestreTexto = obtenerValor('#semestre');
        const semestreNumero = Number.parseInt(semestreTexto, 10);
        const semestreValido = Number.isInteger(semestreNumero) && semestreNumero >= 1 && semestreNumero <= 12;
        if (!semestreValido) {
            errores.push('El semestre debe estar en un rango de 1 a 12.');
        }

        const carrera = obtenerValor('#carrera');
        if (carrera.length < 3) {
            errores.push('La carrera debe estar seleccionada o capturada correctamente.');
        }

        const proyectoInteres = obtenerValor('#proyectoInteres');
        if (!proyectoInteres) {
            errores.push('Debes seleccionar un proyecto de interes.');
        }

        const rolPolarisSeleccionado = formularioRegistro.querySelector('input[name="tipoParticipacion"]:checked');
        if (!rolPolarisSeleccionado) {
            errores.push('Debes seleccionar un rol dentro de POLARIS.');
        }

        const habilidadesSeleccionadas = formularioRegistro.querySelectorAll('input[name="habilidades"]:checked');
        if (habilidadesSeleccionadas.length === 0) {
            errores.push('Debes seleccionar al menos una habilidad.');
        }

        const motivacion = obtenerValor('#motivacion');
        if (motivacion.length < 20) {
            errores.push('La motivacion debe tener al menos 20 caracteres.');
        }

        const lugarActual = obtenerValor('#lugarActual');
        if (lugarActual && lugarActual.length < 5) {
            errores.push('El lugar actual debe tener al menos 5 caracteres si se captura.');
        }

        mostrarMensajes(errores);

        if (errores.length === 0) {
            formularioRegistro.submit();
        }
    });
});
