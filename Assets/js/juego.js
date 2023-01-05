

(() => {
'use strict'

let deck = [];
const tipos = ['C', 'D' , 'H', 'S'],
      especiales = ['A','J','Q','K'];

let puntosJugadores = [];


//Referencias del html
const btnPedir   = document.querySelector('#btnPedir'),
btnDetener = document.querySelector('#btnDetener'),
btnNuevo   = document.querySelector('#btnNuevo');

const divCartasJugadores  = document.querySelectorAll('.divCartas'),
puntosHTML = document.querySelectorAll('small');


// esta funcion inicializa el juego
const inicializarJuego = (numJugadores = 2) => {
    crearDeck();
    puntosJugadores = [];
   for(let i = 0; i < numJugadores; i++){
    puntosJugadores.push(0);

   }

  puntosHTML.forEach(elem => elem.innerText = 0);
  divCartasJugadores.forEach(elem => elem.innerHTML = '');
            
            btnDetener.disabled = false;
            btnPedir.disabled   = false;
            
}



const crearDeck = () =>{
    deck = [];
    for( let i = 2; i <= 10; i++){
        
        for(let tipo of tipos){
            deck.push(i + tipo);
            
        }
    }
    
    for(let tipo of tipos){
        for(let espe of especiales){
            deck.push(espe + tipo);
        }
    }
    
    
    deck = _.shuffle(deck);
    return deck;
    
    
}
inicializarJuego();







const pedirCarta = () =>{

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    

   
    return deck.shift();
    
}

//pedirCarta();

//se obtiene el valor de la carta
const valorCarta = (carta) => {


    const valor = carta.substring(0, carta.length - 1);
    
    return ( isNaN(valor)) ? 
            (valor ==='A') ? 11 : 10
            : valor * 1;
    
            
    
    
    
    
    
    
    // let puntos = isNaN(valor) === false  ?  valor* 1:
    //                    valor  === 'A'    ? 11     : 10;

    //              console.log(puntos);
    
    
    // if(isNaN(valor)){
        //     puntos = (valor === 'A') ? 11 : 10;
        // }else{
            //     puntos = valor * 1;
            // }
            // console.log(puntos);
        }
        
        
        
        
        //eventos
        
        //turno: 0 = primer jugador y el ultimo sera la computadora
        const acumularPuntos = (carta , turno) =>{
            puntosJugadores[turno] += valorCarta(carta);
            puntosHTML[turno].innerText = puntosJugadores[turno];
            return puntosJugadores[turno];
            
        }
        
        const crearCarta = (carta,turno) =>{
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append(imgCarta)
            
            return carta;
            
        }
        
        const determinarGanador = ()=>{
            const [puntosMinimos, puntosComputadora] = puntosJugadores;
            setTimeout(() => {
                
                if(puntosMinimos > 21){
                    alert('Computadora Gana');
                }
                else if(puntosComputadora > 21){
                    alert('Jugador Gana');
                }
                else if(puntosMinimos > puntosComputadora){
                    alert('Jugador Gana');
                }else if(puntosMinimos < puntosComputadora ){
                    
                    alert('Computadora Gana');
                    
                }else if (puntosComputadora === puntosMinimos){
                    
                    alert('Empate Nadie gana');
                }
                
            }, 20);
            
        }
        
        
        
        const turnoComputadora = (puntosMinimos) => {
            
            let puntosComputadora = 0;
            
            
            do {
                const carta = pedirCarta();
                
                
                puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
                crearCarta(carta, puntosJugadores.length - 1);
                
                //<img class="carta" src="assets/cartas/6H.png" insertar carta en el div>
                // const imgCarta = document.createElement('img');
                // imgCarta.src = `assets/cartas/${carta}.png`;
                // imgCarta.classList.add('carta');
                // divCartasComputadora.append(imgCarta);
                
                if(puntosMinimos > 21){
                    break;
                }
                
            } while ((puntosMinimos > puntosComputadora) && ( puntosMinimos <= 21 ));
            
            determinarGanador();
            
        }

        //mensajes
        //turno jugador
        btnPedir.addEventListener('click', () =>{
            const carta = pedirCarta();
            const puntosJugador = acumularPuntos(carta,0);
            
            crearCarta(carta, 0);
            
          
            
            if(puntosJugador > 21){
                console.warn(`Jugador Pierde se paso de 21 ${puntosJugador}`);
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
                
                
                
                
            }else if(puntosJugador === 21){
                console.warn('21, genial');
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
                
            }
            
            console.log(deck);
            
        });
        
        //turno computadora
        
        btnDetener.addEventListener('click', ()=>{
            
            
            btnDetener.disabled = true;
            btnPedir.disabled    = true;
            
            turnoComputadora(puntosJugadores[0]);
            
            
            
            
            
            
        });
        
        btnNuevo.addEventListener('click' , ()=>{
            
            //reseteo de valores 
            inicializarJuego();
            
            console.log(deck);
        });
        
    })();
    
    
    