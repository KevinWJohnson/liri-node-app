
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

else if (liriCommand === "spotify-this-song") {

  // Commands for Spotify

  var songName = "";

  // Get the Song Name
  // Loop through all the words in the node argument
  for (var i = 3; i < nodeArgs.length; i++) {
    songName = songName + " " + nodeArgs[i];
  }

  // Taking off the space in front of the song name
  songName = songName.substr(1);

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
            console.log("Song Name: " + "'" + songName.toUpperCase() + "'");
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
        console.log("-------Song Data Number " + j + "--------")
        console.log("Song Name: " + "'" + songName.toUpperCase() + "'");
        console.log("Album Name: " + data.tracks.items[i].album.name);

        for (var k = 0; k < data.tracks.items[i].album.artists.length; k++) {
          console.log("Artist(s) Name: " + data.tracks.items[i].album.artists[k].name);
        }

        console.log("Preview Link: " + data.tracks.items[i].preview_url);
        // console.log("URL: " + data.tracks.items[i].album.external_urls.spotify);

      }
    });

  }


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
