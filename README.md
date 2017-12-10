# Match
Match is a remake of the classic memory game _Concentration_. Sixteen cards are placed face down and players must choose two at a time and try to eight different pairs.

## About `index.html`
The game board is a `<ul>` element and each `<li>` creates a card. Everything else should be straightforward.

## About `app.css`
Card flip animations created by way of CSS `transition` property upon the card background property.

`app.css` utilizes several `media queries` _located at the bottom of the document_ to scale content down for smaller screen sizes.


## Functions in `app.js`
All of logic that makes the game run is stored in the app.js file which also uses jQuery to manipulate the DOM accordingly.

#### `generateDeck()`
Called on `$(document).ready` and game reset to generate a randomized deck of shuffled playing cards. Also initiates an interval function responsible for keeping time.

#### `shuffle(array)`
Function supplied by Udacity which takes an `array` as an input an returns a new array with the same items in random order. Used by `generateDeck()` to create randomized deck.

#### `$('.card').click`
Adds classes to cards when clicked so that underside is revealed. Invokes `matchTest()` once two cards a re flipped.

#### `matchTest()`
Tests two see whether two cards match. Flips them back over if not, applies match stylings if they do.

Other logic handled by `matchTest()`:
* Updates player remaining star count and  guess count
* Checks for game finish and generates winner screen
  * Victory screen utilizes _Confetti-js_ provided by [NPMJS](https://www.npmjs.com/package/confetti-js). Confetti generation code is housed in `js/index.min.js`.

#### `reset()`
Used to **create a new game** (generate new deck, reset timer, star count, etc.). Activated when either in-game **Reset** button or **Play Again** buttons are clicked.
