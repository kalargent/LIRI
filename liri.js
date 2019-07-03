require("dotenv").config(); 

// declaring the variables we'll need to run LIRI

var keys = require("./keys"); 

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify); 

var omdbKey = "trilogy"; 

var fs = require("fs"); 

var axios = require("axios");

var moment = require("moment"); 


// Global Variables
var command = process.argv[2];
var searchTerm = process.argv[3]; 

// Spotify search function, taken from the node-spotify-npm example as a starter
function spotifySearch (searchTerm) {
spotify
  .search({ type: 'track', query: searchTerm, limit: 10})
  .then(function(response) {
    // declaring data as a variable so i don't have to retype the same thing every line
    var data = response.tracks.items[0]; 
    // creating the song object using template literal notation and joining the results so they display correctly in the console
    var song = [`
      Title: ${data.name},
      Album: ${data.album.name},
      Artist: ${data.artists[0].name} , 
      Preview: ${data.preview_url}
    `  
    ].join("/n/r"); 

    // logging the information so the end user can see it, and logging it to log.txt
    console.log("=========== TRACK INFO ==============="); 
    console.log(song); 
    console.log("=========== TRACK INFO ==============="); 
    logging(song); 
  })
  // error handling
  .catch(function(err) {
    console.log("no matching songs found");
  });
}

// OMDB search function using axios, general format taken from class activities 
function omdbSearch (searchTerm){ 
  axios.get (`http://www.omdbapi.com/?t=${searchTerm}&apikey=${omdbKey}`)
  .then (
    function(response) {
      // creating a variable to make for less typing 
      var movieData = response.data; 
      // creating the movie object using template literal notation and joining the results so they display correctly in the console
      var movieInfo = [`
        Title: ${movieData.Title},
        Year: ${movieData.Year},
        IMDB Rating: ${movieData.imdbRating}, 
        Rotten Tomatoes Rating: ${movieData.Ratings[0].Value}, 
        Produced in: ${movieData.Country}, 
        Language(s): ${movieData.Language}, 
        Plot: ${movieData.Plot}, 
        Actors: ${movieData.Actors}
        `
        
      ].join("/r/n"); 
      // log to console and to the log.txt
      console.log("=========== MOVIE INFO ===============")
      console.log(movieInfo); 
      logging(movieInfo); 
      console.log("=========== MOVIE INFO ===============")
    }
  )

  // error handling
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log("1" + error.response.data);
      console.log("---------------Status---------------");
      console.log("2" + error.response.status);
      console.log("---------------Status---------------");
      console.log("3" + error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log("No movies match the entered search criteria. Please try again.");
  });


}

// Bands in Town search function, using axios
function concertSearch (searchTerm){ 
  axios.get(`https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`) 
  .then (
    function (response) {
      console.log(searchTerm); 
      console.log("=========== NEXT FIVE CONCERTS ===============")
      // creating For loop that loops through the first five results, uses template literal to format them into an object 
      for (i=0; i < 5; i++) {
      var concertData = response.data[i]
      var concerts = [`
        Date: ${moment(concertData.datetime).format("MM/DD/YYYY " + "h:mm A")}, 
        Venue: ${concertData.venue.name}, 
        City: ${concertData.venue.city}, 
        Region: ${concertData.venue.region},
        Country: ${concertData.venue.country},
      `].join("/r/n"); 
      
      // logging to console and to the log.txt
      console.log(concerts); 
      logging(concerts); 
      console.log("----------------------------------------------")
      }
      console.log("=========== NEXT FIVE CONCERTS ===============")
    }
  )
  //error handling
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log("1" + error.response.data);
      console.log("---------------Status---------------");
      console.log("2" + error.response.status);
      console.log("---------------Status---------------");
      console.log("3" + error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log("4" + error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log("The list above shows the next five shows for " +searchTerm + ". If there are no shows listed, the artist is not currently touring.");
  });

}

// Do this function to read the random.txt 
function doThis () {
  fs.readFile("random.txt", "utf8", function (err, data){
    if (err) {
      return console.log("error"); 
    }
    // using template literal notation, creating an object 
    var doThis = data.split(","); 
    searchTerm = doThis[1];
   
    spotify
    .search ({type: "track", query: searchTerm})
    .then (function(response) {
      // console.log(response); 
      var doThis = response.tracks.items[0]; 
      var doThisInfo = [`
        Title: ${doThis.name}, 
        Track: ${doThis.track_number},
        Album: ${doThis.album.name}, 
        Artist: ${doThis.artists[0].name}, 
        Preview: ${doThis.preview_url} 
      `].join("/r/n")

      // logging to console and to log.txt
      console.log("=========== RICK ROLL ==============="); 
      console.log (doThisInfo); 
      logging(doThisInfo);
      console.log("=========== RICK ROLL ==============="); 
    }
    )
    
  })
}

  // switch/case to run the app 
  switch (command) {
    case "spotify": 
    // spotifySearch(searchTerm); 
    if (!searchTerm) {
      searchTerm = "The Sign Ace of Base";  
      spotifySearch(searchTerm); 
    }
    else {spotifySearch(searchTerm);}
    break; 

    case "movie":
    if (!searchTerm) {
      searchTerm = "Mr. Nobody"; 
      omdbSearch(searchTerm); 
    }
    else {omdbSearch(searchTerm)}; 
    break; 

    case "concert":
    if (!searchTerm) {
      searchTerm = "Tame Impala"; 
      concertSearch(searchTerm); 
    }
    else {concertSearch(searchTerm)}; 
    break; 

    case "do-this": 
    doThis(); 
    break; 

    default: 
    console.log("=========== WELCOME ==============="); 
    console.log("Welcome to LIRI! LIRI can help you find information about your favorites songs and movies, and will help you find concerts you want to attend.");
    console.log("To find a song, use the 'spotify' command."); 
    console.log("To find a movie, use the 'movie' command."); 
    console.log("To find a song, use the 'concert' command."); 
    console.log("Try the 'do-this' command for a random surprise!"); 
  }

  // function to append each new entry to the log.txt
  function logging (logItem){
  fs.appendFile("log.txt", logItem+ "\r\n", function (err){
    if (err) {
      return console.log (err); 
    }
    // console.log("log updated"); 
  })
}


