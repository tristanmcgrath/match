let tryCount = 0;    //This is a global variable responsible for keeping track of how many guesses the player has made throughout the game.
let confettiSettings = { target: 'my-canvas', height: 1100 };  //this code makes use of the confetti code stored in js/index.min.js
let confetti = new ConfettiGenerator(confettiSettings);   //confetti will display on player victory


$(document).ready(function() {
  generateDeck();               //calls the below function to generate the deck on document ready
});

function generateDeck() {                               //This is the function responsible for creating a new shuffled set of cards
    let randomArray = shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);  //This is the array that will be randomized based upon the below shuffle function

    for (let i=0; i<16; i++) {       //Cylcles through 16 times for the 16 cards to be generated
        let card = $('li').eq(i);    //Each iteration sets variable card equal to the i-th li card element

        if (randomArray[i] === 1 || randomArray[i] === 2) {           //Since the randomArray will randomly have one of each number 1 through 16, the
          card.append( "<i class=\"fa fa-anchor\"></i>" );            //the following logic is set up to append the appropriate class code for a given
        } else if (randomArray[i] === 3 || randomArray[i] === 4) {    //fa icon to the <i> element. This for-loop will result in 16 cards with 8 different
          card.append( "<i class=\"fa fa-diamond\"></i>" );           //icons and two of each icon.
        } else if (randomArray[i] === 5 || randomArray[i] === 6) {
          card.append( "<i class=\"fa fa-rebel\"></i>" );
        } else if (randomArray[i] === 7 || randomArray[i] === 8) {
          card.append( "<i class=\"fa fa-snowflake-o\"></i>" );
        } else if (randomArray[i] === 9 || randomArray[i] === 10) {
          card.append( "<i class=\"fa fa-futbol-o\"></i>" );
        } else if (randomArray[i] === 11 || randomArray[i] === 12) {
          card.append( "<i class=\"fa fa-first-order\"></i>" );
        } else if (randomArray[i] === 13 || randomArray[i] === 14) {
          card.append( "<i class=\"fa fa-bolt\"></i>" );
        } else if (randomArray[i] === 15 || randomArray[i] === 16) {
          card.append( "<i class=\"fa fa-bicycle\"></i>" );
        }
    }
}



function shuffle(array) {                                          //This is the array shuffle function which was provided to us by Udacity.
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

    if (tryCount > 12 && tryCount < 16) {          //This block of code progressively decreases the number of stars with the more
      $('#star-count').html(`☆☆☆☆`);               //guesses it takes to solve. Fewer guesses will leave more stars.
    } else if (tryCount >= 16 && tryCount < 20) {
      $('#star-count').html(`☆☆☆`);
    } else if (tryCount >= 20 && tryCount < 23) {
      $('#star-count').html(`☆☆`);
    } else if (tryCount >= 23) {
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

            $('.winner-overlay').css({"display": "inline-block", "position": "absolute",
                                      "z-index": "1", "top": "0", "left": "0"}); //makes grey page overlay appear at game finish


            confetti.render();                                        //confetti complements of npmjs https://www.npmjs.com/package/confetti-js

            $('.winner-pop-up').css({"z-index": "3", "display": "block"});               //causes the hidden winner pop-up screen to appear
            $('.winner-text').html(`You completed the puzzle in ${tryCount} guesses!`); //uses tryCount to tell the player how many guesses it took them
            $('.stars').html(starCount);                                             //displays the appropriate number of stars on pop-up victory screen

        }, 500); //half second delay
    }
}

function reset() {

  $('li').attr("class", "card");
  $('li').children().remove();
  generateDeck();

  $('#guess-counter').html(`Guess Count: 0`);
  $('#star-count').html(`☆☆☆☆☆`);
  $('#timer').html(`0:00`);


  $('.winner-pop-up').removeAttr("style");
  $('.winner-overlay').removeAttr("style");

  $('#my-canvas').removeAttr("width");
  $('#my-canvas').removeAttr("height");
  confetti.clear();

  tryCount = 0;
}


$('.card').click(function(evt){                                 //This is the card click event function
    let currentCardClass = $(evt.target).attr("class");         //Class attribute used to test if valid card has been clicked (i.e. not already chosen)
    if ($('.selected').length < 2 && (currentCardClass !== "card selected" && currentCardClass !== "card match" && currentCardClass[0] !== "f")) {
                                              //Above if statement ensures only 2 cards can be selected at a time, clicking cards already flipped won't work
        $(evt.target).toggleClass("selected");                  //Add the class .selected which will apply appropriate stylings
        if ($('.selected').length === 2) {
            matchTest();                                //If the click flips over a second card, then matchTest() is invoked
        }
    }
});

$('#reset').click(function() {
  reset();
});

$('.play-again').click(function() {
  reset();
});
