let tryCount = 0;    //This is a global variable responsible for keeping track of how many guesses the player has made throughout the game.
let time = 0;        //Global variable meant to keep track of elapsed time, increased via below setInterval function

let confettiSettings = { target: 'my-canvas', height: 1100 };  //this code makes use of the confetti code stored in js/index.min.js
let confetti = new ConfettiGenerator(confettiSettings);        //confetti complements of npmjs https://www.npmjs.com/package/confetti-js
                                                               //variables global b.c confetti is started and stopped in different functions
let refreshIntervalId;  //variable will be set equal to setInterval timer function by generateDeck(), global b.c. accessed by multiple functions

$(document).ready(function() {
  generateDeck();               //calls the below function to generate the deck on document ready
});

function generateDeck() {                               //This is the function responsible for creating a new shuffled set of cards
    let randomArray = shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);  //This is the array that will be randomized based upon the below shuffle function

    for (let i=0; i<16; i++) {       //Cylcles through 16 times for the 16 cards to be generated
        let card = $('li').eq(i);    //Each iteration sets variable card equal to the i-th li card element

        if (randomArray[i] <= 2) {           //Since the randomArray will randomly have one of each number 1 through 16, the
          card.append( "<i class=\"fa fa-anchor\"></i>" );            //the following logic is set up to append the appropriate class code for a given
        } else if (randomArray[i] <= 4) {    //fa icon to the <i> element. This for-loop will result in 16 cards with 8 different
          card.append( "<i class=\"fa fa-diamond\"></i>" );           //icons and two of each icon.
        } else if (randomArray[i] <= 6) {
          card.append( "<i class=\"fa fa-rebel\"></i>" );
        } else if (randomArray[i] <= 8) {
          card.append( "<i class=\"fa fa-snowflake-o\"></i>" );
        } else if (randomArray[i] <= 10) {
          card.append( "<i class=\"fa fa-futbol-o\"></i>" );
        } else if (randomArray[i] <= 12) {
          card.append( "<i class=\"fa fa-first-order\"></i>" );
        } else if (randomArray[i] <= 14) {
          card.append( "<i class=\"fa fa-bolt\"></i>" );
        } else if (randomArray[i] <= 16) {
          card.append( "<i class=\"fa fa-bicycle\"></i>" );
        }
    }

    refreshIntervalId = setInterval(function() {  //This is responsible for incrementing the elapsed time and updating timer on screen.
        time += 1;
        let seconds = time % 60;
        if (time >= 60) {
            let minutes = Math.floor(time / 60);  //below if,else statements used to display proper time based on the amount elapsed.
            if (seconds < 10) {
                $('#timer').html(`Time: ${minutes}:0${seconds}`);
            } else {
                $('#timer').html(`Time: ${minutes}:${seconds}`);
            }
        } else {
            if (seconds < 10) {
                $('#timer').html(`Time: 0:0${seconds}`);
            } else {
                $('#timer').html(`Time: 0:${time}`);
            }
        }
    }, 1000); //function is run every 1 second
}



//This is the array shuffle function which was provided to us by Udacity.
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function matchTest(){    //Fucntion to test for matches and add/remove styles accordingly for each scenario
    let first = $('.selected').find('i').eq(0).attr("class");  //Class names for the fa icons are what is used to test for matches
    let second = $('.selected').find('i').eq(1).attr("class");
    tryCount += 1;                                             //Every two card flips will trigger an increment of guess counter
    $('#guess-counter').html(`Guess Count: ${tryCount}`);      //Visually updates the guess count for the player at top of screen

    if (tryCount > 14 && tryCount < 22) {          //This block of code progressively decreases the number of stars with the more
      $('#star-count').html(`☆☆`);               //guesses it takes to solve. Fewer guesses will leave more stars.
    } else if (tryCount >= 22) {
      $('#star-count').html(`☆`);
    }

    if ( first === second ) {                           //If cards match according to the class names...
        $('.selected').toggleClass("match", true);      //apply the .match class which changes the card background color.
        $('.selected').toggleClass("selected", false);  //remove the .selected class which is for live cards currently being guessed.
    } else {
        setTimeout(function() {
            $('.selected').toggleClass("selected", false); //If the cards do not match, flip them back over after half a second
        }, 500);
    }

    if ( $('.match').length === 16 ) {                      //This code checks to see if the player has won the game. If so...
        setTimeout(function() {
            let starCount = $('#star-count').html();        //stores the star counts html in a variable for victory pop-up message
            let finishTime = $('#timer').html();            //stores the time html in a variable for victory pop-up message

            clearInterval(refreshIntervalId);               //freezes the time upon game over, this is why refreshIntervalId is global variable
                                                            //(so it can be stopped in matchTest() function and re-initiated again in generateDeck().

            $('.winner-overlay').css({"display": "inline-block", "position": "absolute",
                                      "z-index": "1", "top": "0", "left": "0"}); //makes grey page overlay appear over screen at game finish


            confetti.render();                                        //causes the confetti to appear on game victory screen

            $('.winner-pop-up').css({"z-index": "3", "display": "block"});               //causes the hidden victory pop-up screen to appear

            if (time < 60) { //uses finishTime and tryCount to tell the player how many guesses it took them (message differs slightly after one minute)
                $('.winner-text').html(`You completed the puzzle in ${finishTime.slice(8,10)} seconds with ${tryCount} guesses!`);
            } else {
                $('.winner-text').html(`You completed the puzzle in ${finishTime.slice(6,10)} with ${tryCount} guesses!`);
            }

            $('.stars').html(starCount);    //displays the appropriate number of stars on victory pop-up

        }, 500); //half second delay
    }
}

function reset() {     //this is the function which is invoked when the player resets or chooses to play again

  clearInterval(refreshIntervalId);   //stops the timer interval function so it can be restarted again fresh

  $('li').attr("class", "card");   //removes classes from li cards so that none show as matched or selected on refresh
  $('li').children().remove();     //removes the <i> tags so that they can be re-added with new icons by generateDeck()
  generateDeck();        //invokes generateDeck() to create a new shuffled deck of cards

  $('#guess-counter').html(`Guess Count: 0`);  //guess count reset
  $('#star-count').html(`☆☆☆`);              //star count reset to five stars
  $('#timer').html(`Time: 0:00`);             //timer reset to 0:00


  $('.winner-pop-up').removeAttr("style");    //winner pop-up hidden again when styles removed on reset
  $('.winner-overlay').removeAttr("style");   //winner grey overlay hidden again when styles removed on reset

  $('#my-canvas').removeAttr("width");   //removes canvas width resulting in width of 0
  $('#my-canvas').removeAttr("height");  //removes canvas height resulting in width of 0, these collapse confetti canvas until confetti reinvoked
  confetti.clear();        //clears the confetti shower

  tryCount = 0;   //Guess attempts reset to 0
  time = 0;       //Timer reset to 0
}


$('.card').click(function(evt){        //This is the card click event handler function

    let currentCardClass = $(evt.target).attr("class");         //Class attribute used by if statement to test if valid card has been clicked
    if ($('.selected').length < 2 && (currentCardClass !== "card selected" && currentCardClass !== "card match" && currentCardClass[0] !== "f")) {
        //Above if statement ensures only 2 cards can be selected at a time, clicking cards already flipped (matched or selected) won't work.

        $(evt.target).toggleClass("selected");     //Add the class .selected which will apply appropriate stylings
        if ($('.selected').length === 2) {
            matchTest();            //If the click flips over the second of two selected cards, invoke the matchTest() function
        }
    }
});

$('#reset').click(function() {  //This is the event handler for when 'reset game' is clicked
  reset();   //invokes reset() function
});

$('.play-again').click(function() {   //This is the event handler for when 'play again' is clicked
  reset();   //invokes reset() funciton
});
