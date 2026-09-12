/* ==========================================
   CONFIGURACIÓN
========================================== */

// CAMBIA AQUÍ EL NOMBRE
const nombre = "Gabriela";


/* ==========================================
   ELEMENTOS
========================================== */

const inicio = document.getElementById("inicio");
const nombrePantalla = document.getElementById("nombrePantalla");
const cartaPantalla = document.getElementById("cartaPantalla");
const fotosPantalla = document.getElementById("fotosPantalla");
const finalPantalla = document.getElementById("finalPantalla");

const btnIniciar = document.getElementById("btnIniciar");
const btnCarta = document.getElementById("btnCarta");
const btnFotos = document.getElementById("btnFotos");
const btnFinal = document.getElementById("btnFinal");

const musica = document.getElementById("musica");

const nombreInicio = document.getElementById("nombreInicio");
const nombreAnimado = document.getElementById("nombreAnimado");

const mensajeNombre = document.getElementById("mensajeNombre");

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const heartsContainer = document.getElementById("hearts");


/* ==========================================
   PONER NOMBRE
========================================== */

nombreInicio.textContent = nombre;
nombreAnimado.textContent = "";


/* ==========================================
   CAMBIAR PANTALLA
========================================== */

function cambiarPantalla(pantalla) {

    document.querySelectorAll(".pantalla").forEach(p => {
        p.classList.remove("activa");
    });

    pantalla.classList.add("activa");
}


/* ==========================================
   INICIAR EXPERIENCIA
========================================== */

btnIniciar.addEventListener("click", () => {

    // Música
    musica.volume = 0.55;

    musica.play().catch(() => {
        console.log("El navegador bloqueó el audio.");
    });


    // Activar partículas
    iniciarParticulas();

    // Cambiar pantalla
    cambiarPantalla(nombrePantalla);

    // Corazones
    comenzarCorazones();

    // Crear nombre
    escribirNombre();

});


/* ==========================================
   ANIMAR NOMBRE
========================================== */

function escribirNombre() {

    let i = 0;

    nombreAnimado.textContent = "";

    const intervalo = setInterval(() => {

        nombreAnimado.textContent += nombre[i];

        i++;

        if (i >= nombre.length) {

            clearInterval(intervalo);

            setTimeout(() => {

                mensajeNombre.classList.remove("mensaje-oculto");
                mensajeNombre.classList.add("mensaje-visible");

            }, 600);


            setTimeout(() => {

                btnCarta.classList.remove("oculto");
                btnCarta.classList.add("mostrar-boton");

            }, 1600);

        }

    }, 130);

}


/* ==========================================
   IR A CARTA
========================================== */

btnCarta.addEventListener("click", () => {

    cambiarPantalla(cartaPantalla);

});


/* ==========================================
   IR A FOTOS
========================================== */

btnFotos.addEventListener("click", () => {

    cambiarPantalla(fotosPantalla);

});


/* ==========================================
   IR AL FINAL
========================================== */

btnFinal.addEventListener("click", () => {

    cambiarPantalla(finalPantalla);

    lanzarCorazonesFinales();

});


/* ==========================================
   CORAZONES
========================================== */

function crearCorazon() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    const tipos = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💓"
    ];

    heart.textContent =
        tipos[Math.floor(Math.random() * tipos.length)];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (10 + Math.random() * 22) + "px";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    heartsContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 8000);

}


function comenzarCorazones() {

    setInterval(() => {

        crearCorazon();

    }, 700);

}


function lanzarCorazonesFinales() {

    for (let i = 0; i < 35; i++) {

        setTimeout(() => {

            crearCorazon();

        }, i * 100);

    }

}


/* ==========================================
   PARTÍCULAS
========================================== */

let particles = [];

let particleAnimation = null;


function configurarCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}


window.addEventListener("resize", configurarCanvas);

configurarCanvas();


/* ==========================================
   CREAR PARTÍCULAS
========================================== */

function crearParticulas() {

    particles = [];

    const cantidad =
        window.innerWidth < 600 ? 80 : 150;


    for (let i = 0; i < cantidad; i++) {

        particles.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height,

            size: Math.random() * 2 + 1,

            speedX:
                (Math.random() - .5) * .5,

            speedY:
                (Math.random() - .5) * .5,

            alpha:
                Math.random(),

            pulse:
                Math.random() * .03

        });

    }

}


/* ==========================================
   DIBUJAR PARTÍCULAS
========================================== */

function dibujarParticulas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(p => {

        p.x += p.speedX;
        p.y += p.speedY;

        p.alpha += p.pulse;


        if (p.x < 0 || p.x > canvas.width) {
            p.speedX *= -1;
        }

        if (p.y < 0 || p.y > canvas.height) {
            p.speedY *= -1;
        }


        const alpha =
            Math.abs(Math.sin(p.alpha));


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(255,70,160,${alpha})`;

        ctx.fill();

    });


    particleAnimation =
        requestAnimationFrame(dibujarParticulas);

}


/* ==========================================
   INICIAR PARTÍCULAS
========================================== */

function iniciarParticulas() {

    if (particleAnimation) {
        cancelAnimationFrame(particleAnimation);
    }

    crearParticulas();

    dibujarParticulas();

}


/* ==========================================
   TOQUE EN PANTALLA
========================================== */

document.addEventListener("click", (e) => {

    crearExplosion(
        e.clientX,
        e.clientY
    );

});


/* ==========================================
   EXPLOSIÓN DE PARTÍCULAS
========================================== */

function crearExplosion(x, y) {

    for (let i = 0; i < 10; i++) {

        const p = document.createElement("div");

        p.textContent = "✦";

        p.style.position = "fixed";

        p.style.left = x + "px";

        p.style.top = y + "px";

        p.style.color = "#ff4da6";

        p.style.fontSize = "12px";

        p.style.pointerEvents = "none";

        p.style.zIndex = "100";

        document.body.appendChild(p);


        const angle =
            Math.random() * Math.PI * 2;

        const distancia =
            30 + Math.random() * 70;


        const destinoX =
            Math.cos(angle) * distancia;

        const destinoY =
            Math.sin(angle) * distancia;


        p.animate(

            [

                {
                    transform: "translate(0,0)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(${destinoX}px,${destinoY}px)`,
                    opacity: 0
                }

            ],

            {

                duration: 800,

                easing: "ease-out"

            }

        );


        setTimeout(() => {

            p.remove();

        }, 800);

    }

}