

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



const baraja = crearBaraja();
console.log(baraja);
