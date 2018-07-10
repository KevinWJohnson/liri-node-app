
// Code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Include the twitter npm package
var Twitter = require("twitter");

// Include the twitter npm package
var Spotify = require("node-spotify-api");

// Include the request npm package
var request = require("request");

var keys = require("./keys.js"); 

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
if (liriCommand === "my-tweets") {
  // Commands for Twitter
  
  // Setting up the prams
  var params = {
    user_id: "1016003213256896513",
    count: 20
  };

// Twitter get command
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
     console.log("------ Start of Tweets--------")
  for (var i = 0; i < tweets.length; i++) {
    var j = i+1;
    console.log("-------Tweet Number "+j+"--------")
    console.log(tweets[i].text);
  }
  console.log("------ End of Tweets--------")
    

    } else{
      console.log("Twitter Error");
    }
  });


}

else if (liriCommand === "spotify-this-song") {
  // Commands for Spotify
}

else if (liriCommand === "movie-this") {
  // Commands for OMDB
}

else if (liriCommand === "do-what-it-says") {
  // fs Node package uses random.txt to
  // call one of LIRI's commands
}


else {
  notRecognized = "Not a recognized command";
}


// Prints the outputNumber
console.log("notRecognized");

// =======================================================

// // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// var request = require("request");

// // Store all of the arguments in an array
// var nodeArgs = process.argv;

// // Create an empty variable for holding the movie name
// var movieName = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < nodeArgs.length; i++) {

//   if (i > 2 && i < nodeArgs.length) {

//     movieName = movieName + "+" + nodeArgs[i];

//   }

//   else {

//     movieName += nodeArgs[i];

//   }
// }

// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);

// request(queryUrl, function (error, response, body) {

//   // If the request is successful
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("Release Year: " + JSON.parse(body).Year);
//   }
// });
