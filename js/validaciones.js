document.addEventListener('DOMContentLoaded', () => {
    const formularioRegistro = document.getElementById('formularioRegistro');
    if (!formularioRegistro) {
        return;
    }

    const mensajesFormulario = document.getElementById('mensajesFormulario');

    const obtenerElemento = (selector) => formularioRegistro.querySelector(selector);

    const reglasCampos = {
        nombreCompleto: {
            elemento: obtenerElemento('#nombreCompleto'),
            error: obtenerElemento('#errorNombreCompleto'),
            validar: (valor) => valor.length >= 10,
            mensaje: 'El nombre completo debe tener al menos 10 caracteres.'
        },
        correo: {
            elemento: obtenerElemento('#correo'),
            error: obtenerElemento('#errorCorreo'),
            validar: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
            mensaje: 'Captura un correo electronico valido.'
        },
        telefono: {
            elemento: obtenerElemento('#telefono'),
            error: obtenerElemento('#errorTelefono'),
            validar: (valor) => /^[0-9]{10}$/.test(valor),
            mensaje: 'El telefono debe contener exactamente 10 digitos.'
        },
        fechaNacimiento: {
            elemento: obtenerElemento('#fechaNacimiento'),
            error: obtenerElemento('#errorFechaNacimiento'),
            validar: (valor) => valor.length > 0,
            mensaje: 'La fecha de nacimiento es obligatoria.'
        },
        institucion: {
            elemento: obtenerElemento('#institucion'),
            error: obtenerElemento('#errorInstitucion'),
            validar: (valor) => valor.length >= 3,
            mensaje: 'La institucion debe tener al menos 3 caracteres.'
        },
        carrera: {
            elemento: obtenerElemento('#carrera'),
            error: obtenerElemento('#errorCarrera'),
            validar: (valor) => valor.length > 0,
            mensaje: 'Selecciona una carrera.'
        },
        semestre: {
            elemento: obtenerElemento('#semestre'),
            error: obtenerElemento('#errorSemestre'),
            validar: (valor) => {
                const semestreNumero = Number.parseInt(valor, 10);
                return Number.isInteger(semestreNumero) && semestreNumero >= 1 && semestreNumero <= 12;
            },
            mensaje: 'El semestre debe estar en un rango de 1 a 12.'
        },
        generacion: {
            elemento: obtenerElemento('#generacion'),
            error: obtenerElemento('#errorGeneracion'),
            validar: (valor) => valor.length >= 4,
            mensaje: 'Captura una generacion valida.'
        },
        anioIngreso: {
            elemento: obtenerElemento('#anioIngreso'),
            error: obtenerElemento('#errorAnioIngreso'),
            validar: (valor) => {
                const anioNumero = Number.parseInt(valor, 10);
                return Number.isInteger(anioNumero) && anioNumero >= 2018 && anioNumero <= 2035;
            },
            mensaje: 'El anio de ingreso debe estar entre 2018 y 2035.'
        },
        proyectoInteres: {
            elemento: obtenerElemento('#proyectoInteres'),
            error: obtenerElemento('#errorProyectoInteres'),
            validar: (valor) => valor.length > 0,
            mensaje: 'Selecciona un proyecto o equipo de interes.'
        },
        motivacion: {
            elemento: obtenerElemento('#motivacion'),
            error: obtenerElemento('#errorMotivacion'),
            validar: (valor) => valor.length >= 20,
            mensaje: 'La motivacion debe tener al menos 20 caracteres.'
        },
        lugarActual: {
            elemento: obtenerElemento('#lugarActual'),
            error: obtenerElemento('#errorLugarActual'),
            validar: (valor) => valor.length === 0 || valor.length >= 5,
            mensaje: 'Si capturas lugar actual, escribe al menos 5 caracteres.'
        }
    };

    const limpiarErrorCampo = (reglaCampo) => {
        if (!reglaCampo || !reglaCampo.elemento || !reglaCampo.error) {
            return;
        }

        reglaCampo.elemento.classList.remove('is-invalid');
        reglaCampo.elemento.classList.add('is-valid');
        reglaCampo.error.textContent = '';
    };

    const mostrarErrorCampo = (reglaCampo, mensajeError) => {
        if (!reglaCampo || !reglaCampo.elemento || !reglaCampo.error) {
            return;
        }

        reglaCampo.elemento.classList.remove('is-valid');
        reglaCampo.elemento.classList.add('is-invalid');
        reglaCampo.error.textContent = mensajeError;
    };

    const validarCampo = (reglaCampo) => {
        const valorCampo = reglaCampo.elemento.value.trim();
        const campoValido = reglaCampo.validar(valorCampo);

        if (campoValido) {
            limpiarErrorCampo(reglaCampo);
            return true;
        }

        mostrarErrorCampo(reglaCampo, reglaCampo.mensaje);
        return false;
    };

    const validarRadio = (nombreGrupo, errorId, mensajeError) => {
        const seleccion = formularioRegistro.querySelector(`input[name="${nombreGrupo}"]:checked`);
        const contenedorError = obtenerElemento(`#${errorId}`);
        const radios = formularioRegistro.querySelectorAll(`input[name="${nombreGrupo}"]`);

        if (seleccion) {
            radios.forEach((radioActual) => radioActual.classList.remove('is-invalid'));
            if (contenedorError) {
                contenedorError.textContent = '';
            }
            return true;
        }

        radios.forEach((radioActual) => radioActual.classList.add('is-invalid'));
        if (contenedorError) {
            contenedorError.textContent = mensajeError;
        }
        return false;
    };

    const validarHabilidades = () => {
        const habilidadesSeleccionadas = formularioRegistro.querySelectorAll('input[name="habilidades"]:checked');
        const errorHabilidades = obtenerElemento('#errorHabilidades');

        if (habilidadesSeleccionadas.length > 0) {
            if (errorHabilidades) {
                errorHabilidades.textContent = '';
            }
            return true;
        }

        if (errorHabilidades) {
            errorHabilidades.textContent = 'Selecciona al menos una habilidad.';
        }
        return false;
    };

    const limpiarMensajesGenerales = () => {
        if (!mensajesFormulario) {
            return;
        }

        mensajesFormulario.className = 'alert d-none mb-0';
        mensajesFormulario.textContent = '';
    };

    const mostrarMensajeGeneral = (tipoMensaje, textoMensaje) => {
        if (!mensajesFormulario) {
            return;
        }

        mensajesFormulario.className = `alert ${tipoMensaje} mb-0`;
        mensajesFormulario.textContent = textoMensaje;
    };

    Object.values(reglasCampos).forEach((reglaCampo) => {
        if (!reglaCampo.elemento) {
            return;
        }

        reglaCampo.elemento.addEventListener('input', () => {
            validarCampo(reglaCampo);
            limpiarMensajesGenerales();
        });

        reglaCampo.elemento.addEventListener('change', () => {
            validarCampo(reglaCampo);
            limpiarMensajesGenerales();
        });
    });

    const gruposRadio = [
        { nombre: 'tipoParticipacion', errorId: 'errorTipoParticipacion', mensaje: 'Selecciona un rol dentro de POLARIS.' },
        { nombre: 'seguirColaborando', errorId: 'errorSeguirColaborando', mensaje: 'Indica si deseas seguir colaborando con POLARIS.' }
    ];

    gruposRadio.forEach((grupoActual) => {
        const radios = formularioRegistro.querySelectorAll(`input[name="${grupoActual.nombre}"]`);
        radios.forEach((radioActual) => {
            radioActual.addEventListener('change', () => {
                validarRadio(grupoActual.nombre, grupoActual.errorId, grupoActual.mensaje);
                limpiarMensajesGenerales();
            });
        });
    });

    const checkboxesHabilidades = formularioRegistro.querySelectorAll('input[name="habilidades"]');
    checkboxesHabilidades.forEach((checkboxActual) => {
        checkboxActual.addEventListener('change', () => {
            validarHabilidades();
            limpiarMensajesGenerales();
        });
    });

    formularioRegistro.addEventListener('submit', (eventoSubmit) => {
        eventoSubmit.preventDefault();

        const erroresDetectados = [];

        Object.values(reglasCampos).forEach((reglaCampo) => {
            if (!validarCampo(reglaCampo)) {
                erroresDetectados.push(reglaCampo.mensaje);
            }
        });

        gruposRadio.forEach((grupoActual) => {
            const radioValido = validarRadio(grupoActual.nombre, grupoActual.errorId, grupoActual.mensaje);
            if (!radioValido) {
                erroresDetectados.push(grupoActual.mensaje);
            }
        });

        if (!validarHabilidades()) {
            erroresDetectados.push('Selecciona al menos una habilidad.');
        }

        if (erroresDetectados.length > 0) {
            mostrarMensajeGeneral('alert-danger', 'Revisa los campos marcados en rojo para continuar.');
            return;
        }

        mostrarMensajeGeneral('alert-success', 'Formulario valido. Enviando solicitud...');
        formularioRegistro.submit();
    });
});
