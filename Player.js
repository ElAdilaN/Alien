import Deck from './Deck.js';
let aPlayer;

export default class Player {
    constructor() {
        this.name = '';
        this.img = '';
        this.cardsPrison = new Deck();
        this.handCards = new Deck();
        
        /* 
        this.cardsPiste = new Deck();
        this.cardsChasseur = new Deck();
        this.cardsCaptured = new Deck(); */
        this.state = 'active';
        this.wins = 0;
    }

    createPlayer(playersArray, numPlayers, arrNames) {
        for (let i = 0; i < numPlayers; i++) {
            aPlayer = new Player();
            aPlayer.name = arrNames[Math.floor(Math.random() * 10)];
            aPlayer.state = "active";


            playersArray.push(aPlayer);
        }
        return playersArray;
    }



     giveFiveCards(playersArray, allCards) {
        for (let i = 0; i < playersArray.length; i++) {
            for (let j = 0; j < 5; j++) {

                const card = allCards.pop();
                playersArray[i].handCards.cards.push(card);


               
            }
        }
        return playersArray;
    }
}
