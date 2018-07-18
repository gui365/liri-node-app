# Hi, I'm **LIRI**. How can I help you today?

This project was the homework for week 10 of the Penn Coding Boot Camp.

## Goal
To create a SIRI-like application that would execute various commands, using Node packages.

## Installation and Set-up
Make sure to run *npm install* at the root directory after cloning the project.
To set up the application, you must set up an **.env** file conatining the following information:
```
# Spotify API keys

SPOTIFY_ID=your-id-here
SPOTIFY_SECRET=your-secret-here

# Twitter API keys

TWITTER_CONSUMER_KEY=your-key-here
TWITTER_CONSUMER_SECRET=your-secret-here
TWITTER_ACCESS_TOKEN_KEY=your-token-here
TWITTER_ACCESS_TOKEN_SECRET=your-token-secret-here
USER=your-twitter-username-here
```

## Functionality
This application consists of 5 basic commands:

| Command              |   Action                                                           |  npm run _____        |
| ---------------------|--------------------------------------------------------------------|-----------------------|
| my-tweets            |  Show your last 20 tweets                                          |  tweets               |
| spotify-this-song    |  Add a song name after this command and get its info               |  song *name of song*  |
| movie-this           |  Add a movie name after this command and get its info              |  movie *name of movie*|
| do-what-it-says      |  A random action. Surprise!                                        |  random               |
| post-tweet           |  Post a tweet to your account. Write your tweet after the command  |  post *tweet*         |

  **1. my-tweets command** (npm run tweets)
     This command will pull the last 20 tweets posted in the account and print them in the terminal, as well as the time when they were created. This command uses the twitter npm package.
  
  **2. spotify-this-song command** (e.g. npm run song *yellow submarine*)
     This command uses the node-spotify-api npm package. It sends a request to the Spotify API querying for a specific song name. It then prints the information to the terminal for 5 songs.

  **3. movie-this command** (e.g. npm run movie *Dallas Buyers Club*)
     This command uses the request npm package. Similarly to the *spotify-this-song command*, it sends a request to the OMDb API querying for a specific movie. It prints the information for that movie in the terminal.

  **4. do-what-it-says command** (npm run random)
     This command uses the fs node package. It takes the command and search term from the random.txt file and executes it.

  **5. post-tweet command** (e.g. npm run post *LIRI is amazing!*)
     This command also uses the twitter npm package. It creates a new tweet and posts it to the user's wall.

Run *npm start* or *node liri.js* to show a welcome message and list of commands.

## Objective
* To find, research and implement npm packages.
* To install npm packages and save them to the package.JSON file.

## Built using:
* JavaScript
* NodeJS

## Authors
**Guillermo Barila** - *Author*