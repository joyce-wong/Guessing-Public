/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

document.getElementById('')

function generateWinningNumber(){
    return Math.floor(Math.random() * (Math.floor(100) - Math.ceil(1) + 1 ) + Math.ceil(1))
}

// function shuffle(arr){
//     var m = arr.length, t, i;
// }

// function shuffle(array) {
//     let m = array.length, t, i;
  
//     // While there remain elements to shuffle…
//     while (m) {
  
//       // Pick a remaining element…
//       i = Math.floor(Math.random() * m--);
  
//       // And swap it with the current element.
//       t = array[m];
//       array[m] = array[i];
//       array[i] = t;
//     }
  
//     return array;
//   }


function shuffle(arr){
    //Fisher-Yates - https://bost.ocks.org/mike/shuffle/
    //Full stack variation on algorithim which is faster
    for (let i = arr.length - 1; i > 0; i--){
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = arr[i]
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
}

class Game{
    constructor(){
    this.playersGuess = null
    this.pastGuesses = []
    this.winningNumber = generateWinningNumber()
    this.gameOver = false
    this.feedbackText = ''
    }
    difference(){
        return Math.abs(this.playersGuess - this.winningNumber)
    }
    isLower(){
        if(this.playersGuess < this.winningNumber){
            return true;
        }
        return false;
    }
    playersGuessSubmission(num){
        this.playersGuess = num;
        if(this.playersGuess < 1 || this.playersGuess > 100 || isNaN(this.playersGuess)){
            this.feedbackText = "Your guess must be a number from 1 to 100."
        document.querySelector('#guess-feedback > h4').innerHTML = this.feedbackText;
        // document.querySelector(`.guess-list .guess:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess
        return this.feedbackText
        } else {
            return this.checkGuess()
        }
    }

    checkGuess(){
        if(this.playersGuess === this.winningNumber){
            this.pastGuesses.push(this.playersGuess)
            this.feedbackText = 'You win!'
            this.gameOver = true
        }
        else if(this.pastGuesses.includes(this.playersGuess)){
            this.feedbackText = 'You have already guessed that number.'
        }
        else {
            this.pastGuesses.push(this.playersGuess)
        if(this.pastGuesses.length === 5){
            this.feedbackText = `You lose. The winning number was ${this.winningNumber}.`
            this.gameOver = true
         } else {
        if(this.difference() < 10)this.feedbackText = 'You\'re burning up!'
        
        else if(this.difference() < 25)this.feedbackText = 'You\'re lukewarm.'
        
        else if(this.difference() < 50)this.feedbackText = 'You\'re a bit chilly.'
        else this.feedbackText = 'You\'re ice cold!'
    }
}
        document.querySelector('#guess-feedback > h4').innerHTML = this.feedbackText;
        document.querySelector(`.guess-list .guess:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess
        return this.feedbackText
    }
    provideHint(){
        this.hint = [];
        if(this.pastGuesses.length > 2 && this.pastGuesses.length < 5){
        this.hint.push(` ${this.winningNumber}`)
        for(let i = 0; i < 2; i++){
            this.hint.push(` ${generateWinningNumber()}`)
        }
        shuffle(this.hint)
        document.querySelector('#hint-feedback > h4').innerHTML = `The winning number is one of these: ${this.hint}.`;
        return this.hint
    }
        this.feebackText = 'Try to guess at least 3 times before asking for a hint.'
        document.querySelector('#guess-feedback > h4').innerHTML = 'Try to guess at least 3 times before asking for a hint.'
        // document.querySelector(`.guess-list .guess:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess
        return this.feedbackText
    }
}
function newGame(){
    return new Game()
    
}

function playGame(){
    let game = newGame()
// We are grabbing the button from our html
const button = document.querySelector('button');

// We are listening for when the use clicks on our button.
// When they click, we will check in the input field to see if they have guessed a number. Then we will run the function `checkGuess`, and give it the player's guess, the winning number, and the empty array of guesses!
button.addEventListener('click', function() {
  const playersGuess = +document.querySelector('input').value;
  document.querySelector('input').value = '';

  game.playersGuessSubmission(playersGuess);
});

const keyEnter = document.getElementById('guess-field')
    keyEnter.addEventListener('keyup', function(event) {
        if (event.code === 'Enter')
        {
            event.preventDefault();
            document.getElementById('submit-button').click();
        }
    });
const hintButton = document.getElementById('hint-button');

// We are listening for when the use clicks on our button.
// When they click, we will check in the input field to see if they have guessed a number. Then we will run the function `checkGuess`, and give it the player's guess, the winning number, and the empty array of guesses!
hintButton.addEventListener('click', function() {
 

  game.provideHint();
});

const replayButton = document.getElementById('replay');

// We are listening for when the use clicks on our button.
// When they click, we will check in the input field to see if they have guessed a number. Then we will run the function `checkGuess`, and give it the player's guess, the winning number, and the empty array of guesses!
replayButton.addEventListener('click', function() {
 
if(game.gameOver) document.location.reload()
});
}

// start up the game!
playGame(); // note: running this function will cause the test specs to fail