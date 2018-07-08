
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
