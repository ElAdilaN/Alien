/* import Card from './Card.js';

const AlienNames = ["Xylorath", "Zepharn", "DrakThor", "Vorelia", "Krixilon", "Mzirath", "Targalon", "Zyphorax", "Ultravex", "Nyralith"];

export default class Deck {
    constructor() {
        this.cards = [];
    }

    createCards(allCard) {
        allCard = this.createPistes(allCard);
        allCard = allCard.concat(this.createCapturades(allCard));
        allCard = allCard.concat(this.createCaça(allCard));
        return allCard;
    }

    createPistes(allCard) {
        for (let i = 0; i <= 9; i++) {
            for (let j = i; j <= 9; j++) {
                let newCreatedCard = new Card(i, j, AlienNames[i], AlienNames[j], 'CardPiste');
                allCard.push(newCreatedCard);
            }
        }
        return allCard;
    }

    createCapturades() {
        let captured = [];
        for (let j = 0; j <= 9; j++) {
            let newCreatedCard = new Card(j, null, AlienNames[j], null, 'CardCaptured');
            captured.push(newCreatedCard);
        }

        return captured;
    }

    createCaça() {
        let captured = [];

        let newCreatedCard1 = new Card(null, null, "cardToHand", null, 'CardCaptured');
        captured.push(newCreatedCard1);
        let newCreatedCard2 = new Card(null, null, "prisonToPrison", null, 'CardCaptured');
        captured.push(newCreatedCard2);
        let newCreatedCard3 = new Card(null, null, "prisonToHand", null, 'CardCaptured');
        captured.push(newCreatedCard3);
        return captured;
    }

    shuffleArray(allCards) {
        for (let i = allCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
            [allCards[i], allCards[j]] = [allCards[j], allCards[i]]; // Swap elements at i and j indices
        }
        return allCards;
    }

}
 */

import Card from './Card.js';

const AlienNames = ["Xylorath", "Zepharn", "DrakThor", "Vorelia", "Krixilon", "Mzirath", "Targalon", "Zyphorax", "Ultravex", "Nyralith"];

export default class Deck {
    constructor() {
        this.cards = [];
    }

    createCards() {
        let allCards = [];
        allCards = this.createPistes(allCards);
        allCards = allCards.concat(this.createCapturades());
        allCards = allCards.concat(this.createCaça());
        return allCards;
    }

    createPistes(allCards) {
        for (let i = 9; i >= 1; i--) {
            for (let j = 0; j < i; j++) {
                let newCreatedCard = new Card(i, j, AlienNames[i], AlienNames[j], 'CardPiste');
                allCards.push(newCreatedCard);
            }
        }
        return allCards;
    }
    

    createCapturades() {
        let captured = [];
        for (let j = 0; j <= 9; j++) {
            let newCreatedCard = new Card(j, null, AlienNames[j], null, 'CardCaptured');
            captured.push(newCreatedCard);
        }

        return captured;
    }

    createCaça() {
        let captured = [];

        let newCreatedCard1 = new Card(null, null, "cardToHand", null, 'createCaça');
        captured.push(newCreatedCard1);
        let newCreatedCard2 = new Card(null, null, "prisonToPrison", null, 'createCaça');
        captured.push(newCreatedCard2);
        let newCreatedCard3 = new Card(null, null, "prisonToHand", null, 'createCaça');
        captured.push(newCreatedCard3);
        let newCreatedCard4 = new Card(null, null, "cardToHand", null, 'createCaça');
        captured.push(newCreatedCard4);
        let newCreatedCard5 = new Card(null, null, "prisonToPrison", null, 'createCaça');
        captured.push(newCreatedCard5);
        let newCreatedCard6 = new Card(null, null, "prisonToHand", null, 'createCaça');
        captured.push(newCreatedCard6);
        return captured;
    }

    shuffleArray(allCards) {
        for (let i = allCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
            [allCards[i], allCards[j]] = [allCards[j], allCards[i]]; // Swap elements at i and j indices
        }
        return allCards;
    }
}
