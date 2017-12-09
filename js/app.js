var tryCount = 0;

$(document).ready(function() {
    var randomArray = shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);

    for (var i=0; i<16; i++) {
        var card = $('li').eq(i);

        if (randomArray[i] === 1 || randomArray[i] === 2) {
          card.append( "<i class=\"fa fa-anchor\"></i>" );
        } else if (randomArray[i] === 3 || randomArray[i] === 4) {
          card.append( "<i class=\"fa fa-diamond\"></i>" );
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
});


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function matchTest(){
    var first = $('.selected').find('i').eq(0).attr("class");  //Class names for the fa icons are what is used
    var second = $('.selected').find('i').eq(1).attr("class"); //to test for matches.
    tryCount += 1;                                             //Every two card flips will tricker an increment of guess count
    $('#guess-counter').html(`Guess Count: ${tryCount}`);      //Visually updates the guess count for the player

    if (tryCount > 12 && tryCount < 16) {          //This block of code progressively decreases the number
      $('#star-count').html(`☆☆☆☆`);               //of stars with the more guesses it takes to solve
    } else if (tryCount >= 16 && tryCount < 20) {
      $('#star-count').html(`☆☆☆`);
    } else if (tryCount >= 20 && tryCount < 23) {
      $('#star-count').html(`☆☆`);
    } else if (tryCount >= 23) {
      $('#star-count').html(`☆`);
    }

    if ( first === second ) {                           //If cards match...
        $('.selected').toggleClass("match", true);      //apply the .match class which changes the background color.
        $('.selected').toggleClass("selected", false);  //remove the .selected class which is for cards currently being guessed.
    } else {
        setTimeout(function() {
            $('.selected').toggleClass("selected", false); //If the cards do not match, flip them back over after half a second
        }, 500);
    }

    if ( $('.match').length === 16 ) {                      //This code checks to see if the player has won the game. If so...
        setTimeout(function() {
            var starCount = $('#star-count').html();        //stores the star counts html in a variable for victory pop-up message

            $('.winner-overlay').css({"display": "inline-block", "position": "absolute", "z-index": "1", "top": "0", "left": "0"}); //creates grey overlay

            var confettiSettings = { target: 'my-canvas', height: 1100 };  //this code makes use of the confetti code stored in js/index.min.js
            var confetti = new ConfettiGenerator(confettiSettings);   //confetti will display on player victory
            confetti.render();                                        //confetti complements of npmjs https://www.npmjs.com/package/confetti-js

            $('.winner-pop-up').css({"z-index": "3", "display": "block"});               //causes the hidden winner pop-up screen to appear
            $('.winner-text').html(`You completed the puzzle in ${tryCount} guesses!`); //uses tryCount to tell the player how many guesses it took them
            $('.stars').html(starCount);                                             //displays the appropriate number of stars on pop-up victory screen

        }, 500); //half second delay
    }
}


$('.card').click(function(evt){
    var currentCardClass = $(evt.target).attr("class");
    if ($('.selected').length < 2 && (currentCardClass !== "card selected" && currentCardClass[0] !== "f")) {
        $(evt.target).toggleClass("selected");
        if ($('.selected').length === 2) {
            matchTest();
        }
    }
});
