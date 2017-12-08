var matchArray = [];

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
    var first = $('.selected').find('i').eq(0).attr("class");
    var second = $('.selected').find('i').eq(1).attr("class");

    if ( first === second ) {
        $('.selected').toggleClass("match", true);
        $('.selected').toggleClass("selected", false);
    } else {
        setTimeout(function() {
            $('.selected').toggleClass("selected", false);
        }, 500);
    }

    if ( $('.match').length === 16 ) {
        setTimeout(function() {
            alert ('Victory!');
        }, 500);
    }


}


$('.card').click(function(evt){
    if ($('.selected').length < 2 && $(evt.target).hasClass("selected") === false) {
        $(evt.target).toggleClass("selected");
        if ($('.selected').length === 2) {
            matchTest();
        }
    }
});
