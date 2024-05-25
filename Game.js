import Card from './Card.js';
import Deck from './Deck.js';
import Player from './Player.js';

export default class Game {
    constructor() {
        this._nPlayers = 0;
        this._torn = 0;
        this._playersArray = [];
        this._allCards = new Deck();
        this._migCard = new Card();
        this._currentCard = new Card();
        this._previousCards = new Deck();
        this._numberOfPlayers = 0;
        this._draggedCard = null;
        this._dropZone = null;
    }

    // Getter and setter for torn
    get Torn() {
        return this._torn;
    }

    set Torn(value) {
        this._torn = value;
    }

    // Getter and setter for currentCard
    get CurrentCard() {
        return this._currentCard;
    }

    set CurrentCard(value) {
        this._currentCard = value;
    }

    // Getter and setter for playersArray
    get PlayersArray() {
        return this._playersArray;
    }

    set PlayersArray(value) {
        this._playersArray = value;
    }

    // Getter for allCards
    get AllCards() {
        return this._allCards.cards;
    }

    // Setter for allCards
    set AllCards(value) {
        this._allCards.cards = value;
    }

    // Getter and setter for migCard
    get MigCard() {
        return this._migCard;
    }

    set MigCard(value) {
        this._migCard = value;
    }

    // Getter for previousCards
    get PreviousCards() {
        return this._previousCards;
    }

    // Setter for previousCards
    set PreviousCards(value) {
        this._previousCards = value;
    }



    // Getter and setter for numberOfPlayers
    get NumberOfPlayers() {
        return this._numberOfPlayers;
    }

    set NumberOfPlayers(value) {
        this._numberOfPlayers = value;
    }

    initGame(nPlayer) {

        this._nPlayers = nPlayer;
        for (let i = 1; i <= nPlayer; i++) {
            const pCont = document.getElementById(`playerContainer${i}`);
            pCont.style.visibility = "visible";

        }
        document.querySelector('.gameContainer').style.visibility = "visible";
        document.querySelector('.part2').style.visibility = "visible";





        this._numberOfPlayers = nPlayer;
        // Create and shuffle cards
        let bigCard = new Deck();
        this._allCards = bigCard.createCards([]);
        this._allCards = bigCard.shuffleArray(this._allCards);



        do {
            this._currentCard = this._allCards.pop();  // Pop a card from the deck
            if (this._currentCard.type === 'CardPiste') {
                this._migCard = this._currentCard; //  set the "piste" card as migCard
                this._previousCards.cards.push(this._currentCard);




                let container = document.getElementById(`migCard`);
                let cardtoadd = this._migCard;
                let cardDiv = document.createElement('div');

                cardDiv.className = `card cardPiste ${cardtoadd.val1}-${cardtoadd.val2}`;
                // Create the 'up' div
                const upDiv = document.createElement('div');
                upDiv.className = `up val-${cardtoadd.val1}`;
                upDiv.textContent = `${cardtoadd.val1}`;

                // Create the 'down' div
                const downDiv = document.createElement('div');
                downDiv.className = `down val-${cardtoadd.val2}`;
                downDiv.textContent = `${cardtoadd.val2}`;

                // Append the 'up' and 'down' divs to the 'card' div
                cardDiv.setAttribute("data-value1", `${cardtoadd.val1}`);
                cardDiv.setAttribute("data-value2", `${cardtoadd.val2}`);
                cardDiv.appendChild(upDiv);
                cardDiv.appendChild(downDiv);
                container.appendChild(cardDiv);
            } else {
                // If it's not a "piste" card, put it back in the deck
                this._allCards.unshift(this._currentCard);
            }
        } while (this._currentCard && this._currentCard.type !== 'CardPiste'); // Repeat until we find a "piste" card


        const playerObj = new Player();

        const playerNames = [
            "AlienHunterX",
            "GalacticWrangler",
            "StarStriker",
            "XenobeastMaster",
            "CosmicConqueror",
            "AstroSnatcher",
            "ExtraterrestrialEradicator",
            "NovaNettler",
            "IntergalacticInfiltrator"
        ];


        this._playersArray = playerObj.createPlayer(this._playersArray, this._numberOfPlayers, playerNames);

        this._playersArray = playerObj.giveFiveCards(this._playersArray, this._allCards);

        // this.updateCard(this._playersArray);
        this.addCards(this._playersArray);
        this.activateDrag();

        let btnGive = document.getElementById("next1");
        btnGive.addEventListener("click", () => this.activateDrag());



    }


    addCards(playersArray) {

        for (let i = 0; i < this._nPlayers; i++) {
            let container = document.getElementById(`handCards${i + 1}`);
            for (let j = 0; j < 5; j++) { // Use j < 5 instead of j <= 5 to iterate over 5 cards
                let cardtoadd = playersArray[i].handCards.cards[j];
                let cardDiv = document.createElement('div');
                cardDiv.draggable = true;

                if (cardtoadd.type === "CardPiste") {
                    cardDiv.className = `card cardPiste ${cardtoadd.val1}-${cardtoadd.val2}`;
                    // Create the 'up' div
                    const upDiv = document.createElement('div');
                    upDiv.className = `up val-${cardtoadd.val1}`;
                    upDiv.textContent = `${cardtoadd.val1}`;

                    // Create the 'down' div
                    const downDiv = document.createElement('div');
                    downDiv.className = `down val-${cardtoadd.val2}`;
                    downDiv.textContent = `${cardtoadd.val2}`;

                    // Append the 'up' and 'down' divs to the 'card' div
                    cardDiv.setAttribute("data-value1", `${cardtoadd.val1}`);
                    cardDiv.setAttribute("data-value2", `${cardtoadd.val2}`);

                    cardDiv.appendChild(upDiv);
                    cardDiv.appendChild(downDiv);
                } else if (cardtoadd.type === "CardCaptured") {
                    cardDiv.className = `card CardCaptured ${cardtoadd.val1}`;
                    cardDiv.textContent = `${cardtoadd.val1}`;
                    cardDiv.setAttribute("data-value1", `${cardtoadd.val1}`);
                    cardDiv.setAttribute("data-value2", null);

                } else {
                    cardDiv.className = `card CardCaça ${cardtoadd.im1}`;
                    cardDiv.textContent = `${cardtoadd.im1}`;
                    cardDiv.setAttribute("data-value1", `${cardtoadd.val1}`);
                    cardDiv.setAttribute("data-value2", null);

                }

                container.appendChild(cardDiv);
            }
        }

    }



    /**
     * 
     */




    activateDrag() {
        console.log("before" + this._torn);
        this._torn = parseInt((this._torn % this._nPlayers) + 1);

        console.log("after" + this._torn);
        for (let i = 1; i <= this._nPlayers; i++) {
            // Select the parent div with the dynamic class name
            let parentDiv = document.querySelectorAll(`.handCards${i}`)[0];

            // Check if the handcard element exists
            if (parentDiv) {
                // Select all div elements with class 'card' within the 'handcard' div
                let cards = parentDiv.querySelectorAll('.card');

                // Determine if the current player should have draggable cards
                let isDraggable = (i === this._torn);

                // Set the draggable attribute for each card
                cards.forEach(card => {
                    card.draggable = isDraggable;

                    card.addEventListener('dragstart', (e) => this.dragStart(e, card));
                    card.addEventListener('dragend', (e) => this.dragEnd(e, card));
                });
            }
        }



        this._dropzone = document.getElementById('migCard');

        this._dropzone.addEventListener('dragover', (e) => this.dragOver(e));
        this._dropzone.addEventListener('dragenter', (e) => this.dragEnter(e));
        this._dropzone.addEventListener('dragleave', (e) => this.dragLeave(e));
        this._dropzone.addEventListener('drop', (e) => this.drop(e));

    }


    dragStart(e, card) {
        this._draggedCard = card;
        setTimeout(() => (card.style.display = 'none'), 0);


        e.dataTransfer.setData('text/plain', card.id); // Assuming you have set an ID for each card element
        e.dataTransfer.setData('value1', card.dataset.value1);
        e.dataTransfer.setData('value2', card.dataset.value2);
    }

    dragEnd(e, card) {
        this._draggedCard.style.display = 'block';
        this._draggedCard = null;
    };

    dragOver(e) {
        e.preventDefault();

        const val1Desti = e.dataTransfer.getData('value1');
        const val2Desti = e.dataTransfer.getData('value2');

        // Update the data attributes of the middle zone
        this._dropzone.setAttribute("data-value1", val1Desti);
        this._dropzone.setAttribute("data-value2", val2Desti);
    }

    dragEnter(e) {
        e.preventDefault();
        e.target.style.backgroundColor = 'lightyellow';
    }

    dragLeave(e) {
        e.target.style.backgroundColor = 'lightyellow';
    }

    drop(e) {
        e.preventDefault();



        const id = e.dataTransfer.getData('text/plain');
        const val1Origin = parseInt(e.dataTransfer.getData('value1'));
        const val2Origin = parseInt(e.dataTransfer.getData('value2'));
        const val1Desti = parseInt(this._migCard.val1);
        const val2Desti = parseInt(this._migCard.val2);

        console.log("here : " + this._dropzone.dataset);


        console.log("1o" + val1Origin);
        console.log("2o" + val2Origin);
        console.log("1d" + val1Desti);
        console.log("2d" + val2Desti);

        if (this.comprovaJugada(val1Origin, val2Origin, val1Desti, val2Desti)) {
            this._dropzone.innerHTML = '';
            this._dropzone.appendChild(this._draggedCard);

            this._migCard.val1 = val1Origin;
            this._migCard.val2 = val2Origin;

            this.removeCardFromPlayerHand(val1Origin, val2Origin);



        } else {
            this._draggedCard.style.display = 'block';
            this._dropzone.backgroundColor = 'lightgreen';
        }


    }

    comprovaJugada(val1Origin, val2Origin, val1Desti, val2Desti) {
        //if it's a piste card 
        if (val2Origin !== null) {
            //if it match with the card we have 
            if ((val1Origin === val1Desti &&  val2Origin !== null )
                || (val1Origin === val2Desti &&  val2Origin !== null ) 
                || (val2Origin === val1Desti &&  val1Origin !== null ) 
                ||(val2Origin === val2Desti &&  val1Origin !== null ) 
                
            ) {
                return true;
            }
        } else {
            return false;
        }
    }

    removeCardFromPlayerHand(val1, val2) {
        const player = this._playersArray[this._torn - 1]; // Adjust the index for zero-based array
        const handCards = player.handCards.cards;

        for (let i = 0; i < handCards.length; i++) {
            if (handCards[i].val1 === val1 && handCards[i].val2 === val2) {
                handCards.splice(i, 1);
                break;
            }
        }
    }



}
