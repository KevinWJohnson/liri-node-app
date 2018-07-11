require('dotenv').config();

var Twitter = require('twitter');

var fs = require("fs");

var keys = require("./keys.js");

var client = new Twitter(keys.twitter);

var userInput = process.argv[2];

var userCommand = process.argv[3];


switch(userCommand) {

    case "show-tweets": 
        getTweets(userInput)
        break;

    case "post-tweet": 
        postTweet(userInput)
        break;

    default: 
        console.log("Please use the show-tweets or post-tweets commands");
}


function postTweet(status) {

    client.post('statuses/update', {status: status},  function(error, tweet, response) {
        if(error) throw error;
        console.log(tweet);  // Tweet body
    });

}

function getTweets(userName) {

    var params = { screen_name: userName };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {
            var tweetFrom = "\nTweets from: @" + tweets[0].user.screen_name;
            console.log(tweetFrom);
            fs.appendFile("saved-tweets.txt", tweetFrom, function (err) {
                if (err) {
                    return console.log(err);
                }

                for (var i = 0; i < tweets.length; i++) {
                    var twitterResponse = "\n---------\n" + "Tweet: " + tweets[i].text + "\nDate of Tweet " + tweets[i].created_at;
                    console.log(twitterResponse);
                    fs.appendFile("saved-tweets.txt", twitterResponse, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                }
            });
        }
    });
}