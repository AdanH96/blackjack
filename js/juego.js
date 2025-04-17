
//variables
let baraja = [];
let cartaSolicitada;
const cartasBasicas = ['C','H','S','D'];
const cartasEspeciales = ['A','J','Q','K'];
let contadorJugador = 0; //asignamos let porque en el momento de hacer contador += contador estamos reasignando su valor en memoria
let contadorComputadora = 0; //mismo caso que el jugador. Const lanza error de reasignación de memoria

//variables de referencia al DOM

const botonNuevoJuego = document.querySelector('#botonNuevoJuego');
const botonPedirCarta = document.querySelector('#botonPedirCarta');
const botonDetener =  document.querySelector('#botonDetener');
const arrayPuntuaciones = document.querySelectorAll('small');
const smallJugador = arrayPuntuaciones[0];
const zonaCartasJugador = document.querySelector('#jugador-cartas');
const zonaCartasComputadora = document.querySelector('#juego-computadora');
//funciones
crearBaraja = () =>{

    deck = [];

    for(x=2; x<=10; x++){      
        for(carta of cartasBasicas){
            deck.push(x+carta);
        }
    }
    for(esp of cartasEspeciales){
        for(bas of cartasBasicas){
            deck.push(esp+bas)
        }
    }

    cartasDesordenadas = _.shuffle(deck);
    const cartasJuego = [...cartasDesordenadas];

    return cartasJuego;
}


//función para pedir la carta
const pedirCarta = () =>{
    if(baraja.length === 0){
        throw 'No hy cartas en el deck';
    }
        cartaSolicitada = baraja.pop(); 
}

//función para recoger el valor de la carta
function valorCarta(carta) {
    const valorNumerico = carta.slice(0, -1); // saca el número/letra sin el palo

    if(valorNumerico === 'A'){
        return 11;
    }
    if (!isNaN(valorNumerico)) {
        return parseInt(valorNumerico); // números del 2 al 10
    }

    // J, Q, K valen 10
    return 10;
}

//función para crear la carta en el html
function aniadirCarta(zona){
    let carta = document.createElement('img');
    carta.src= `assets/cartas/${cartaSolicitada}.png` 
    carta.classList.add('carta');
    carta.alt = 'carta';
    zona === zonaCartasJugador ? zonaCartasJugador.append(carta) : zonaCartasComputadora.append(carta);
}

//eventos:
botonNuevoJuego.addEventListener('click', () =>{
    baraja = crearBaraja();
});


botonPedirCarta.addEventListener('click', () =>{

    pedirCarta();
    if(cartaSolicitada.length < 1){
        alert('No hay cartas en el deck');
        return;
    }
    console.log(cartaSolicitada);
    aniadirCarta(zonaCartasJugador);

    //*HAY QUE CAMBIAR AHORA LA VARIABLE DE RETORNO DE LA FUNCIÓN DEL VALOR DE LA CARTA Y COGERLA DE LA GLOBAL
 
    // zonaCartasJugador.append(cartaHtml);
    // contadorJugador += valorCarta(cartaPedida);
    // if(contadorJugador >=21){

    //     alert('El jugador 1 ha ganado');
    // }
    
    

    /*Como el array se guarda en el heap, smallJugador aunque sea una variable directa que asigna el valor del array puntuaciones
    se le puede pasar la asignación directa por innerText y parsear a integer el contenido del contador.
    NO HACE FALTA COGER A arrayPuntuaciones[0] directamente, aunque se podría. Pero aprovechamos el valor por referencia.
    */
    smallJugador.innerText=parseInt(contadorJugador);
    
});


botonDetener.addEventListener('click', ()=>{

    console.log('Click en detener');
});



/*LA ASIGNACION DEL DOM Y VARIABLES ARRIBA, PARA UNA VEZ HOISTING, JAVASCRIPT RECONOZCA LAS ASIGNACIONES EN EL DOCUMENT
Y NO EJECUTE FUNCIONES SIN SABER A QUÉ REFIERE. MISMA LÓGICA PARA LOS LISTENERS.
*/