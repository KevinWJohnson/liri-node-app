
// Code to read and set any environment variables with the dotenv package
require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Make liri.js take in one of the following commands
//
// `my-tweets`
// `spotify-this-song`
// `movie-this`
// `do-what-it-says`


// Takes in all of the command line arguments
var inputString = process.argv;

// Caputures the command line argument
var liriCommand = inputString[2];

// Caputures the command line parameter
// For the move name see video about how to
// capture multiple words in the argument
// in gitHub in Class videos

var liriParameter = inputString[3];


// Determines the command selected...
// Based on the command we run the appropriate set of commands
if (operand === "my-tweets") {
  // Commands for Twitter
}

else if (operand === "spotify-this-song") {
  // Commands for Spotify
}

else if (operand === "movie-this") {
  // Commands for OMDB
}

else if (operand === "do-what-it-says") {
  // fs Node package uses random.txt to
  // call one of LIRI's commands
}


else {
  notRecognized = "Not a recognized command";
}


// Prints the outputNumber
console.log(notRecognized);

// =======================================================
