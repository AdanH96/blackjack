
let juego = (() =>{
    // 'use strict'
    // variables
    let baraja = [];
    let arrayComputadora = [];
    let cartaSolicitada;
    let cartaSolicitadaComputadora;
    const cartasBasicas = ['C','H','S','D'];
    const cartasEspeciales = ['A','J','Q','K'];
    let contadorJugador = 0;
    let contadorComputadora = 0;

    // variables de referencia al DOM
    const botonNuevoJuego = document.querySelector('#botonNuevoJuego');
    const botonPedirCarta = document.querySelector('#botonPedirCarta');
    const botonDetener = document.querySelector('#botonDetener');
    const arrayPuntuaciones = document.querySelectorAll('small');
    const smallJugador = arrayPuntuaciones[0];
    const smallComputadora = arrayPuntuaciones[1];
    const zonaCartasJugador = document.querySelector('#jugador-cartas');
    const zonaCartasComputadora = document.querySelector('#juego-computadora');

    // funciones
    let crearBaraja = () => {
        let deck = [];
        for (let x = 2; x <= 10; x++) {
            for (let carta of cartasBasicas) {
                deck.push(x + carta);
            }
        }
        for (let esp of cartasEspeciales) {
            for (let bas of cartasBasicas) {
                deck.push(esp + bas);
            }
        }

        const cartasDesordenadas = _.shuffle(deck);
        return [...cartasDesordenadas];
    }

    const pedirCarta = () => {
        if (baraja.length === 0) {
            throw 'No hay cartas en el deck';
        }
        cartaSolicitada = baraja.pop();
        cartaSolicitadaComputadora = baraja.pop();
    }

    function valorCarta(carta) {
        const valorNumerico = carta.slice(0, -1);
        if (valorNumerico === 'A') return 11;
        if (!isNaN(valorNumerico)) return parseInt(valorNumerico);
        return 10;
    }

    // 💡 Función corregida: toma la carta como argumento
    function aniadirCarta(zona, carta) {
        let cartaImg = document.createElement('img');
        cartaImg.src = `assets/cartas/${carta}.png`;
        cartaImg.classList.add('carta');
        cartaImg.alt = 'carta';
        zona.append(cartaImg);
    }

    function ganarPartida() {

        timeout = 3000;

        const puntosGanadores = 21;
        
        if (contadorJugador >= puntosGanadores) {
            alert('Ha ganado el Jugador, ¡ENHORABUENA!');
            setTimeout(() => {
                limpiarPartida(); 
            }, timeout);
            
        } else if (contadorComputadora >= 21) {
            for (let carta of arrayComputadora) {
                aniadirCarta(zonaCartasComputadora, carta);
            }
            smallComputadora.innerText = parseInt(contadorComputadora);
            alert('Ha ganado la computadora, ¡lo sentimos!');
            setTimeout(() => {
                limpiarPartida();
            }, timeout);
            
        }
    }

    function limpiarPartida() {
        baraja = [];
        contadorJugador = 0;
        contadorComputadora = 0;
        arrayComputadora = [];
        smallJugador.innerText = '';
        smallComputadora.innerText = '';
        zonaCartasJugador.innerHTML = '';
        zonaCartasComputadora.innerHTML = '';
        botonNuevoJuego.disabled = false;
    }

    function iniciarPartida(){ //*
        limpiarPartida();
        baraja = crearBaraja();
        botonNuevoJuego.disabled = true;
    }
    // eventos
    botonNuevoJuego.addEventListener('click', () => {
        //iniciarPartida();
    });

    botonPedirCarta.addEventListener('click', () => {
        pedirCarta();

        if (cartaSolicitada.length < 1 || cartaSolicitadaComputadora.length < 1) {
            alert('No hay cartas en el deck');
            return;
        }

        aniadirCarta(zonaCartasJugador, cartaSolicitada);
        contadorJugador += valorCarta(cartaSolicitada);
        smallJugador.innerText = parseInt(contadorJugador);

        arrayComputadora.push(cartaSolicitadaComputadora);
        contadorComputadora += valorCarta(cartaSolicitadaComputadora);

        ganarPartida();
    });

    botonDetener.addEventListener('click', () => {
        const timeout = 3000;

        for (let carta of arrayComputadora) {
            aniadirCarta(zonaCartasComputadora, carta);
        }

        if (contadorJugador > contadorComputadora) {
            alert('¡HA GANADO EL JUGADOR!');
        } else if (contadorComputadora > contadorJugador) {
            alert('LO SENTIMOS, LA COMPUTADORA HA GANADO');
        } else {
            alert('¡VAYA! HUBO UN EMPATE');
        }

        setTimeout(() => {
            limpiarPartida();
            baraja = crearBaraja();
            botonNuevoJuego.disabled = false;
        }, timeout);
        
    });

    return {
        empezar : iniciarPartida
    }
});

