// Require all modules and files
require("dotenv").config();
var inquirer = require("inquirer")
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var user = require("./user");
var request = require('request');
var fs = require("fs");


// Things LIRI can do
var listOfCommands = ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says", "post-tweet"]
var command = process.argv[2];
var searchTerm = process.argv[3];


// Functions
function runCommand(command){
  
  if (command === undefined) {
    console.log(`
    =============================================================================
    |              How can I help you today? Here is what I can do:             |
    =============================================================================
      Command                  Action                             npm run _____
    -----------------------------------------------------------------------------
      my-tweets            ->  Show your last 20 tweets       ->  tweets
      
      spotify-this-song    ->  Add a song name after this     ->  song _______
                               command and get its info

      movie-this           ->  Add a movie name after this    ->  movie _______
                               command and get its info

      do-what-it-says      ->  A random action. Surprise!     ->  random
      
      post-tweet           ->  Post a tweet to your account.  ->  post _______
                               Write your tweet after the
                               command
    `);  
  }
  
  

  if (command === listOfCommands[0]) {
    // my-tweets command (Twitter)
    readTweets();

  } else if (command === listOfCommands[1]) {
    // spotify-this-song command (Spotify)
    spotifyThis();
    
  } else if (command === listOfCommands[2]) {
    // movie-this command (OMDb)
    movieThis();
    
  } else if (command === listOfCommands[3]) {
    // do-what-it-says command (read file, execute command)
    readAndExecute();
    
  } else if (command === listOfCommands[4]) {
    // post-tweet command (create a new tweet right from the terminal)
    postTweet();
 
  }
};


function complexName() {
  if (process.argv.length > 3) {
    for (let i = 4; i < process.argv.length; i++) {
      searchTerm += "+" + process.argv[i];
      // console.log(searchTerm);
    }  
  }
};


function readTweets() {
  client.get('search/tweets', {q: user.userName}, function(error, tweets, response) {
    
    if (error) {
      return console.log(error);
    }

    fs.appendFile("log.txt", "Pulled and read my tweets\n", function(error){
      if (error) {
        console.log(error);
      }
    });

    for (let i = 0; i < tweets.statuses.length; i++) {
      console.log("\n┌ " + (i+1) + " ----------------------------------");
      console.log("| Tweet: " + tweets.statuses[i].text);
      console.log("| Date: " + tweets.statuses[i].created_at.split("+")[0]);
      console.log("└-------------------------------------");
    }
 });
};


function spotifyThis() {
  var song = "";
  
     
    

  if (searchTerm === undefined) {
    searchTerm = "the sign, ace of base"
    spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      song = `
  ┌ 1 -----------------------------------------------------------------------
  | Song: '${data.tracks.items[0].name}' by ${data.tracks.items[0].artists[0].name}
  | From the Album: ${data.tracks.items[0].album.name}
  | Link to song: ${data.tracks.items[0].href}
  └--------------------------------------------------------------------------
        `;
      
      console.log(song)

    })  
   
  } else {
    complexName();
    
    spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      
      for (let i = 0; i < 5; i++) {
      song = `
  ┌ ${(i+1)} -----------------------------------------------------------------------
  | Song: '${data.tracks.items[i].name}' by ${data.tracks.items[i].artists[0].name}
  | From the Album: ${data.tracks.items[i].album.name}
  | Link to song: ${data.tracks.items[i].href}
  └--------------------------------------------------------------------------`;
      
      console.log(song)
      }
    });
  }

  var newSearchTerm = searchTerm.split("+").join(" ");

  fs.appendFile("log.txt", `Searched for this song: ${newSearchTerm}\n`, function(error){
    if (error) {
      console.log(error);
    }
  })
};


function movieThis() {
  if (searchTerm === undefined) {
    searchTerm = "Mr+Nobody";
  } else {
    complexName();
  };

  request("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var bodyObject = JSON.parse(body);
      var movie = `
  ┌--------------------------------------------------------------------------
  | - ${bodyObject.Title} -
  | 
  | Year: ${bodyObject.Year}
  | IMDb Rating: ${bodyObject.Ratings[0].Value}
  | Rotten Tomatoes Rating: ${bodyObject.Ratings[1].Value}
  | Origin: ${bodyObject.Country}
  | Language: ${bodyObject.Language}
  | Plot: ${bodyObject.Plot}
  | Actors: ${bodyObject.Actors}
  └--------------------------------------------------------------------------
          `
      console.log(movie);
      fs.appendFile("log.txt", `Searched for this movie: ${searchTerm}\n`, function(error){
        if (error) {
          console.log(error);
        }
      })

    } else {
      console.log(error);
    };
  });
};


function readAndExecute() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArray = data.split(",");
    searchTerm = dataArray[1];
    runCommand(dataArray[0]);

    fs.appendFile("log.txt", `Read random.txt file and executed code accordingly\n`, function(error){
      if (error) {
        console.log(error);
      }
    })
  });
}


function postTweet() {
  complexName();
  var newSearchTerm = searchTerm.split("+").join(" ");

  client.post('statuses/update', {status: newSearchTerm},  function(error, tweet, response) {
    if(error) throw error;
    console.log(`
  ┌----------------------------------------------------------┐
  | Your tweet has been successfully posted to your account! |
  └----------------------------------------------------------┘
    `);
  });

  fs.appendFile("log.txt", `Tweeted "${newSearchTerm}"\n`, function(error){
    if (error) {
      console.log(error);
    }
  })
}


runCommand(command);