document.addEventListener('DOMContentLoaded', () => {
    const lienzo = document.getElementById('lienzoEstrellas');
    if (!lienzo) return;

    const contexto = lienzo.getContext('2d');
    let ancho = window.innerWidth;
    let alto = window.innerHeight;

    lienzo.width = ancho;
    lienzo.height = alto;

    const estrellas = [];
    const numeroEstrellas = 150;

    for (let i = 0; i < numeroEstrellas; i++) {
        estrellas.push({
            x: Math.random() * ancho,
            y: Math.random() * alto,
            radio: Math.random() * 1.5,
            velocidad: Math.random() * 0.5 + 0.1
        });
    }

    function animarEstrellas() {
        contexto.clearRect(0, 0, ancho, alto);
        contexto.fillStyle = 'white';

        estrellas.forEach(estrella => {
            contexto.beginPath();
            contexto.arc(estrella.x, estrella.y, estrella.radio, 0, Math.PI * 2);
            contexto.fill();

            estrella.y -= estrella.velocidad;

            if (estrella.y < 0) {
                estrella.y = alto;
                estrella.x = Math.random() * ancho;
            }
        });

        requestAnimationFrame(animarEstrellas);
    }

    animarEstrellas();

    window.addEventListener('resize', () => {
        ancho = window.innerWidth;
        alto = window.innerHeight;
        lienzo.width = ancho;
        lienzo.height = alto;
    });
});
