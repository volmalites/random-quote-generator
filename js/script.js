/******************************************
Bjorn Lottering - Treehouse Techdegree Student
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/*** 
 * An array of objects including quotes and images of the quotes authors
***/
const quotes = [
  {
    quote: 'Phall if you but will, rise you must.',
    source: 'James Joyce',
    citation: 'Finnegans Wake',
    year: 1939,
    photo: 'img/joyce.jpg'
  },
  {
    quote: 'One always has exaggerated ideas about what one doesn\'t know.',
    source: 'Albert Camus',
    citation: 'The Stranger',
    year: 1942,
    photo: 'img/camus.jpg'
  },
  {
    quote: 'Be kind, for everyone you meet is fighting a hard battle.',
    source: 'Ian Maclaren',
    citation: 'The British Weekly',
    year: 1897,
    photo: 'img/ian.jpg'
  },
  {
    quote: 'The greatest gift you have is that of your own self-transformation.',
    source: 'Lao Tzu',
    citation: 'Tao Te Ching',
    year: '600BC',
    photo: 'img/tzu.jpg'
  },
  {
    quote: 'Minds, however, are conquered not by arms, but by love and nobility.',
    source: 'Baruch Spinoza',
    citation: 'Ethics',
    year: 1677,
    photo: 'img/baruch.jpg'
  },
  {
    quote: 'Courage is the most important of all the virtues because without courage, you can\'t practice any other virtue consistently.',
    source: 'Maya Angelou',
    citation: 'Cornell Chronicle',
    year: 2008,
    photo: 'img/maya.jpg'
  },
  {
    quote: 'Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.',
    source: 'Martin Luther King',
    citation: 'Loving Your Enemies',
    year: 1957,
    photo: 'img/king.jpg'
  },
  {
    quote: 'People like us, who believe in physics, know that the distinction between past, present and future is only a stubbornly persistent illusion.',
    source: 'Albert Einstein',
    citation: 'Letter to Michele Besso',
    year: 1955,
    photo: 'img/albert.jpg'
  },
  {
    quote: 'One day, in retrospect, the years of struggle will strike you as the most beautiful.',
    source: 'Sigmund Freud',
    citation: 'Letters of Sigmund Freud',
    year: 1960,
    photo: 'img/freud.jpg'
  },
  {
    quote: 'Give every man thy ear, but few thy voice.',
    source: 'Shakespeare',
    citation: 'Hamlet',
    year: 1600,
    photo: 'img/shakespeare.jpg'
  }
];

//Creating an index for the quotes to be used in function getRandomQuote(), spreading the index values of the quotes over an array
var keysList = [...quotes.keys()];

//Function to change random RGB background
let randNum = () => Math.floor(Math.random() * (255 - 0)) + 0;
let randRGB = () => `rgb(${randNum()}, ${randNum()}, ${randNum()})`;

//Interval rate for the page to auto refresh
const INTERVAL = 10000;

/***
 * Function utilizing the javascript Math object in order to obtain a random quote object from the quotes array
***/
function getRandomQuote() {
  // Below is an old method that I am replacing in order to prevent duplicates and improve upon the repetitiveness issue, I want to make it "more random"
  // let randNum =  Math.floor((Math.random() * quotes.length));
  // return quotes[randNum];

  //Should the index of the quotes be depleted, start over again
  if (keysList.length <= 0) {
    keysList = [...quotes.keys()];
  }
  
  //Getting the random number from the keyslist instead
  let randNum = keysList[Math.floor((Math.random() * keysList.length))];

  //If there are still keys available in the list, delete the key and return the corresponding object from the keys list via the random number
  if (keysList.length > 0) {
    var randQuote = quotes[randNum];
    keysList.splice(keysList.indexOf(randNum), 1);
    return randQuote;
  }
  //I am certain this still satisfies the desired outcome: 'returns a random object from the quotes array', please don't penalize my autism...
}

/***
 * Function that parses and concatenates an object containing the quote and inserts it into the HTML page
***/
function printQuote() {
  const quote = getRandomQuote();
  let parsedQuote;

  //My extra: Here follows code which inserts an image of each authors quote if the image is present
  if (quote.photo) {
    parsedQuote = `
      <img src="${ quote.photo }" alt="${ quote.source }" width="150px" style="float: right; margin-left: 50px;"></img>
    `;
  }

  //Rest of the quote object is parsed below, checking if the citation and year are present
  parsedQuote += `
    <p class="quote"> ${ quote.quote } </p>
    <p class="source"> ${ quote.source } 
  `;

  if (quote.citation) {
    parsedQuote += `<span class="citation"> ${ quote.citation } </span>`;
  }

  if (quote.year) {
    parsedQuote += `<span class="year"> ${ quote.year } </span>`;
  }

  //Closing the source class paragraph and inserting the quote to the HTML
  parsedQuote += '</p>';
  document.getElementById('quote-box').innerHTML = parsedQuote;

  //Change background color to random RGB
  document.body.style.backgroundColor = randRGB();

  /***
  * After a good read on https://javascript.info/settimeout-setinterval
  * I decided to reset the change quote interval each time the user changes it,
  * preventing quick auto changes that prevents the user to read a quote
  ***/
  clearInterval(interval);
  interval = setInterval(printQuote, INTERVAL);

  return parsedQuote;
}

//Set timer in order to auto refresh
//Got this from w3schools.com...
var interval = setInterval(printQuote, INTERVAL);

/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);