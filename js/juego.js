

let cartasBasicas = ['C','H','S','D'];
let cartasEspeciales = ['A','J','Q','K'];


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



const pedirCarta = () =>{
    if(baraja.length === 0){
        throw 'No hy cartas en el deck';
    }
    cartaSolicitada = baraja.pop();
    return cartaSolicitada;
}

const baraja = crearBaraja();
cartaObtenida =  pedirCarta();
console.log(cartaObtenida);
console.log(baraja);