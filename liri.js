
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
var nodeArgs = process.argv;

// Caputures the command line argument
var liriCommand = nodeArgs[2];


// Determines the command selected...
// Based on the command we run the appropriate set of commands
if (liriCommand === "my-tweets") {
  myTweetsListed();
}

else if (liriCommand === "spotify-this-song") {
  songInfo();

}

else if (liriCommand === "movie-this") {
  movieInfo();
}

else if (liriCommand === "do-what-it-says") {
  fileReadCommand()
}


else {
  notRecognized = "Not a recognized command";
}


// ----------- Functions -----------

function myTweetsListed() {

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
        var j = i + 1;
        console.log("-------Tweet Number " + j + "--------")
        console.log(tweets[i].text);
      }
      console.log("------ End of Tweets--------")


    } else {
      console.log("Twitter Error");
    }
  });
}


function songInfo() {
  var songName = "";

  // Get the Song Name
  // Loop through all the words in the node argument
  for (var i = 3; i < nodeArgs.length; i++) {
    songName = songName + " " + nodeArgs[i];
  }

  // Taking off the space in front of the song name
  songName = songName.substr(1);
  console.log("SongName: " + songName)

  // Commands for Spotify

  // If no song name was entered default to "The Sign" by the Ace of Base
  if (songName === "") {

    songName = "The Sign"

    spotify.search({ type: 'track', query: songName }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      //console.log(JSON.stringify(data,null,2));

      console.log("---------------- Song Data Below ----------------");
      //console.log("data.length: "+ data.length);
      //console.log("data: "+ data);
      //console.log("data.tracks.items.length: "+ data.tracks.items.length);
      //console.log("data.tracks.items.length: "+ data.tracks.items.length);

      for (var i = 0; i < data.tracks.items.length; i++) {
        var j = i + 1;


        for (var k = 0; k < data.tracks.items[i].album.artists.length; k++) {
          if (data.tracks.items[i].album.artists[k].name === "Ace of Base") {
            console.log("------Default Song Data --------")
            console.log("Song Name Searched: " + "'" + songName.toUpperCase() + "'");
            console.log("Song Name Found: " + data.tracks.items[i].name);
            console.log("Album Name: " + data.tracks.items[i].album.name);
            console.log("Artist Name: " + data.tracks.items[i].album.artists[k].name);
            console.log("Preview Link: " + data.tracks.items[i].preview_url);
          }

        }


        // console.log("URL: " + data.tracks.items[i].album.external_urls.spotify);

      }
    });
  }
  else {

    //console.log(nodeArgs.length);
    //console.log(songName);
    // spotify.search({ type: 'track', query: 'You are my sunshine', limit: 1 }, function (err, data) {


    spotify.search({ type: 'track', query: songName }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      //console.log(JSON.stringify(data, null, 2));

      console.log("---------------- Song Data Below ----------------");

      for (var i = 0; i < data.tracks.items.length; i++) {
        var j = i + 1;
        console.log("-------Song Data Number " + j + "--------")
        console.log("Song Name Searched: " + "'" + songName.toUpperCase() + "'");
        console.log("Song Name Found: " + data.tracks.items[i].name);
        console.log("Album Name: " + data.tracks.items[i].album.name);

        for (var k = 0; k < data.tracks.items[i].album.artists.length; k++) {
          console.log("Artist(s) Name: " + data.tracks.items[i].album.artists[k].name);
        }

        console.log("Preview Link: " + data.tracks.items[i].preview_url);
      }
    });
  }
}

function movieInfo() {
  // Commands for OMDB

  // Create an empty variable for holding the movie name
  var movieName = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];
    }
  }

  // Setting up the default movie - if no movie is entered
  if (movieName === "") {
    movieName = "Mr. Nobody"
  }

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  //console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    //console.log(JSON.stringify(body, null, 2));

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

      console.log("---------------- Movie Data Below ----------------");
      console.log("Title of the movie: " + JSON.parse(body).Title);
      console.log("Year the movie came out: " + JSON.parse(body).Year);
      console.log("IMBD Rating of the movie: " + JSON.parse(body).imdbRating);


      //console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings.Source[1].Value);
      console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
      console.log("The country where the movie was produced: " + JSON.parse(body).Country);
      console.log("Language of the movie: " + JSON.parse(body).Language);
      console.log("Plot of the movie: " + JSON.parse(body).Plot);
      console.log("Actors in the movie: " + JSON.parse(body).Actors);
    }
  });
}

function fileReadCommand() {
  // fs Node package uses random.txt to
  // call one of LIRI's commands

// fs is a core Node package for reading and writing files
var fs = require("fs");

// This block of code will read from the "random.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  //var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  //console.log(dataArr);



songName = data
spotify.search({ type: 'track', query: songName }, function (err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  //console.log(JSON.stringify(data, null, 2));

  console.log("---------------- Song Data Below ----------------");

  for (var i = 0; i < data.tracks.items.length; i++) {
    var j = i + 1;
    console.log("-------Song Data Number " + j + "--------")
    console.log("Song Name Searched: " + "'" + songName.toUpperCase() + "'");
    console.log("Song Name Found: " + data.tracks.items[i].name);
    console.log("Album Name: " + data.tracks.items[i].album.name);

    for (var k = 0; k < data.tracks.items[i].album.artists.length; k++) {
      console.log("Artist(s) Name: " + data.tracks.items[i].album.artists[k].name);
    }

    console.log("Preview Link: " + data.tracks.items[i].preview_url);
  }
});
});
}
